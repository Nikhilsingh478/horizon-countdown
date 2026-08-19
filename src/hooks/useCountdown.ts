import { useEffect, useState } from "react";

import { getRemaining, type Remaining } from "@/utils/countdown";

/**
 * Always derives the remaining time from `deadline - Date.now()`.
 * Nothing is decremented, nothing is persisted, so there is no drift and
 * backgrounding / sleeping the device cannot desynchronise the display.
 */
export function useCountdown(): Remaining {
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining());

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      const next = getRemaining();
      setRemaining(next);
      if (next.done) return;
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

  return remaining;
}

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
