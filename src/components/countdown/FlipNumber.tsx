import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  reducedMotion: boolean;
};

/**
 * Physical calendar page flip for DAYS / HOURS / MINUTES.
 *
 * Mimics a real desk/wall flip calendar:
 *   - The card is pinned at the TOP edge (transform-origin: top center).
 *   - Old card: lifts from the bottom UPWARD → rotateX(0 → -90deg).
 *   - New card: swings down from behind → rotateX(90deg → 0).
 *   - Full-card flip — no split at 50%.
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
    timeout.current = setTimeout(() => setPrevious(null), 560);
  }, [value, current, reducedMotion]);

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  const isFlipping = previous !== null;

  return (
    <span className="flip-card">
      {/* In-flow sizer — locks the card's width/height */}
      <span className="flip-sizer" aria-hidden="true">
        {current}
      </span>

      {/* Resting state: just show the current value */}
      {!isFlipping && (
        <span className="flip-face flip-face--idle">
          <span className="flip-digit">{current}</span>
        </span>
      )}

      {isFlipping && (
        <>
          {/* OLD card — full height — folds UPWARD from bottom, pivot at top */}
          <span
            className="flip-face flip-face--out"
            key={`out-${previous}-${current}`}
          >
            <span className="flip-digit">{previous}</span>
          </span>

          {/* NEW card — full height — swings DOWN from behind, pivot at top */}
          <span
            className="flip-face flip-face--in"
            key={`in-${previous}-${current}`}
          >
            <span className="flip-digit">{current}</span>
          </span>
        </>
      )}
    </span>
  );
}
