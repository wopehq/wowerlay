import { useSlots, withDirectives, type Directive, shallowRef } from 'vue';

const vRef: Directive<HTMLElement, (el: HTMLElement) => void> = (el, { value }) => value(el);

/**
 * @param slotName Target slot default value: "default"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSlotWithRef<SlotProps>(key = 'default') {
  const slots = useSlots();
  const element = shallowRef<HTMLElement | null>(null);

  function handleRef(el: HTMLElement) {
    element.value = el;
  }

  function renderSlot(props?: SlotProps) {
    if (key in slots) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [slot] = (slots as any)[key](props);
      return withDirectives(slot, [[vRef, handleRef]]);
    }

    return undefined;
  }

  return <const>[renderSlot, element];
}
