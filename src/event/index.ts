import { InjectionKey, inject, onBeforeUnmount } from 'vue';

export type Handler<T = any> = (e?: T) => any;
export interface EventsStore {
   id: symbol;
   handler: Handler;
}
export interface WowerlayContext {
   onRecalculate: (handler: Handler) => void;
   onWindowClick: (handler: Handler<PointerEvent>) => void;
   calculateAll: () => void;
   clickAll: () => void;
}

export const injectionKey: InjectionKey<WowerlayContext> = Symbol();

export const createEvent = (store: EventsStore[], handler: Handler) => {
   const id = Symbol();
   store.push({ id, handler });
   onBeforeUnmount(() => {
      const eventIndex = store.findIndex((e) => e.id === id);
      if (eventIndex >= 0) {
         store.splice(eventIndex, 1);
      }
   });
};

export const runEvents = (store: EventsStore[]) => {
   for (const event of store) {
      event.handler();
   }
};

export const createEventStore = () => [] as EventsStore[];

export const useWowerlayContext = () => {
   return inject(injectionKey)!;
};
