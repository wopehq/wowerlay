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
  fixed: boolean;
  noFlip: boolean;
  target: HTMLElement;
  tag: string;
  noBackground: boolean;
  transition: boolean | string;
  syncWidth: boolean;
  syncHeight: boolean;
}

export const wowerlayBaseProps = {
  target: {
    type: Object as PropType<WowerlayBaseProps['target'] | null>,
  },
  noBackground: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['noBackground']>,
  },
  fixed: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['fixed']>,
  },
  syncWidth: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['syncWidth']>,
  },
  syncHeight: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['syncHeight']>,
  },
  noFlip: {
    default: false,
    type: Boolean as PropType<WowerlayBaseProps['noFlip']>,
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
