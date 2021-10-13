import { cWowerlay, sWowerlayX, sWowerlayY } from '../consts';
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue';

import { useWowerlayContext } from '../event';
import { wowerlayBaseProps } from './WowerlayReusables';

const Emits = {
   close: (): any => true
} as const;

enum Direction {
   X,
   Y
}

export const WowerlayRenderer = defineComponent({
   name: 'WowerlayRenderer',
   inheritAttrs: false,
   props: wowerlayBaseProps,
   emits: Emits,
   setup(props, { slots, attrs }) {
      const { onRecalculate } = useWowerlayContext();
      const gap = 10;

      const overlayElement = ref<HTMLElement | null>(null);
      const isReady = ref(false);
      const posY = ref(0);
      const posX = ref(0);

      const Tag = computed(() => props.tag as 'div');
      const positionClassNames = computed<Record<string, string>>(() => ({
         [sWowerlayY]: posY.value + 'px',
         [sWowerlayX]: posX.value + 'px'
      }));

      const fixPosition = (pos: number, direction: Direction) => {
         if (!overlayElement.value) {
            return 0;
         }
         const { width, height, y } = overlayElement.value.getBoundingClientRect();
         const scrollbarGap = gap * 2;
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

      const updateOverlayPosition = () => {
         if (!props.target || !overlayElement.value) {
            throw new Error('overlayElement.value or target prop is undefined');
         }
         const { height, x: newX, y } = (props.target as HTMLElement).getBoundingClientRect();
         const newY = height + y + gap;
         posY.value = fixPosition(newY, Direction.Y);
         posX.value = fixPosition(newX, Direction.X);
      };

      onRecalculate(updateOverlayPosition);
      onMounted(async () => {
         if (!props.target) {
            await nextTick();
         }
         if (props.target) {
            updateOverlayPosition();
         } else {
            throw new Error('Overlay should have a valid target');
         }
         isReady.value = true;
      });

      return {
         handleOverlayClick,
         overlayElement,
         positionClassNames,
         Tag
      };
   },
   render() {
      return (
         <this.Tag
            onClick={this.handleOverlayClick}
            ref={(el) => (this.overlayElement = el as HTMLElement)}
            style={this.positionClassNames}
            class={cWowerlay}
            {...this.$attrs}
         >
            {this.$slots.default?.()}
         </this.Tag>
      );
   }
});
