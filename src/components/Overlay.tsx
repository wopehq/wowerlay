import { Teleport, computed, defineComponent, nextTick, onMounted, ref } from 'vue';
import { overlayClassName, overlayContainerClassName, overlayVariableNameX, overlayVariableNameY } from '../consts';

import { OverlayProps } from './OverlayReusables';
import { useOverlayContext } from '../event';

const Emits = {
   close: (): any => true
} as const;

enum Direction {
   X,
   Y
}

export const Overlay = defineComponent({
   name: 'Overlay',
   inheritAttrs: false,
   props: OverlayProps,
   emits: Emits,
   setup(props, { slots, attrs }) {
      const { onRecalculate } = useOverlayContext();

      const overlayElement = ref<HTMLElement | null>(null);
      const isReady = ref(false);
      const posY = ref(0);
      const posX = ref(0);

      const Tag = computed(() => props.tag as 'div');
      const positionClassNames = computed<Record<string, string>>(() => ({
         [overlayVariableNameY]: posY.value + 'px',
         [overlayVariableNameX]: posX.value + 'px'
      }));

      const fixPosition = (pos: number, direction: Direction) => {
         const { width, height, y } = overlayElement.value.getBoundingClientRect();
         const scrollbarGap = 20;
         switch (direction) {
            case Direction.X: {
               const limitX = window.innerWidth - width - scrollbarGap;
               return Math.max(0, Math.min(limitX, pos));
            }

            case Direction.Y: {
               const limitY = window.innerHeight - height - scrollbarGap;
               return Math.max(0, Math.min(limitY, pos));
            }
         }
      };

      const handleOverlayClick = (e: MouseEvent) => {
         e.stopPropagation();
      };

      const handleUpdateOverlayPosition = () => {
         if (!props.target || !overlayElement.value) {
            throw new Error('overlayElement.value or target prop is undefined');
         }
         const { height, x: newX, y } = props.target.getBoundingClientRect();
         const newY = height + y + 5;
         posY.value = fixPosition(newY, Direction.Y);
         posX.value = fixPosition(newX, Direction.X);
      };

      const mountHandler = async (status: boolean) => {
         // if (!status) {
         //    canTransition.value = false;
         //    return;
         // }

         // canClose.value = false;
         if (!props.target) {
            await nextTick();
         }
         if (props.target) {
            const { height, x, y } = props.target.getBoundingClientRect();
            posY.value = fixPosition(height + y, Direction.Y);
            posX.value = fixPosition(x, Direction.X);
         } else {
            throw new Error('Overlay should have a valid target');
         }
      };

      onRecalculate(handleUpdateOverlayPosition);
      onMounted(async () => {
         await mountHandler(true);
         isReady.value = true;
      });

      return () => (
         <div
            onClick={handleOverlayClick}
            ref={overlayElement}
            style={positionClassNames.value}
            class={[overlayClassName]}
            {...attrs}
         >
            {slots.default?.()}
         </div>
      );
   }
});
