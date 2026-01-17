import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine and deduplicate Tailwind CSS class values into a single class string.
 *
 * @param inputs - One or more clsx-compatible class values (strings, arrays, objects, etc.) to be merged
 * @returns The resulting class string with Tailwind-specific class conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a numeric value as a localized currency string with configurable options.
 *
 * @param value - The number (or numeric string) to format. If `null` or `undefined`, the function returns the `fallback`.
 * @param options - Formatting options.
 * @param options.currency - ISO 4217 currency code to use (default: `"USD"`).
 * @param options.locale - BCP 47 locale to use for formatting (default: `"en-US"`).
 * @param options.minimumFractionDigits - Minimum fraction digits to display.
 * @param options.maximumFractionDigits - Maximum fraction digits to display.
 * @param options.compact - Use compact notation like `1.2K` when `true` (default: `false`).
 * @param options.fallback - String to return when `value` is `null`, `undefined`, or not a finite number (default: `"-"`).
 * @param options.showSign - Prefix positive values with `+` when `true` (default: `false`).
 * @returns The formatted currency string, or the `fallback` when the input is `null`, `undefined`, or not a finite number.
 */
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