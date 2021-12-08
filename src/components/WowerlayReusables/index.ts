import { PropType } from 'vue';

export interface WowerlayBaseProps {
  position:
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  verticalGap: number;
  horizontalGap: number;
  canLeaveViewport?: boolean;
  fixed: boolean;
  target?: HTMLElement;
  tag: string;
}

const positions: WowerlayBaseProps['position'][] = [
  'bottom',
  'bottom-start',
  'bottom-end',
  'top',
  'top-start',
  'top-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
];

export const wowerlayBaseProps = {
  target: {
    required: true,
    type: null as unknown as PropType<WowerlayBaseProps['target']>
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
