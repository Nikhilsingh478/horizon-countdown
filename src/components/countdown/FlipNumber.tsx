import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  reducedMotion: boolean;
};

/**
  * Physical split-flap calendar flip for DAYS / HOURS / MINUTES.
  *
  * Mimics a real-world physical flip calendar:
  *   1. Static backdrop: Top half shows NEW digit, Bottom half shows OLD digit.
  *   2. Phase 1 (0% -> 50%): Top flap (OLD digit) folds DOWN from 0° -> -90°.
  *   3. Phase 2 (50% -> 100%): Bottom flap (NEW digit) unfolds DOWN from 90° -> 0°.
  *   4. Hinge seam line across the middle for authentic mechanical aesthetic.
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
    timeout.current = setTimeout(() => setPrevious(null), 540);
  }, [value, current, reducedMotion]);

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  const isFlipping = previous !== null;

  return (
    <span className="flip-card">
      {/* In-flow sizer to guarantee exact box width and height */}
      <span className="flip-sizer" aria-hidden="true">
        {current}
      </span>

      {isFlipping ? (
        <>
          {/* STATIC BACKDROP: Top = NEW digit, Bottom = OLD digit */}
          <span className="flip-panel flip-panel--top">
            <span className="flip-digit">{current}</span>
          </span>
          <span className="flip-panel flip-panel--bottom">
            <span className="flip-digit">{previous}</span>
          </span>

          {/* ANIMATING FLAPS */}
          {/* Top flap folds down 0deg -> -90deg */}
          <span className="flip-flap flip-flap--top" key={`top-${previous}-${current}`}>
            <span className="flip-digit">{previous}</span>
            <span className="flip-shadow flip-shadow--top" />
          </span>

          {/* Bottom flap unfolds down 90deg -> 0deg */}
          <span className="flip-flap flip-flap--bottom" key={`bot-${previous}-${current}`}>
            <span className="flip-digit">{current}</span>
            <span className="flip-shadow flip-shadow--bottom" />
          </span>
        </>
      ) : (
        /* IDLE STATE: Both halves show current value */
        <>
          <span className="flip-panel flip-panel--top">
            <span className="flip-digit">{current}</span>
          </span>
          <span className="flip-panel flip-panel--bottom">
            <span className="flip-digit">{current}</span>
          </span>
        </>
      )}

      {/* Horizontal Seam Hinge Line */}
      <span className="flip-hinge" aria-hidden="true" />
    </span>
  );
}
