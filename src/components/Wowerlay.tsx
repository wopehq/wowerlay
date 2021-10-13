import { PropType, Teleport, Transition, defineComponent, ref, watch } from 'vue';
import { WowerlayBaseProps, wowerlayBaseProps } from './WowerlayReusables';
import { cWowerlayAnimEnter, cWowerlayAnimLeave, cWowerlayContainer } from '../consts';

import { WowerlayRenderer } from './WowerlayRenderer';
import { useWowerlayContext } from '../event';

export interface WowerlayProps extends WowerlayBaseProps {
   visible: boolean;
}
type WowerlayProp<T extends keyof WowerlayProps> = PropType<WowerlayProps[T]>;

const Props = {
   visible: {
      required: true,
      type: Boolean as WowerlayProp<'visible'>
   }
};
const Emits = {
   'update:visible': (value: boolean): any => typeof value === 'boolean'
} as const;

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
      const canClose = ref(false);

      const toClass = `.${cWowerlayContainer}`;

      onWindowClick(() => {
         if (canClose.value) {
            emit('update:visible', false);
         }
      });

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

      return {
         toClass,
         canClose
      };
   },
   render() {
      return (
         <Teleport to={this.toClass}>
            {/*//Todo- Add user made animation support. */}
            <Transition enterActiveClass={cWowerlayAnimEnter} leaveActiveClass={cWowerlayAnimLeave}>
               {!this.visible ? null : (
                  <WowerlayRenderer {...this.$props} {...this.$attrs}>
                     {this.$slots.default?.()}
                  </WowerlayRenderer>
               )}
            </Transition>
         </Teleport>
      );
   }
});
