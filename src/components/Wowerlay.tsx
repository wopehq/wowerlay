import {
  InjectionKey,
  PropType,
  Teleport,
  Transition,
  defineComponent,
  inject,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  watch
} from 'vue';
import { WowerlayBaseProps, wowerlayBaseProps } from './WowerlayReusables';
import { cWowerlayAnimEnter, cWowerlayAnimLeave, cWowerlayContainer } from '../consts';

import { WowerlayRenderer } from './WowerlayRenderer';
import { useWowerlayContext } from '../event';

export interface WowerlayProps extends WowerlayBaseProps {
  visible: boolean;
}

const Props = {
  visible: {
    required: true,
    type: Boolean as PropType<WowerlayProps['visible']>
  } as const
};
const Emits = {
  'update:visible': (value: boolean): any => typeof value === 'boolean'
} as const;

interface ParentWowerlayContext {
  onClose: (hook: () => void) => void;
}

const ParentWowerlayContextInjectionKey: InjectionKey<ParentWowerlayContext> = Symbol();

export const Wowerlay = defineComponent({
  name: 'Wowerlay',
  inheritAttrs: false,
  props: {
    ...wowerlayBaseProps,
    ...Props
  },
  emits: Emits,
  setup(props, { emit }) {
    const { onWindowClick } = useWowerlayContext();
    const parentWowerlay = inject(ParentWowerlayContextInjectionKey, null);

    const childrenWowerlayHooks = reactive([]) as Function[];
    const canClose = ref(false);

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

    onWindowClick(close);
    onBeforeUnmount(close);

    watch(
      () => props.visible,
      (state) => {
        if (state) {
          requestAnimationFrame(() => {
            canClose.value = true;
          });
          return;
        }
        canClose.value = false;
      }
    );

    provide(ParentWowerlayContextInjectionKey, {
      onClose(hook) {
        childrenWowerlayHooks.push(hook);
      }
    });

    return {
      canClose,
      handleWowerlayClick
    };
  },
  render() {
    const toClass = `.${cWowerlayContainer}`;

    return (
      <Teleport to={toClass}>
        {/*// Todo: Add user made animation support. */}
        <Transition enterActiveClass={cWowerlayAnimEnter} leaveActiveClass={cWowerlayAnimLeave}>
          {this.visible && (
            <WowerlayRenderer {...this.$props} {...this.$attrs} onClick={this.handleWowerlayClick}>
              {this.$slots.default?.()}
            </WowerlayRenderer>
          )}
        </Transition>
      </Teleport>
    );
  }
});
