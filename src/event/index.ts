import { onBeforeUnmount } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler<T = any> = (event: T) => any;
export interface EventsStore {
  id: symbol;
  handler: Handler;
}
export interface WowerlayContext {
  onRecalculate: (handler: Handler<WheelEvent | Event | undefined>) => void;
  onWindowClick: (handler: Handler<MouseEvent>) => void;
  calculateAll: (event: WheelEvent | Event) => void;
  clickAll: (event: PointerEvent) => void;
}

export const createEvent = (store: EventsStore[], handler: Handler) => {
  const id = Symbol('id');
  store.push({ id, handler });
  onBeforeUnmount(() => {
    const eventIndex = store.findIndex((e) => e.id === id);
    if (eventIndex >= 0) {
      store.splice(eventIndex, 1);
    }
  });
};

export const runEvents = (store: EventsStore[], e?: unknown) => {
  for (const event of store) {
    event.handler(e);
  }
};

export const createEventStore = () => [] as EventsStore[];
