import { InjectionKey, Plugin, inject } from 'vue';
import { Handler, createEvent, createEventStore, runEvents, WowerlayContext } from '../event';

import { isBrowser } from '../utils';

const WowerlayInjectionKey: InjectionKey<WowerlayContext> = Symbol('key');

export const createWowerlay = (): Plugin => ({
  install(app) {
    const calculateEvents = createEventStore();
    const clickEvents = createEventStore();

    const onRecalculate = (handler: Handler<WheelEvent | Event | undefined>) => {
      createEvent(calculateEvents, handler);
    };
    const onWindowClick = (handler: Handler<PointerEvent>) => createEvent(clickEvents, handler);

    const calculateAll = (e: WheelEvent | Event) => runEvents(calculateEvents, e);
    const clickAll = (e: MouseEvent) => runEvents(clickEvents, e);

    if (isBrowser()) {
      const wa = window.addEventListener;
      wa('scroll', calculateAll);
      wa('wheel', calculateAll);
      wa('resize', calculateAll);
      wa('click', clickAll);
    }

    app.provide(WowerlayInjectionKey, {
      calculateAll,
      clickAll,
      onWindowClick,
      onRecalculate,
    });
  },
});

export const useWowerlayContext = () => inject(WowerlayInjectionKey)!;
