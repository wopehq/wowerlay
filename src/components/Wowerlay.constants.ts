import { type PropType, type Ref, type HTMLAttributes } from 'vue';
import {
  type Middleware,
  type AlignedPlacement,
  type Side,
  type VirtualElement,
} from '@floating-ui/vue';

export type WowerlayTransitionFn = (
  type: 'enter' | 'leave',
  params: { background: HTMLElement | null; popover: HTMLElement; side: Side },
  done: () => void,
) => void;

export interface WowerlayProps {
  visible: boolean;
  position: AlignedPlacement | Side;
  gap: number;
  canLeaveViewport: boolean;
  fixed: boolean;
  noFlip: boolean;
  target: HTMLElement | VirtualElement;
  tag: string;
  noBackground: boolean;
  transition: string | WowerlayTransitionFn;
  syncSize: boolean;
  arrowPadding: number;
  middlewares: Middleware[];
  backgroundAttrs: HTMLAttributes & {
    ref?: ((element: HTMLDivElement | null) => void) | Ref<HTMLElement | null | undefined>;
    key?: undefined | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export const Props = {
  target: {
    type: Object as PropType<WowerlayProps['target'] | null>,
  },
  backgroundAttrs: {
    type: Object as PropType<WowerlayProps['backgroundAttrs']>,
    default: () => ({}),
  },
  noBackground: {
    default: false,
    type: Boolean as PropType<WowerlayProps['noBackground']>,
  },
  fixed: {
    default: false,
    type: Boolean as PropType<WowerlayProps['fixed']>,
  },
  syncSize: {
    default: false,
    type: Boolean as PropType<WowerlayProps['syncSize']>,
  },
  noFlip: {
    default: false,
    type: Boolean as PropType<WowerlayProps['noFlip']>,
  },
  position: {
    default: 'bottom',
    type: String as PropType<WowerlayProps['position']>,
  },
  gap: {
    default: 0,
    type: Number as PropType<WowerlayProps['gap']>,
  },
  canLeaveViewport: {
    default: false,
    type: Boolean as PropType<WowerlayProps['canLeaveViewport']>,
  },
  tag: {
    default: 'div',
    type: String as PropType<WowerlayProps['tag']>,
  },
  transition: {
    default: null,
    type: [String, Function] as PropType<WowerlayProps['transition']>,
  },
  visible: {
    type: Boolean as PropType<WowerlayProps['visible']>,
    required: true,
  },
  middlewares: {
    type: Array as PropType<WowerlayProps['middlewares']>,
    default: () => [],
  },
  arrowPadding: {
    type: Number as PropType<WowerlayProps['arrowPadding']>,
    default: 0,
  },
} as const;
