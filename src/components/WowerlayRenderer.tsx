import { cWowerlay, sWowerlayX, sWowerlayY } from '../consts';
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';

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
  setup(props) {
    const { onRecalculate } = useWowerlayContext();

    const overlayElement = ref<HTMLElement | null>(null);
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
      const { width, height } = overlayElement.value.getBoundingClientRect();
      const scrollbarGap = 15;

      if (props.canLeaveViewport) {
        return pos;
      }

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

    const getVerticalPosition = () => {
      const {
        height: targetHeight,
        x: targetX,
        y: targetY
      } = (props.target as HTMLElement)?.getBoundingClientRect();
      const { height: wowerlayHeight } = overlayElement.value!.getBoundingClientRect();

      let y = targetY;

      if (props.priority === 'top') {
        y = targetY - wowerlayHeight - props.verticalGap;
        return { x: targetX, y };
      }

      y = targetHeight + y + props.verticalGap;
      return { x: targetX, y };
    };

    const getHorizontalPosition = () => {
      const {
        width: targetWidth,
        x: targetX,
        y: targetY
      } = (props.target as HTMLElement)?.getBoundingClientRect();
      const { width: wowerlayWidth } = overlayElement.value!.getBoundingClientRect();

      let x = targetX;

      if (props.priority === 'left') {
        x = targetX - wowerlayWidth - props.horizontalGap;
        return { x, y: targetY };
      }

      x = targetWidth + x + props.horizontalGap;
      return { x, y: targetY };
    };

    const updateOverlayPosition = () => {
      if (!props.target || !overlayElement.value) {
        throw new Error('overlayElement.value or target prop is undefined');
      }

      let newPosition = getHorizontalPosition();

      if (props.position === 'vertical') newPosition = getVerticalPosition();

      posX.value = fixPosition(newPosition.x, Direction.X);
      posY.value = fixPosition(newPosition.y, Direction.Y);
    };

    watch(() => [props.priority, props.position], updateOverlayPosition);

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
