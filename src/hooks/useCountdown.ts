import { useEffect, useState } from "react";

import { getElapsed, type Elapsed } from "@/utils/countdown";

/**
 * Derives elapsed time from `Date.now() - START_DATE_MS`.
 * Runs continuously, recalculates on second boundaries,
 * and maintains exact synchronization without drift.
 */
export function useElapsed(): Elapsed {
  const [elapsed, setElapsed] = useState<Elapsed>(() => getElapsed());

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      const next = getElapsed();
      setElapsed(next);
      // Align each update to the next whole second boundary.
      timeout = setTimeout(tick, 1000 - (Date.now() % 1000));
    };

    const start = () => {
      if (timeout) clearTimeout(timeout);
      tick();
    };

    const stop = () => {
      if (timeout) clearTimeout(timeout);
      timeout = undefined;
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return elapsed;
}

// Backward compatibility alias
export const useCountdown = useElapsed;

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
