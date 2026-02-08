import init, { Universe } from "game-of-life";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";

interface Stats {
  alive: number;
  density: string;
  tickSec: string;
  wasmMemory: string;
  cellsPtr: string;
  cellBytes: number;
  gridSize: string;
}

export const Canvas = () => {
  const [canvas, setCanvas] = useState<string>("");
  const [universe, setUniverse] = useState<Universe | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [stats, setStats] = useState<Stats | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasmRef = useRef<WebAssembly.Memory | null>(null);

  // Guard against StrictMode double-invocation: two concurrent async init()
  // calls create separate WASM instances, and GC freeing the orphaned Universe
  // corrupts the active instance's memory => this is useful during development
  const initCalled = useRef(false);
  useEffect(() => {
    if (initCalled.current) return;
    initCalled.current = true;

    const initialize = async () => {
      const wasm = await init();
      wasmRef.current = wasm.memory;
      const newUniverse = new Universe();
      setUniverse(newUniverse);
      setCanvas(newUniverse.render());
      updateStats(newUniverse, 0);
    };
    initialize();
  }, []);

  const updateStats = useCallback(
    (u: Universe, tickMs: number) => {
      const total = u.width() * u.height();
      const alive = u.live_count();
      const memBytes = wasmRef.current?.buffer.byteLength ?? 0;
      setStats({
        alive,
        density: ((alive / total) * 100).toFixed(1),
        tickSec: (tickMs * 1000).toFixed(1),
        wasmMemory: (memBytes / 1024).toFixed(0),
        cellsPtr: "0x" + (u.cells() as unknown as number).toString(16),
        cellBytes: u.cell_bytes(),
        gridSize: `${u.width()}×${u.height()}`,
      });
    },
    [],
  );

  // Memorize the tick handler to prevent unnecessary recreations
  const handleTick = useCallback(() => {
    if (!universe) return;
    const t0 = performance.now();
    universe.tick();
    const tickMs = performance.now() - t0;
    setCanvas(universe.render());
    setGeneration((g) => g + 1);
    updateStats(universe, tickMs);
  }, [universe, updateStats]);

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      // Pause
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Play
      intervalRef.current = setInterval(() => {
        handleTick();
      }, 100); // Adjust the interval (100ms = 10 FPS)
      setIsPlaying(true);
    }
  }, [isPlaying, handleTick]);

  // Create a new Universe!
  const handleRestart = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    const newUniverse = new Universe();
    setUniverse(newUniverse);
    setCanvas(newUniverse.render());
    setGeneration(0);
    updateStats(newUniverse, 0);
  }, [updateStats]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const grid = useMemo(() => {
    const rows = canvas.split("\n").filter((r) => r.length > 0);
    return rows.map((row, ri) => (
      <div key={ri} className="flex gap-px">
        {[...row].map((ch, ci) => (
          <div
            key={ci}
            className="size-1 md:size-1.5 lg:size-2"
            style={{
              backgroundColor:
                ch === "1" ? "var(--text-primary)" : "var(--bg-secondary)",
            }}
          />
        ))}
      </div>
    ));
  }, [canvas]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-3">
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-40"
          style={{
            backgroundColor: "var(--link-color)",
            transition: "all 250ms ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--link-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--link-color)")
          }
          onClick={handlePlayPause}
          disabled={!universe}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium border disabled:opacity-40"
          style={{
            color: "var(--text-secondary)",
            borderColor: "var(--border-color)",
            transition: "all 250ms ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          onClick={handleTick}
          disabled={!universe || isPlaying}
        >
          Tick
        </button>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium border disabled:opacity-40"
          style={{
            color: "var(--text-secondary)",
            borderColor: "var(--border-color)",
            transition: "all 250ms ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
          onClick={handleRestart}
          disabled={!universe || isPlaying}
        >
          Restart
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Generation {generation}
        </span>
        <div
          className="flex flex-col gap-px overflow-hidden"
          style={{ backgroundColor: "var(--border-color)" }}
        >
          {grid}
        </div>
      </div>
      {stats && (
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--text-secondary)" }}
          >
            Under the hood
          </span>
          <div
            className="font-mono text-xs flex flex-wrap justify-center gap-x-4 gap-y-1 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>
              Grid: {stats.gridSize} ({stats.alive.toLocaleString()}/
              {(universe?.width() ?? 0) * (universe?.height() ?? 0)} alive,{" "}
              {stats.density}%)
            </span>
            <span
              title="Time for the WASM module to compute one generation. This runs as compiled Rust in your browser."
              className="cursor-help underline decoration-dotted"
            >
              Step time: <span className="inline-block w-16 text-right" style={{ fontVariantNumeric: "tabular-nums" }}>{stats.tickSec}</span>μs
            </span>
            <span
              title="Total linear memory allocated to the WebAssembly instance. This is the sandboxed memory space where all Rust data lives."
              className="cursor-help underline decoration-dotted"
            >
              WASM mem: {stats.wasmMemory}KB
            </span>
            <span
              title="Size of the cell array in bytes and its raw pointer address in WASM linear memory. Each cell is a u8 (1 byte): 0 = dead, 1 = alive."
              className="cursor-help underline decoration-dotted"
            >
              Cells: {stats.cellBytes.toLocaleString()}B @ {stats.cellsPtr}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
