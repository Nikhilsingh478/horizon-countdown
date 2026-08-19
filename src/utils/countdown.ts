// Fixed deadline: October 10, 2026 23:59:59 in Asia/Kolkata (UTC+05:30).
// Built from an explicit UTC timestamp so no browser-dependent parsing occurs.
export const DEADLINE_MS = Date.UTC(2026, 9, 10, 18, 29, 59, 999);

export const DEADLINE_LABEL = "October 10, 2026";

export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

export function getRemaining(now: number = Date.now()): Remaining {
  const ms = Math.max(0, DEADLINE_MS - now);
  const total = Math.floor(ms / 1000);

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: ms === 0,
  };
}
