import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  reducedMotion: boolean;
};

/**
 * Mechanical split-flap: the top half of the outgoing value folds down and
 * reveals the incoming value underneath. Only rerenders when `value` changes.
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
    timeout.current = setTimeout(() => setPrevious(null), 480);
  }, [value, current, reducedMotion]);

  useEffect(() => () => timeout.current && clearTimeout(timeout.current), []);

  return (
    <span className="flip-stage">
      <span className="flip-face">{current}</span>
      {previous !== null && (
        <>
          <span className="flip-half flip-half--top" key={`t-${previous}`}>
            <span className="flip-face">{previous}</span>
          </span>
          <span className="flip-half flip-half--bottom" key={`b-${current}`}>
            <span className="flip-face">{current}</span>
          </span>
        </>
      )}
    </span>
  );
}
