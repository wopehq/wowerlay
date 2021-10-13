import { PropType, Teleport, defineComponent, onBeforeUnmount, onMounted } from 'vue';

import { useOverlayContext } from '../event';

export interface OverlayContainerProps {
   zIndex?: number;
}
export interface OverlayContainerEmits {
   overlayClose: (value: any) => void;
}

type OProp<T extends keyof OverlayContainerProps> = PropType<OverlayContainerProps[T]>;
type OEmit<T extends keyof OverlayContainerEmits> = OverlayContainerEmits[T];

const Props = {
   zIndex: {
      type: Number as OProp<'zIndex'>,
      default: 1500
   }
} as const;

const Emits = {
   overlayClose: null as OEmit<'overlayClose'>
} as const;

export const OverlayContainer = defineComponent({
   name: 'OverlayContainer',
   props: Props,
   emits: Emits,
   setup() {
      const { calculateAll, clickAll } = useOverlayContext();
      const wa = window.addEventListener;
      const wr = window.removeEventListener;

      onMounted(() => {
         wa('scroll', calculateAll);
         wa('wheel', calculateAll);
         wa('resize', calculateAll);
         wa('click', clickAll);
      });
      onBeforeUnmount(() => {
         wr('scroll', calculateAll);
         wr('wheel', calculateAll);
         wr('resize', calculateAll);
         wr('click', clickAll);
      });
   },
   render() {
      return (
         <Teleport to="body">
            <div class="k-overlay-container"></div>
         </Teleport>
      );
   }
});
