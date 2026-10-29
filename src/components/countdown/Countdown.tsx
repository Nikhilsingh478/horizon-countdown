import { useElapsed, useReducedMotion } from "@/hooks/useCountdown";
import { START_DATE_LABEL, pad } from "@/utils/countdown";

import { CountdownUnit } from "./CountdownUnit";

export function Countdown() {
  const { years, months, days, hours, minutes, totalDays } = useElapsed();
  const reducedMotion = useReducedMotion();

  const label = `${years} years, ${months} months, ${days} days, ${hours} hours, and ${minutes} minutes elapsed since ${START_DATE_LABEL} (${totalDays} total days)`;

  return (
    <section
      className="countdown"
      role="timer"
      aria-live="off"
      aria-atomic="true"
      aria-label={label}
      suppressHydrationWarning
    >
      <div className="countdown-row" aria-hidden="true">
        <CountdownUnit
          value={pad(years)}
          label="Years"
          variant="flip"
          reducedMotion={reducedMotion}
        />
        <span className="unit-divider">:</span>
        <CountdownUnit
          value={pad(months)}
          label="Months"
          variant="flip"
          reducedMotion={reducedMotion}
        />
        <span className="unit-divider">:</span>
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
      </div>
    </section>
  );
}
