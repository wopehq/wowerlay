export const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const isElement = (el: unknown): el is HTMLElement =>
  isBrowser() && el instanceof HTMLElement;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function NOOP() {}
