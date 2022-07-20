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
    const canClose = ref(false);
    const isVisible = computed(() => isElement(props.target) && props.visible);

    const closeChildWowerlays = () => {
      childrenWowerlayHooks.forEach((v) => v());
    };

    const close = () => {
      if (!props.visible) return;

      if (canClose.value) {
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

    watch(
      () => props.visible,
      (state) => {
        if (state) {
          setTimeout(() => {
            canClose.value = true;
          }, 0);
        } else {
          canClose.value = false;
        }
      },
    );

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

    return {
      canClose,
      isVisible,
      handleWowerlayClick,
      handleContainerClick,
      wowerlayInstance,
    };
  },
  render() {
    let willBeRendered: JSX.Element | null = null;

    const Renderer = !this.isVisible ? null : (
      <WowerlayRenderer
        onUpdate:el={(el) => this.$emit('update:el', el)}
        onClick={this.handleWowerlayClick}
        ref="wowerlayInstance"
        {...this.$props}
        {...this.$attrs}
      >
        {this.$slots.default?.()}
      </WowerlayRenderer>
    );

    if (this.transition === false) {
      willBeRendered = Renderer;
    } else if (typeof this.transition === 'string') {
      willBeRendered = <Transition name={this.transition}>{Renderer}</Transition>;
    } else {
      willBeRendered = (
        <Transition enterActiveClass={cWowerlayAnimEnter} leaveActiveClass={cWowerlayAnimLeave}>
          {Renderer}
        </Transition>
      );
    }

    return (
      <Teleport to="body">
        <div
          class={[
            cWowerlayBackground,
            { 'no-background': this.noBackground || !this.isVisible }, //
          ]}
          onClick={this.handleContainerClick}
          role="tooltip"
        >
          {willBeRendered}
        </div>
      </Teleport>
    );
  },
});
