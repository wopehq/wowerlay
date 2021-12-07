import { cWowerlay, sWowerlayX, sWowerlayY } from '../consts';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

import { useWowerlayContext } from '../event';
import { wowerlayBaseProps } from './WowerlayReusables';

enum Direction {
  Horizontal,
  Vertical
}

export const WowerlayRenderer = defineComponent({
  name: 'WowerlayRenderer',
  inheritAttrs: false,
  props: wowerlayBaseProps,
  emits: ['wowerlayClick'],
  setup(props, { emit }) {
    const { onRecalculate } = useWowerlayContext();
    const wowerlayElement = ref<HTMLElement>();
    const posY = ref(0);
    const posX = ref(0);

    const Tag = computed(() => props.tag as 'div');
    const positionClassNames = computed<Record<string, string>>(() => ({
      [sWowerlayY]: posY.value + 'px',
      [sWowerlayX]: posX.value + 'px'
    }));

    const fixPosition = (pos: number, direction: Direction) => {
      if (!wowerlayElement.value) {
        return 0;
      }
      const { width, height } = wowerlayElement.value.getBoundingClientRect();
      const scrollbarGap = 15;

      if (props.canLeaveViewport) {
        return pos;
      }

      switch (direction) {
        case Direction.Horizontal: {
          const limitX = window.innerWidth - width - scrollbarGap;
          return Math.max(0, Math.min(limitX, pos));
        }

        case Direction.Vertical: {
          const limitY = window.innerHeight - height - scrollbarGap;
          return Math.max(0, Math.min(limitY, pos));
        }
      }
    };

    const handleOverlayClick = (e: MouseEvent) => {
      e.stopPropagation();
      emit('wowerlayClick');
    };

    const getVerticalPosition = () => {
      const {
        height: targetHeight,
        width: targetWidth,
        x: targetX,
        y: targetY
      } = (props.target as HTMLElement).getBoundingClientRect();

      const { height: wowerlayHeight, width: wowerlayWidth } =
        wowerlayElement.value!.getBoundingClientRect();

      let targetPosition = props.position!;
      let y = targetY;
      let x = targetX;

      if (props.position === 'top' || props.position === 'top-right') {
        if (targetY - wowerlayHeight < 0) {
          targetPosition = props.position === 'top-right' ? 'bottom-right' : 'bottom';
        }
      } else if (targetY + targetHeight + wowerlayHeight >= window.innerHeight) {
        targetPosition = props.position === 'bottom-right' ? 'top-right' : 'top';
      }

      const toBottom = () => (y = targetHeight + y + props.verticalGap);
      const toTop = () => (y = targetY - wowerlayHeight - props.verticalGap);
      const toRight = () => (x = targetX + targetWidth - wowerlayWidth);

      switch (targetPosition) {
        case 'bottom': {
          toBottom();
          break;
        }

        case 'bottom-right': {
          toBottom();
          toRight();
          break;
        }

        case 'top': {
          toTop();
          break;
        }

        case 'top-right': {
          toTop();
          toRight();
          break;
        }
      }

      if (props.centered) {
        x = x + targetWidth / 2 - wowerlayWidth / 2;
      }

      return { x, y };
    };

    const getHorizontalPosition = () => {
      const {
        width: targetWidth,
        height: targetHeight,
        x: targetX,
        y: targetY
      } = (props.target as HTMLElement)?.getBoundingClientRect();
      const {
        width: wowerlayWidth,
        height: wowerlayHeight //
      } = wowerlayElement.value!.getBoundingClientRect();

      let targetPosition = props.position!;
      let x = targetX;
      let y = targetY;

      if (props.position === 'left') {
        if (targetX - wowerlayWidth < 0) {
          targetPosition = 'right';
        }
      } else if (targetX + targetWidth + wowerlayWidth > window.innerWidth) {
        targetPosition = 'left';
      }

      if (targetPosition === 'left') {
        x = targetX - wowerlayWidth - props.horizontalGap;
      } else {
        x = targetWidth + x + props.horizontalGap;
      }

      if (props.centered) {
        y = y + targetHeight / 2 - wowerlayHeight / 2;
      }

      return { x, y };
    };

    const updateOverlayPosition = () => {
      if (!props.target || !wowerlayElement.value) return;

      let newPosition = { x: 0, y: 0 };

      if (props.position === 'left' || props.position === 'right') {
        newPosition = getHorizontalPosition();
      } else {
        newPosition = getVerticalPosition();
      }

      posX.value = fixPosition(newPosition.x, Direction.Horizontal);
      posY.value = fixPosition(newPosition.y, Direction.Vertical);
    };

    watch(() => [props.position, props.target], updateOverlayPosition);

    onRecalculate(() => !props.fixed && updateOverlayPosition());
    onMounted(() => props.target instanceof HTMLElement && updateOverlayPosition());

    return {
      handleOverlayClick,
      wowerlayElement,
      positionClassNames,
      Tag
    };
  },
  render() {
    const Element = this.Tag;
    return (
      this.target && (
        <Element
          onClick={this.handleOverlayClick}
          ref="wowerlayElement"
          style={this.positionClassNames}
          class={cWowerlay}
          {...this.$attrs}
        >
          {this.$slots.default?.()}
        </Element>
      )
    );
  }
});
