import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Direction,
  Gaps,
  PositionHandler,
  PositionHandlerParameters,
  checkOutOfScreenBottom,
  checkOutOfScreenLeft,
  checkOutOfScreenRight,
  checkOutOfScreenTop,
  getAncestors,
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
  isResizeObserverSupported,
} from '../utils';
import type { WowerlayProps } from './Wowerlay';
import { cWowerlay, sWowerlayX, sWowerlayY, scrollbarGap } from '../consts';

import { wowerlayBaseProps } from './WowerlayReusables';

export type WowerlayTemplateRef = {
  update(): void;
};

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
    handleOutOfScreen: getBottom,
  },
  'top-start': {
    handle: getTopStart,
    handleOutOfScreen: getBottomStart,
  },
  'top-end': {
    handle: getTopEnd,
    handleOutOfScreen: getBottomEnd,
  },
  right: {
    handle: getRight,
    handleOutOfScreen: getLeft,
  },
  'right-start': {
    handle: getRightStart,
    handleOutOfScreen: getLeftStart,
  },
  'right-end': {
    handle: getRightEnd,
    handleOutOfScreen: getLeftEnd,
  },
  bottom: {
    handle: getBottom,
    handleOutOfScreen: getTop,
  },
  'bottom-start': {
    handle: getBottomStart,
    handleOutOfScreen: getTopStart,
  },
  'bottom-end': {
    handle: getBottomEnd,
    handleOutOfScreen: getTopEnd,
  },
  left: {
    handle: getLeft,
    handleOutOfScreen: getRight,
  },
  'left-start': {
    handle: getLeftStart,
    handleOutOfScreen: getRightStart,
  },
  'left-end': {
    handle: getLeftEnd,
    handleOutOfScreen: getRightEnd,
  },
};

export const WowerlayRenderer = defineComponent({
  name: 'WowerlayRenderer',
  inheritAttrs: false,
  props: wowerlayBaseProps,
  emits: {
    click: null! as (e: MouseEvent) => void,
    'update:el': null! as (value: HTMLElement | null) => void,
  },
  setup(props, { emit, expose }) {
    const wowerlayElement = ref<HTMLElement | null>(null);

    const posY = ref(0);
    const posX = ref(0);
    const syncedWidth = ref<number | null>(null);
    const syncedHeight = ref<number | null>(null);

    const alignment = computed(() => props.position.split('-')[0] as Alignment);
    const positionStyle = computed<Record<string, string>>(() => ({
      [sWowerlayX]: `${posX.value}px`,
      [sWowerlayY]: `${posY.value}px`,
    }));
    const syncedBoundsStyle = computed<Record<string, string | null>>(() => ({
      width: syncedWidth.value ? `${syncedWidth.value}px` : null,
      height: syncedHeight.value ? `${syncedHeight.value}px` : null,
    }));

    const handleClick = (e: MouseEvent) => emit('click', e);

    const fixPosition = (pos: number, direction: Direction) => {
      if (props.canLeaveViewport || !wowerlayElement.value) return pos;

      const { width, height } = wowerlayElement.value.getBoundingClientRect();

      if (direction === Direction.Horizontal) {
        const limitX = window.innerWidth - width - scrollbarGap;
        return Math.max(0, Math.min(limitX, pos));
      }

      const limitY = window.innerHeight - height - scrollbarGap;
      return Math.max(0, Math.min(limitY, pos));
    };

    const updateWowerlayPosition = () => {
      if (!isBrowser() || !isElement(props.target) || !isElement(wowerlayElement.value)) return;

      const targetRect = props.target.getBoundingClientRect();
      const wowerlayRect = wowerlayElement.value.getBoundingClientRect();

      const rect = { targetRect, wowerlayRect };
      const gaps: Gaps = { verticalGap: props.verticalGap, horizontalGap: props.horizontalGap };

      const newPosition = { x: 0, y: 0 };
      const updatePosition = ({ x, y }: typeof newPosition) => {
        newPosition.x = x;
        newPosition.y = y;
      };

      const {
        checkOutOfScreen,
        handle,
        handleOutOfScreen, //
      } = positionHandlers[props.position] || positionHandlers.bottom;

      updatePosition(handle(rect, gaps));

      if (handleOutOfScreen && !props.noFlip) {
        if (checkOutOfScreen) {
          if (checkOutOfScreen(rect)) {
            updatePosition(handleOutOfScreen(rect, gaps));
          }
        } else if (
          (alignment.value === 'top' && checkOutOfScreenTop(rect, gaps)) ||
          (alignment.value === 'bottom' && checkOutOfScreenBottom(rect, gaps)) ||
          (alignment.value === 'left' && checkOutOfScreenLeft(rect, gaps)) ||
          (alignment.value === 'right' && checkOutOfScreenRight(rect, gaps))
        ) {
          updatePosition(handleOutOfScreen(rect, gaps));
        }
      }

      if (props.syncWidth) syncedWidth.value = targetRect.width;
      if (props.syncHeight) syncedHeight.value = targetRect.height;

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
        { immediate: true },
      );
    }

    const handleRef = (el: Element | ComponentPublicInstance | null) => {
      if (el === null || el instanceof HTMLElement) {
        if (el !== wowerlayElement.value) emit('update:el', el);
        wowerlayElement.value = el;
      } //
      else {
        emit('update:el', null);
      }
    };

    watch(
      () => [
        props.position,
        props.target,
        props.verticalGap,
        props.horizontalGap,
        props.syncWidth,
        props.syncHeight,
        props.canLeaveViewport,
      ],
      updateWowerlayPosition,
    );

    watchEffect(() => {
      if (!props.syncWidth) syncedWidth.value = null;
      if (!props.syncHeight) syncedHeight.value = null;
    });

    const positionUpdaterEventHandler = () => {
      if (props.fixed) return;
      updateWowerlayPosition();
    };

    onMounted(() => {
      if (isElement(props.target)) updateWowerlayPosition();
      if (wowerlayElement.value) observer?.observe(wowerlayElement.value);

      window.addEventListener('resize', positionUpdaterEventHandler);
    });

    onBeforeUnmount(() => {
      if (!isElement(wowerlayElement.value)) return;
      observer?.unobserve(wowerlayElement.value);
      window.removeEventListener('resize', positionUpdaterEventHandler);
    });

    const ancestors = shallowRef<ParentNode[]>([]);

    watch(
      () => props.target,
      (newTarget) => {
        for (const ancestor of ancestors.value) {
          ancestor.removeEventListener('scroll', positionUpdaterEventHandler);
        }

        if (isElement(newTarget)) {
          const newAncestors = getAncestors(newTarget);
          for (const ancestor of newAncestors) {
            ancestor.addEventListener('scroll', positionUpdaterEventHandler, { passive: true });
          }
          ancestors.value = newAncestors;
        }
      },
      { immediate: true },
    );

    expose({
      update: updateWowerlayPosition,
    } as WowerlayTemplateRef);

    return {
      handleClick,
      handleRef,
      wowerlayElement,
      positionStyle,
      syncedBoundsStyle,
    };
  },
  render() {
    const Renderer = this.tag as 'div';

    return (
      <Renderer
        ref={this.handleRef}
        class={cWowerlay}
        style={[this.positionStyle, this.syncedBoundsStyle]}
        onClick={this.handleClick}
        {...this.$attrs}
      >
        {this.$slots.default?.()}
      </Renderer>
    );
  },
});
