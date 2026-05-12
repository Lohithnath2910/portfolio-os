/**
 * Throttle function updates - enforces minimum interval between calls
 * Used for expensive operations like resize tracking
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastRan: number;

  return function (...args: Parameters<T>) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(inThrottle as any);
      inThrottle = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
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
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
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
