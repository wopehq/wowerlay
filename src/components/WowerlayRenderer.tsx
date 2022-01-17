import {
  Direction,
  Gaps,
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
  getTopStart,
  isBrowser,
  isElement,
  isResizeObserverSupported
} from '../utils';
import { cWowerlay, sWowerlayX, sWowerlayY, scrollbarGap } from '../consts';
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { WowerlayProps } from './Wowerlay';
import { px } from '../../demo/helpers/css';
import { useWowerlayContext } from '../plugin/index';
import { wowerlayBaseProps } from './WowerlayReusables';

type Handlers = {
  [Key in WowerlayProps['position']]: {
    handle: PositionHandler;
    handleOutOfScreen?: PositionHandler;
    checkOutOfScreen?: (rect: PositionHandlerParameters) => boolean;
  };
};

type Alignment = 'top' | 'right' | 'bottom' | 'left';

const positionHandlers: Handlers = {
  top: {
    handle: getTop,
    handleOutOfScreen: getBottom
  },
  'top-start': {
    handle: getTopStart,
    handleOutOfScreen: getBottomStart
  },
  'top-end': {
    handle: getTopEnd,
    handleOutOfScreen: getBottomEnd
  },
  right: {
    handle: getRight,
    handleOutOfScreen: getLeft
  },
  'right-start': {
    handle: getRightStart,
    handleOutOfScreen: getLeftStart
  },
  'right-end': {
    handle: getRightEnd,
    handleOutOfScreen: getLeftEnd
  },
  bottom: {
    handle: getBottom,
    handleOutOfScreen: getTop
  },
  'bottom-start': {
    handle: getBottomStart,
    handleOutOfScreen: getTopStart
  },
  'bottom-end': {
    handle: getBottomEnd,
    handleOutOfScreen: getTopEnd
  },
  left: {
    handle: getLeft,
    handleOutOfScreen: getRight
  },
  'left-start': {
    handle: getLeftStart,
    handleOutOfScreen: getRightStart
  },
  'left-end': {
    handle: getLeftEnd,
    handleOutOfScreen: getRightEnd
  }
};

export const WowerlayRenderer = defineComponent({
  name: 'WowerlayRenderer',
  inheritAttrs: false,
  props: wowerlayBaseProps,
  emits: {
    click: (_e: MouseEvent): any => true
  },
  setup(props, { emit }) {
    const { onRecalculate } = useWowerlayContext();

    const wowerlayElement = ref<HTMLElement>();
    const posY = ref(0);
    const posX = ref(0);

    const alignment = computed(() => props.position.split('-')[0] as Alignment);
    const positionStyle = computed<Record<string, string>>(() => ({
      [sWowerlayX]: px(posX.value),
      [sWowerlayY]: px(posY.value)
    }));

    const handleClick = (e: MouseEvent) => emit('click', e);

    const fixPosition = (pos: number, direction: Direction) => {
      if (props.canLeaveViewport || !wowerlayElement.value) return pos;

      const { width, height } = wowerlayElement.value.getBoundingClientRect();

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

    const updateWowerlayPosition = () => {
      if (!isBrowser() || !props.target || !wowerlayElement.value) return;

      const targetRect = props.target.getBoundingClientRect();
      const wowerlayRect = wowerlayElement.value.getBoundingClientRect();

      const rect = { targetRect, wowerlayRect };
      const gaps: Gaps = { verticalGap: props.verticalGap, horizontalGap: props.horizontalGap };

      let newPosition = { x: 0, y: 0 };
      const updatePosition = ({ x, y }: typeof newPosition) => {
        newPosition.x = x;
        newPosition.y = y;
      };

      const {
        checkOutOfScreen,
        handle,
        handleOutOfScreen //
      } = positionHandlers[props.position] || positionHandlers.bottom;

      updatePosition(handle(rect, gaps));

      if (handleOutOfScreen) {
        if (checkOutOfScreen) {
          checkOutOfScreen(rect) && updatePosition(handleOutOfScreen(rect, gaps));
        } else if (
          (alignment.value === 'top' && checkOutOfScreenTop(rect, gaps)) ||
          (alignment.value === 'bottom' && checkOutOfScreenBottom(rect, gaps)) ||
          (alignment.value === 'left' && checkOutOfScreenLeft(rect, gaps)) ||
          (alignment.value === 'right' && checkOutOfScreenRight(rect, gaps))
        ) {
          updatePosition(handleOutOfScreen(rect, gaps));
        }
      }

      posX.value = fixPosition(newPosition.x, Direction.Horizontal);
      posY.value = fixPosition(newPosition.y, Direction.Vertical);
    };

    let observer: ResizeObserver | undefined;
    if (isResizeObserverSupported()) {
      observer = new ResizeObserver(() => {
        if (props.fixed) return;
        updateWowerlayPosition();
      });

      watch(
        () => props.target,
        (newEl, oldEl) => {
          if (isElement(oldEl)) observer?.unobserve(oldEl);
          if (isElement(newEl)) observer?.observe(newEl);
        },
        { immediate: true }
      );
    }

    watch(
      () => [props.position, props.target, props.verticalGap, props.horizontalGap],
      updateWowerlayPosition
    );

    onRecalculate(() => {
      if (props.fixed) return;
      updateWowerlayPosition();
    });

    onMounted(() => {
      if (isElement(props.target)) updateWowerlayPosition();
      if (wowerlayElement.value) observer?.observe(wowerlayElement.value);
    });

    onBeforeUnmount(() => {
      if (!isElement(wowerlayElement.value)) return;
      observer?.unobserve(wowerlayElement.value);
    });

    return {
      handleClick,
      wowerlayElement,
      positionStyle
    };
  },
  render() {
    const Element = this.tag as 'div';

    return (
      this.target && (
        <Element
          ref="wowerlayElement"
          class={cWowerlay}
          style={this.positionStyle}
          onClick={this.handleClick}
          {...this.$attrs}
        >
          {this.$slots.default?.()}
        </Element>
      )
    );
  }
});
