import { PropType, Teleport, defineComponent, onBeforeUnmount, onMounted } from 'vue';

import { cWowerlayContainer } from '../consts';
import { useWowerlayContext } from '../event';

export interface WowerlayContainerProps {
   zIndex?: number;
}
export interface WowerlayContainerEmits {
   overlayClose: (value: any) => void;
}

type WowerlayProp<T extends keyof WowerlayContainerProps> = PropType<WowerlayContainerProps[T]>;
type WowerlayEmit<T extends keyof WowerlayContainerEmits> = WowerlayContainerEmits[T];

const Props = {
   zIndex: {
      type: Number as WowerlayProp<'zIndex'>,
      default: 1500
   }
} as const;

const Emits = {
   overlayClose: null as WowerlayEmit<'overlayClose'>
} as const;

export const WowerlayContainer = defineComponent({
   name: 'WowerlayContainer',
   props: Props,
   emits: Emits,
   setup() {
      const { calculateAll, clickAll } = useWowerlayContext();
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
