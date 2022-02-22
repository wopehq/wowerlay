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
  canLeaveViewport: boolean;
  static: boolean;
  staticPosition: boolean;
  target: HTMLElement;
  tag: string;
  noBackground: boolean;
  transition: boolean | string;
}

export const wowerlayBaseProps = {
  target: {
    type: Object as PropType<WowerlayBaseProps['target']>,
  },
  noBackground: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['noBackground']>,
  },
  static: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['static']>,
  },
  staticPosition: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['staticPosition']>,
  },
  position: {
    default: 'bottom',
    type: String as PropType<WowerlayBaseProps['position']>,
  },
  verticalGap: {
    default: 0,
    type: Number as PropType<WowerlayBaseProps['verticalGap']>,
  },
  horizontalGap: {
    default: 0,
    type: Number as PropType<WowerlayBaseProps['horizontalGap']>,
  },
  canLeaveViewport: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['canLeaveViewport']>,
  },
  tag: {
    default: 'div',
    type: String as PropType<WowerlayBaseProps['tag']>,
  },
  transition: {
    default: true,
    type: [Boolean, String] as PropType<WowerlayBaseProps['transition']>,
  },
} as const;
