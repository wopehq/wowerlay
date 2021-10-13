import { PropType, Teleport, defineComponent, ref, watch } from 'vue';

import { Overlay } from './Overlay';
import { OverlayProps } from './OverlayReusables';
import { overlayContainerClassName } from '../consts';
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

export const OverlayRenderer = defineComponent({
   name: 'OverlayRenderer',
   inheritAttrs: false,
   props: {
      ...OverlayProps,
      ...Props
   },
   emits: Emits,
   setup(props, { slots, emit, attrs }) {
      const { onWindowClick } = useOverlayContext();
      const canClose = ref(false);

      const toClass = `.${overlayContainerClassName}`;

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

      return () => (
         <Teleport to={toClass}>
            {/* I want it to do linebreak :) */}
            {!props.visible ? null : (
               <Overlay {...props} {...attrs}>
                  {slots.default?.()}
               </Overlay>
            )}
         </Teleport>
      );
   }
});
