import { useEffect, useRef, useState } from "react";

type Props = {
  value: string; // always a 2-char padded string, e.g. "07"
  reducedMotion: boolean;
};

type DigitSlotProps = {
  digit: string;
  reducedMotion: boolean;
};

/**
 * A single digit slot with a clipped overflow window.
 * When the digit changes, the outgoing digit slides UP out of view
 * (translateY 0 → -100%) while the incoming digit rolls in FROM BELOW
 * (translateY 100% → 0). No fade, no scale, no 3D.
 */
function DigitSlot({ digit, reducedMotion }: DigitSlotProps) {
  const [current, setCurrent] = useState(digit);
  const [previous, setPrevious] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (digit === current) return;

    if (reducedMotion) {
      setCurrent(digit);
      setPrevious(null);
      return;
    }

    setPrevious(current);
    setCurrent(digit);

    if (timeout.current) clearTimeout(timeout.current);
    // Duration must match --roll-duration CSS variable (240ms)
    timeout.current = setTimeout(() => setPrevious(null), 260);
  }, [digit, current, reducedMotion]);

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  return (
    <span className="digit-slot">
      {/* In-flow sizer: anchors width and height so container never collapses */}
      <span className="digit-sizer" aria-hidden="true">
        {current}
      </span>

      {previous !== null ? (
        <>
          {/* Outgoing digit: slides up and out */}
          <span className="digit-out" key={`out-${previous}-${current}`}>
            {previous}
          </span>
          {/* Incoming digit: enters from below */}
          <span className="digit-in" key={`in-${current}`}>
            {current}
          </span>
        </>
      ) : (
        <span className="digit-static">{current}</span>
      )}
    </span>
  );
}

/**
 * Scoreboard roll for seconds — treats the two-character string as
 * two INDEPENDENT digit slots so only the digits that actually changed roll.
 *
 * "07" → "08": only the right slot rolls.
 * "09" → "10": both slots roll.
 */
export function ScoreboardNumber({ value, reducedMotion }: Props) {
  const tens = value[0] ?? "0";
  const ones = value[1] ?? "0";

  return (
    <span className="scoreboard-number">
      <DigitSlot digit={tens} reducedMotion={reducedMotion} />
      <DigitSlot digit={ones} reducedMotion={reducedMotion} />
    </span>
  );
}
