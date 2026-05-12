/**
 * Throttle function updates - enforces minimum interval between calls
 * Used for expensive operations like resize tracking
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastRan = 0;

  return function (...args: Parameters<T>) {
    if (lastRan === 0) {
      func(...args);
      lastRan = Date.now();
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const remaining = limit - (Date.now() - lastRan);
      timeoutId = setTimeout(() => {
        func(...args);
        lastRan = Date.now();
        timeoutId = null;
      }, Math.max(0, remaining));
    }
  };
}

/**
 * Debounce function - delays execution until after specified delay
 * Used for final updates after resize ends
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Request animation frame throttle - updates only on frame boundaries
 * Best for motion-driven operations
 */
export function rafThrottle<T extends (...args: any[]) => void>(
  func: T,
): (...args: Parameters<T>) => void {
  let frameId: number | null = null;
  let lastArgs: Parameters<T>;

  return function (...args: Parameters<T>) {
    lastArgs = args;

    if (frameId === null) {
      frameId = requestAnimationFrame(() => {
        func(...lastArgs);
        frameId = null;
      });
    }
  };
}
