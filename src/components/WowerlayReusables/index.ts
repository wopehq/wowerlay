import { PropType } from 'vue';

export interface WowerlayBaseProps {
  position?: 'horizontal' | 'vertical';
  priority?: 'left' | 'right' | 'top' | 'bottom';
  verticalGap: number;
  horizontalGap: number;
  canLeaveViewport?: boolean;
  noFollow?: boolean;
  target?: HTMLElement;
  tag?: string;
}

export const wowerlayBaseProps = {
  target: {
    required: true,
    type: null as unknown as PropType<WowerlayBaseProps['target']>
  },
  position: {
    default: 'vertical',
    type: String as PropType<WowerlayBaseProps['position']>
  },
  priority: {
    default: null,
    type: String as PropType<WowerlayBaseProps['priority']>
  },
  verticalGap: {
    default: 0,
    type: Number as PropType<WowerlayBaseProps['verticalGap']>
  },
  horizontalGap: {
    default: 0,
    type: Number as PropType<WowerlayBaseProps['horizontalGap']>
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
