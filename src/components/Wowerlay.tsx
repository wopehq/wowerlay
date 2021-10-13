import { PropType, Teleport, Transition, defineComponent, ref, watch } from 'vue';
import { cWowerlayAnimEnter, cWowerlayAnimLeave, cWowerlayContainer } from '../consts';

import { OverlayProps } from './OverlayReusables';
import { WowerlayRenderer } from './WowerlayRenderer';
import { useOverlayContext } from '../event';

export interface OverlayRendererProps extends OverlayProps {
   visible: boolean;
}
type OverlayRendererProp<T extends keyof OverlayRendererProps> = PropType<OverlayRendererProps[T]>;

const Props = {
   visible: {
      required: true,
      type: Boolean as OverlayRendererProp<'visible'>
   }
};
const Emits = {
   'update:visible': (value: boolean): any => typeof value === 'boolean'
} as const;

export const Wowerlay = defineComponent({
   name: 'Wowerlay',
   inheritAttrs: false,
   props: {
      ...OverlayProps,
      ...Props
   },
   emits: Emits,
   setup(props, { slots, emit, attrs }) {
      const { onWindowClick } = useOverlayContext();
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
