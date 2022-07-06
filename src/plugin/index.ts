import type { Plugin } from 'vue';

/**
 * @deprecated not needed anymore, replaced with empty function, will be removed in 0.7.0
 */
export const createWowerlay = (): Plugin => ({
  install() {
    // eslint-disable-next-line no-console
    console.warn(
      'Wowerlay: createWowerlay is deprecated, will be removed in 0.7.0, not needed anymore',
    );
  },
});
