import { PropType } from 'vue';

export interface OverlayProps {
   align?: 'auto' | 'top' | 'bottom';
   canLeaveViewport?: boolean;
   target: null | HTMLElement;
   tag?: string;
}
type OverlayProp<T extends keyof OverlayProps> = PropType<OverlayProps[T]>;

export const OverlayProps = {
   align: {
      default: 'auto',
      type: String as OverlayProp<'align'>
   },
   // open: {
   //    required: true,
   //    type: Boolean as OverlayProp<'open'>
   // },
   canLeaveViewport: {
      default: false,
      type: Boolean as OverlayProp<'canLeaveViewport'>
   },
   target: {
      required: true,
      type: null as OverlayProp<'target'>
   },
   tag: {
      default: 'div',
      type: String as OverlayProp<'tag'>
   }
} as const;
