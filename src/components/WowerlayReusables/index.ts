import { PropType } from 'vue';

export interface WowerlayBaseProps {
  align?: 'auto' | 'top' | 'bottom';
  canLeaveViewport?: boolean;
  fixed?: boolean;
  target: any;
  tag?: string;
}

export const wowerlayBaseProps = {
  target: {
    required: true,
    type: null
  },
  align: {
    default: 'auto',
    type: String as PropType<WowerlayBaseProps['align']>
  },
  fixed: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['fixed']>
  },
  canLeaveViewport: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['canLeaveViewport']>
  },
  tag: {
    default: 'div',
    type: String as PropType<WowerlayBaseProps['tag']>
  }
} as const;
