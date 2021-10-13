import { PropType, defineComponent } from 'vue';

import { defineProp } from '../../utils';

export interface OverlayProps {
   align?: 'auto' | 'top' | 'bottom';
   canLeaveViewport?: boolean;
   noFollow?: boolean;
   target: null | HTMLElement;
   tag?: string;
}
type OverlayProp<T extends keyof OverlayProps> = PropType<OverlayProps[T]>;

export const OverlayProps = {
   align: defineProp({
      default: 'auto',
      type: String as OverlayProp<'align'>
   }),
   canLeaveViewport: defineProp({
      default: false,
      type: Boolean as OverlayProp<'canLeaveViewport'>
   }),
   target: defineProp({
      required: true,
      type: null as OverlayProp<'target'>
   }),
   tag: defineProp({
      default: 'div',
      type: String as OverlayProp<'tag'>
   })
} as const;
