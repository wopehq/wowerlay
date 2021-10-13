import { PropType } from 'vue';

export interface WowerlayBaseProps {
   align?: 'auto' | 'top' | 'bottom';
   canLeaveViewport?: boolean;
   noFollow?: boolean;
   target: null | HTMLElement;
   tag?: string;
}
type WowerlayProp<T extends keyof WowerlayBaseProps> = PropType<WowerlayBaseProps[T]>;

export const wowerlayBaseProps = {
   align: {
      default: 'auto',
      type: String as WowerlayProp<'align'>
   },
   canLeaveViewport: {
      default: false,
      type: Boolean as WowerlayProp<'canLeaveViewport'>
   },
   target: {
      required: true,
      type: null as WowerlayProp<'target'>
   },
   tag: {
      default: 'div',
      type: String as WowerlayProp<'tag'>
   }
} as const;
