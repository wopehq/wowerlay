import { Handler, createEvent, createEventStore, injectionKey, runEvents } from '../event';

import { Plugin } from 'vue';

export const createWowerlay = (): Plugin => ({
  install(app) {
    const calculateEvents = createEventStore();
    const clickEvents = createEventStore();

    const onRecalculate = (handler: Handler<WheelEvent | Event>) => {
      createEvent(calculateEvents, handler);
    };
    const onWindowClick = (handler: Handler<PointerEvent>) => createEvent(clickEvents, handler);

    const calculateAll = (e: WheelEvent | Event) => runEvents(calculateEvents, e);
    const clickAll = (e: MouseEvent) => runEvents(clickEvents, e);

    if (typeof window !== 'undefined' && 'addEventListener' in window) {
      const wa = window.addEventListener;
      wa('scroll', calculateAll);
      wa('wheel', calculateAll);
      wa('resize', calculateAll);
      wa('click', clickAll);
    }

    app.provide(injectionKey, {
      calculateAll,
      clickAll,
      onWindowClick,
      onRecalculate
    });
  }
});
