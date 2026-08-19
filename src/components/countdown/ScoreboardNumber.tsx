import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  reducedMotion: boolean;
};

/**
 * Cricket-scoreboard roll: the outgoing value slides up out of the window
 * while the incoming value rolls in from below. Quick, crisp, no bounce.
 */
export function ScoreboardNumber({ value, reducedMotion }: Props) {
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
    timeout.current = setTimeout(() => setPrevious(null), 300);
  }, [value, current, reducedMotion]);

  useEffect(() => () => timeout.current && clearTimeout(timeout.current), []);

  return (
    <span className="roll-stage">
      {previous !== null ? (
        <>
          <span className="roll-out" key={`o-${previous}`}>
            <span className="flip-face">{previous}</span>
          </span>
          <span className="roll-in" key={`i-${current}`}>
            <span className="flip-face">{current}</span>
          </span>
        </>
      ) : (
        <span className="flip-face">{current}</span>
      )}
    </span>
  );
}
