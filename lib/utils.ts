import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format a number as currency with sensible defaults
export function formatCurrency(
  value: number | string | null | undefined,
  options?: {
    currency?: string; // ISO 4217 code like 'USD', 'EUR'
    locale?: string; // BCP 47 locale like 'en-US'
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    compact?: boolean; // use compact notation (e.g., 1.2K, 3.4M)
    fallback?: string; // string to show when value is null/NaN
    showSign?: boolean; // force showing + for positive numbers
  },
): string {
  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits,
    maximumFractionDigits,
    compact = false,
    fallback = "-",
    showSign = false,
  } = options || {};

  if (value === null || value === undefined) return fallback;
  const num = typeof value === "string" ? Number(value) : value;
  if (!isFinite(num)) return fallback;

  const formatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
  };

  if (minimumFractionDigits !== undefined)
    formatOptions.minimumFractionDigits = minimumFractionDigits;
  if (maximumFractionDigits !== undefined)
    formatOptions.maximumFractionDigits = maximumFractionDigits;

  let formatted = new Intl.NumberFormat(locale, formatOptions).format(num);

  if (showSign && num > 0) {
    formatted = `+${formatted}`;
  }

  return formatted;
}
