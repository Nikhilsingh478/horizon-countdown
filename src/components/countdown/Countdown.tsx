import { useCountdown, useReducedMotion } from "@/hooks/useCountdown";
import { DEADLINE_LABEL, pad } from "@/utils/countdown";

import { CountdownUnit } from "./CountdownUnit";

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();
  const reducedMotion = useReducedMotion();

  const label = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds remaining until ${DEADLINE_LABEL}`;

  return (
    <section
      className="countdown"
      role="timer"
      aria-live="off"
      aria-atomic="true"
      aria-label={label}
    >
      <div className="countdown-row" aria-hidden="true">
        <CountdownUnit
          value={pad(days)}
          label="Days"
          variant="flip"
          reducedMotion={reducedMotion}
        />
        <span className="unit-divider">:</span>
        <CountdownUnit
          value={pad(hours)}
          label="Hours"
          variant="flip"
          reducedMotion={reducedMotion}
        />
        <span className="unit-divider">:</span>
        <CountdownUnit
          value={pad(minutes)}
          label="Minutes"
          variant="flip"
          reducedMotion={reducedMotion}
        />
        <span className="unit-divider">:</span>
        <CountdownUnit
          value={pad(seconds)}
          label="Seconds"
          variant="roll"
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  );
}
