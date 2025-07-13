import init, { Universe } from "game-of-life";
import { useEffect, useState, useCallback, useRef } from "react";

export const Canvas = () => {
  const [canvas, setCanvas] = useState<string>("");
  const [universe, setUniverse] = useState<Universe | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize the universe
  useEffect(() => {
    const initialize = async () => {
      await init();
      const newUniverse = new Universe();
      setUniverse(newUniverse);
      setCanvas(newUniverse.render());
    };
    initialize();
  }, []);

  // Memorize the tick handler to prevent unnecessary recreations
  const handleTick = useCallback(() => {
    if (!universe) return;
    universe.tick();
    setCanvas(universe.render());
  }, [universe]);

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

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={handlePlayPause}
          disabled={!universe}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
          onClick={handleTick}
          disabled={!universe || isPlaying}
        >
          Tick
        </button>
      </div>
      <pre className="bg-white p-4 rounded shadow">{canvas}</pre>
    </div>
  );
};
