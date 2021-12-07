import { PropType } from 'vue';

export interface WowerlayBaseProps {
  position?: 'left' | 'right' | 'top' | 'bottom' | 'bottom-right' | 'top-right';
  verticalGap: number;
  horizontalGap: number;
  canLeaveViewport?: boolean;
  fixed?: boolean;
  target?: HTMLElement;
  tag?: string;
  centered?: boolean;
}

const positions = [
  'bottom',
  'bottom-right',
  'top',
  'top-right',
  'left',
  'right'
] as WowerlayBaseProps['position'][];

export const wowerlayBaseProps = {
  target: {
    required: true,
    type: null as unknown as PropType<WowerlayBaseProps['target']>
  },
  centered: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['centered']>
  },
  fixed: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['fixed']>
  },
  position: {
    default: 'bottom',
    type: String as PropType<WowerlayBaseProps['position']>,
    validator: (position: WowerlayBaseProps['position']) => positions.indexOf(position) >= 0
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
