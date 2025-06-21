import init, { Universe } from "game-of-life";
import { useEffect, useState, useCallback, useRef } from "react";

export const Canvas = () => {
  const [canvas, setCanvas] = useState<string>("");
  const [universe, setUniverse] = useState<Universe | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    <>
      <button onClick={handlePlayPause} disabled={!universe}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={handleTick} disabled={!universe || isPlaying}>
        Tick
      </button>
      <pre>{canvas}</pre>
    </>
  );
};
