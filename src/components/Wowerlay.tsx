import type { InjectionKey, PropType } from 'vue';
import {
  Teleport,
  Transition,
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
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

export interface WowerlayProps extends WowerlayBaseProps {
  visible: boolean;
}

interface ParentWowerlayContext {
  onClose: (hook: () => void) => void;
}

const ParentWowerlayContextInjectionKey: InjectionKey<ParentWowerlayContext> = Symbol('key');

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
    const parentWowerlay = inject(ParentWowerlayContextInjectionKey, null);
    const wowerlayInstance = shallowRef<WowerlayTemplateRef>();

    expose({
      update() {
        wowerlayInstance.value?.update();
      },
    } as WowerlayTemplateRef);

    const childrenWowerlayHooks = reactive([]) as (() => void)[];
    const tooltipIsClosable = ref(false);
    const tooltipIsVisible = computed(() => isElement(props.target) && props.visible);

    const closeChildWowerlays = () => {
      childrenWowerlayHooks.forEach((v) => v());
    };

    const close = () => {
      if (!props.visible) return;

      if (tooltipIsClosable.value) {
        closeChildWowerlays();
        childrenWowerlayHooks.length = 0;
        emit('update:visible', false);
      }
    };

    parentWowerlay?.onClose(close);

    const handleWowerlayClick = (e: MouseEvent) => {
      e.stopPropagation();
      closeChildWowerlays();
    };

    const handleContainerClick = (e: MouseEvent) => {
      e.stopPropagation();
      close();
    };

    onBeforeUnmount(close);

    provide(ParentWowerlayContextInjectionKey, {
      onClose(hook) {
        childrenWowerlayHooks.push(hook);
      },
    });

    onMounted(() => {
      window.addEventListener('click', close);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('click', close);
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
      tooltipIsClosable,
      tooltipIsVisible,
      handleWowerlayClick,
      handleContainerClick,
      wowerlayInstance,
      handleContentTransitionEnd,
      backgroundVisible,
    };
  },
  render() {
    const popover = this.tooltipIsVisible ? (
      <WowerlayRenderer
        onUpdate:el={(el) => this.$emit('update:el', el)}
        onClick={this.handleWowerlayClick}
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
                class={cWowerlayBackground}
                onClick={this.handleContainerClick}
                role="dialog"
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
