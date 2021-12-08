import {
  Direction,
  PositionHandler,
  PositionHandlerParameters,
  checkOutOfScreenBottom,
  checkOutOfScreenLeft,
  checkOutOfScreenRight,
  checkOutOfScreenTop,
  getBottom,
  getBottomEnd,
  getBottomStart,
  getLeft,
  getLeftEnd,
  getLeftStart,
  getRight,
  getRightEnd,
  getRightStart,
  getTop,
  getTopEnd,
  getTopStart
} from './WowerlayUtils';
import { cWowerlay, sWowerlayX, sWowerlayY } from '../consts';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

import { WowerlayProps } from './Wowerlay';
import { useWowerlayContext } from '../event';
import { wowerlayBaseProps } from './WowerlayReusables';

type Handlers = {
  [Key in Exclude<WowerlayProps['position'], undefined>]: {
    handle: PositionHandler;
    handleOutOfScreen: PositionHandler;
    checkOutOfScreen: (rect: PositionHandlerParameters) => boolean;
  };
};

const positionHandlers: Handlers = {
  top: {
    handle: getTop,
    handleOutOfScreen: getBottom,
    checkOutOfScreen: checkOutOfScreenTop
  },
  'top-start': {
    handle: getTopStart,
    handleOutOfScreen: getBottomStart,
    checkOutOfScreen: checkOutOfScreenTop
  },
  'top-end': {
    handle: getTopEnd,
    handleOutOfScreen: getBottomEnd,
    checkOutOfScreen: checkOutOfScreenTop
  },
  right: {
    handle: getRight,
    handleOutOfScreen: getLeft,
    checkOutOfScreen: checkOutOfScreenRight
  },
  'right-start': {
    handle: getRightStart,
    handleOutOfScreen: getLeftStart,
    checkOutOfScreen: checkOutOfScreenRight
  },
  'right-end': {
    handle: getRightEnd,
    handleOutOfScreen: getLeftEnd,
    checkOutOfScreen: checkOutOfScreenRight
  },
  bottom: {
    handle: getBottom,
    handleOutOfScreen: getTop,
    checkOutOfScreen: checkOutOfScreenBottom
  },
  'bottom-start': {
    handle: getBottomStart,
    handleOutOfScreen: getTopStart,
    checkOutOfScreen: checkOutOfScreenBottom
  },
  'bottom-end': {
    handle: getBottomEnd,
    handleOutOfScreen: getTopEnd,
    checkOutOfScreen: checkOutOfScreenBottom
  },
  left: {
    handle: getLeft,
    handleOutOfScreen: getRight,
    checkOutOfScreen: checkOutOfScreenLeft
  },
  'left-start': {
    handle: getLeftStart,
    handleOutOfScreen: getRightStart,
    checkOutOfScreen: checkOutOfScreenLeft
  },
  'left-end': {
    handle: getLeftEnd,
    handleOutOfScreen: getRightEnd,
    checkOutOfScreen: checkOutOfScreenLeft
  }
};

export const WowerlayRenderer = defineComponent({
  name: 'WowerlayRenderer',
  inheritAttrs: false,
  props: wowerlayBaseProps,
  emits: {
    click: (e: MouseEvent): any => e.isTrusted
  },
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

    const handleClick = (e: MouseEvent) => emit('click', e);

    const fixPosition = (pos: number, direction: Direction) => {
      if (!wowerlayElement.value) return 0;
      if (props.canLeaveViewport) return pos;

      const { width, height } = wowerlayElement.value.getBoundingClientRect();
      const scrollbarGap = 15;

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

    const updateOverlayPosition = () => {
      if (!props.target || !wowerlayElement.value) return;

      const targetRect = props.target.getBoundingClientRect();
      const wowerlayRect = wowerlayElement.value.getBoundingClientRect();

      let newPosition = { x: 0, y: 0 };
      const { checkOutOfScreen, handle, handleOutOfScreen } = positionHandlers[props.position!];
      const isOutOfScreen = checkOutOfScreen({ targetRect, wowerlayRect });

      if (isOutOfScreen) {
        const pos = handleOutOfScreen({ targetRect, wowerlayRect });
        newPosition.x = pos.x;
        newPosition.y = pos.y;
      } else {
        const pos = handle({ targetRect, wowerlayRect });
        newPosition.x = pos.x;
        newPosition.y = pos.y;
      }

      posX.value = fixPosition(newPosition.x, Direction.Horizontal);
      posY.value = fixPosition(newPosition.y, Direction.Vertical);
    };

    watch(() => [props.position, props.target], updateOverlayPosition);

    onRecalculate(() => !props.fixed && updateOverlayPosition());
    onMounted(() => props.target instanceof HTMLElement && updateOverlayPosition());

    return {
      handleClick,
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
          onClick={this.handleClick}
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
