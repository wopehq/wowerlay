import { type VirtualElement } from '@floating-ui/vue';

export const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const isElement = (el: unknown): el is HTMLElement =>
  isBrowser() && el instanceof HTMLElement;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function NOOP() {}

export const typeOf = (value: unknown) => Object.prototype.toString.call(value).slice(8, -1);

export function isObject<T>(value: unknown): value is T {
  return typeOf(value) === 'Object';
}

export function isValidTarget(target: unknown): target is HTMLElement | VirtualElement {
  return (
    isElement(target) ||
    (isObject<Partial<VirtualElement>>(target) &&
      typeof target.getBoundingClientRect === 'function')
  );
}
