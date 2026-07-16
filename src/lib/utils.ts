import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` — merge Tailwind classes safely.
 * Prefer this to string interpolation for conditional classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
