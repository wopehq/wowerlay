import { PropType, Teleport, defineComponent, onBeforeUnmount, onMounted } from 'vue';

import { cWowerlayContainer } from '../consts';
import { defineProp } from '../utils';
import { useOverlayContext } from '../event';

export interface OverlayContainerProps {
   zIndex?: number;
}
export interface OverlayContainerEmits {
   overlayClose: (value: any) => void;
}

type WProp<T extends keyof OverlayContainerProps> = PropType<OverlayContainerProps[T]>;
type WEmit<T extends keyof OverlayContainerEmits> = OverlayContainerEmits[T];

const Props = {
   zIndex: defineProp({
      type: Number as WProp<'zIndex'>,
      default: 1500
   })
} as const;

const Emits = {
   overlayClose: null as WEmit<'overlayClose'>
} as const;

export const WowerlayContainer = defineComponent({
   name: 'WowerlayContainer',
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
            <div class={cWowerlayContainer}></div>
         </Teleport>
      );
   }
});
