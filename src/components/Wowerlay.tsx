import type { PropType } from 'vue';
import {
  Teleport,
  Transition,
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue';
import { cWowerlayAnimEnter, cWowerlayAnimLeave, cWowerlayBackground } from '../consts';

import type { WowerlayTemplateRef } from './WowerlayRenderer';
import type { WowerlayBaseProps } from './WowerlayReusables';
import { WowerlayRenderer } from './WowerlayRenderer';
import { isElement } from '../utils';
import { wowerlayBaseProps } from './WowerlayReusables';

export type { WowerlayTemplateRef } from './WowerlayRenderer';

const ATTR_PREFIX = 'data-wowerlay-';
const SCOPE_ATTR_QUERY = `[${ATTR_PREFIX}scope]`;
const STOP_ATTR_QUERY = `[${ATTR_PREFIX}stop]`;

export interface WowerlayProps extends WowerlayBaseProps {
  visible: boolean;
}

export const Wowerlay = defineComponent({
  name: 'Wowerlay',
  inheritAttrs: false,
  props: {
    ...wowerlayBaseProps,
    visible: {
      required: true,
      type: Boolean as PropType<WowerlayProps['visible']>,
    },
  },
  emits: {
    'update:visible': null! as (value: boolean) => void,
    'update:el': null! as (value: HTMLElement | null) => void,
  },
  setup(props, { emit, expose }) {
    const wowerlayInstance = shallowRef<WowerlayTemplateRef>();

    expose({
      update() {
        wowerlayInstance.value?.update();
      },
    } as WowerlayTemplateRef);

    const tooltipIsClosable = ref(false);
    const tooltipIsVisible = computed(() => isElement(props.target) && props.visible);

    const close = () => {
      if (!props.visible) return;

      if (tooltipIsClosable.value) {
        emit('update:visible', false);
      }
    };

    onBeforeUnmount(close);

    const backgroundEl = shallowRef<HTMLElement>();
    const handleWindowClick = (e: MouseEvent) => {
      // We should not call this function if Wowerlay is not visible
      // or has no target element etc.
      if (
        !props.visible ||
        !(props.target instanceof HTMLElement) ||
        // This check is for TypeScript, TypeScript doesn't think e.target is HTMLElement
        !(e.target instanceof HTMLElement) ||
        // This simulates `stopPropagation` but do not block event bubbling
        e.target.closest(STOP_ATTR_QUERY)
      ) {
        return;
      }

      const scopeEl = e.target.closest(SCOPE_ATTR_QUERY);

      // If scope element exists but it isn't our Wowerlay's scope we just return.
      if (scopeEl && !scopeEl.contains(props.target)) {
        return;
      }

      // If a Wowerlay background is clicked but it isn't our background, we don't close.
      // This enables nested Wowerlays to work properly
      // @see Demo/Nested
      if (e.target.matches('[data-wowerlay-background]') && e.target !== backgroundEl.value) {
        return;
      }

      close();
    };

    onMounted(() => {
      window.addEventListener('click', handleWindowClick);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('click', handleWindowClick);
    });

    const backgroundVisible = ref(props.visible);

    watch(
      () => props.visible,
      (state) => {
        if (state) {
          setTimeout(() => {
            tooltipIsClosable.value = true;
          }, 0);

          backgroundVisible.value = true;
        } else {
          tooltipIsClosable.value = false;
          if (props.transition === false) {
            setTimeout(() => {
              backgroundVisible.value = false;
            });
          }
        }
      },
    );

    const handleContentTransitionEnd = () =>
      setTimeout(() => {
        backgroundVisible.value = false;
      });

    return {
      handleContentTransitionEnd,
      tooltipIsClosable,
      tooltipIsVisible,
      backgroundEl,
      wowerlayInstance,
      backgroundVisible,
    };
  },
  render() {
    const popover = this.tooltipIsVisible ? (
      <WowerlayRenderer
        onUpdate:el={(el) => this.$emit('update:el', el)}
        data-wowerlay-scope
        ref="wowerlayInstance"
        {...this.$props}
        {...this.$attrs}
      >
        {this.$slots.default?.()}
      </WowerlayRenderer>
    ) : null;

    let wowerlayContentToRender: JSX.Element | null = (
      <Transition
        appear
        enterActiveClass={cWowerlayAnimEnter}
        leaveActiveClass={cWowerlayAnimLeave}
        onAfterLeave={this.handleContentTransitionEnd}
      >
        {popover}
      </Transition>
    );

    // We need it to be exactly `false` otherwise we use default transition.
    if (this.transition === false) {
      wowerlayContentToRender = popover;
    } else if (typeof this.transition === 'string') {
      wowerlayContentToRender = (
        <Transition appear onAfterLeave={this.handleContentTransitionEnd} name={this.transition}>
          {popover}
        </Transition>
      );
    }

    const backgroundAttrsClone = Object.assign(Object.create(null), this.backgroundAttrs);
    delete backgroundAttrsClone.key;

    return (
      <Teleport to="body">
        {(() => {
          if (this.noBackground) return wowerlayContentToRender;

          if (this.backgroundVisible) {
            return (
              <div
                data-wowerlay-background
                class={cWowerlayBackground}
                role="dialog"
                ref="backgroundEl"
                {...backgroundAttrsClone}
              >
                {wowerlayContentToRender}
              </div>
            );
          }

          return null;
        })()}
      </Teleport>
    );
  },
});
