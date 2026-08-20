import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  reducedMotion: boolean;
};

/**
 * Mechanical split-flap calendar flip for DAYS / HOURS / MINUTES.
 *
 * Structure:
 *   - Static base shows the current value (always visible, no animation).
 *   - When value changes, two absolutely-positioned overlays animate:
 *       • Top overlay (previous value, top half): folds away from centre — rotateX(0) → rotateX(-90deg)
 *       • Bottom overlay (new value, bottom half): unfolds into view    — rotateX(90deg) → rotateX(0)
 *   - Overlays are removed after animation completes (~480ms).
 */
export function FlipNumber({ value, reducedMotion }: Props) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (value === current) return;

    if (reducedMotion) {
      setCurrent(value);
      setPrevious(null);
      return;
    }

    setPrevious(current);
    setCurrent(value);

    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setPrevious(null), 500);
  }, [value, current, reducedMotion]);

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  return (
    <span className="flip-stage">
      {/* Static base — always shows current value */}
      <span className="flip-face">{current}</span>

      {previous !== null && (
        <>
          {/* Top half of old value folds away */}
          <span className="flip-half flip-half--top" key={`t-${previous}-${current}`}>
            <span className="flip-face">{previous}</span>
          </span>
          {/* Bottom half of new value unfolds in */}
          <span className="flip-half flip-half--bottom" key={`b-${current}`}>
            <span className="flip-face">{current}</span>
          </span>
        </>
      )}
    </span>
  );
}
