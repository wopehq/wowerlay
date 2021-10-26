import { Handler, createEvent, createEventStore, injectionKey, runEvents } from '../event';

import { Plugin } from 'vue';

export const createWowerlay = (): Plugin => ({
  install(app) {
    const calculateEvents = createEventStore();
    const clickEvents = createEventStore();
    const onRecalculate = (handler: Handler) => createEvent(calculateEvents, handler);
    const onWindowClick = (handler: Handler<PointerEvent>) => createEvent(clickEvents, handler);
    const calculateAll = () => runEvents(calculateEvents);
    const clickAll = () => runEvents(clickEvents);

    app.provide(injectionKey, {
      calculateAll,
      clickAll,
      onWindowClick,
      onRecalculate
    });
  }
});
