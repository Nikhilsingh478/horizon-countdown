import { differenceInDays, intervalToDuration } from "date-fns";

// Fixed anchor: March 20, 2024 00:00:00 in Asia/Kolkata (UTC+05:30).
// Built from an explicit UTC timestamp so no browser-dependent parsing occurs.
export const START_DATE_MS = Date.UTC(2024, 2, 19, 18, 30, 0, 0);

export const START_DATE_LABEL = "March 20, 2024";

// Kept for backward compatibility if imported elsewhere
export const DEADLINE_MS = START_DATE_MS;
export const DEADLINE_LABEL = START_DATE_LABEL;

export type Elapsed = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
};

// Alias for backward compatibility
export type Remaining = Elapsed;

export function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

/**
 * Accurately calculates elapsed calendar duration between start and now:
 * - Proper calendar year boundaries (accounting for leap years)
 * - Exact month boundaries (varying 28/29/30/31 days)
 * - Remaining days, hours, minutes, and seconds
 * - Total running calendar days count
 */
export function calculateElapsed(startMs: number, nowMs: number): Elapsed {
  if (nowMs < startMs) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
    };
  }

  const startDate = new Date(startMs);
  const nowDate = new Date(nowMs);

  // Exact calendar duration using date-fns
  const dur = intervalToDuration({ start: startDate, end: nowDate });
  const totalDays = differenceInDays(nowDate, startDate);

  return {
    years: dur.years ?? 0,
    months: dur.months ?? 0,
    days: dur.days ?? 0,
    hours: dur.hours ?? 0,
    minutes: dur.minutes ?? 0,
    seconds: dur.seconds ?? 0,
    totalDays: Math.max(0, totalDays),
  };
}

export function getElapsed(now: number = Date.now()): Elapsed {
  return calculateElapsed(START_DATE_MS, now);
}

// Backward compatibility alias
export function getRemaining(now: number = Date.now()): Remaining {
  return getElapsed(now);
}
