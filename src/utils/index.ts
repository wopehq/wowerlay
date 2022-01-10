import { scrollbarGap } from '../consts';

export interface PositionHandlerParameters {
  wowerlayRect: DOMRect;
  targetRect: DOMRect;
}

export type Gaps = { verticalGap: number; horizontalGap: number };
export type PositionHandler = (
  rect: PositionHandlerParameters,
  gaps: Gaps
) => { x: number; y: number };

export type PositionHandlerWithDirection = (
  rect: PositionHandlerParameters,
  direction: Direction
) => { x: number; y: number };

type OutOfScreenHandler = (rect: PositionHandlerParameters, gaps: Gaps) => boolean;

export enum Direction {
  Horizontal,
  Vertical
}

export const getCenter: PositionHandlerWithDirection = (
  { targetRect, wowerlayRect },
  direction
) => {
  if (direction === Direction.Vertical) {
    return {
      x: 0,
      y: targetRect.y + targetRect.height / 2 - wowerlayRect.height / 2
    };
  }

  return {
    x: targetRect.x + targetRect.width / 2 - wowerlayRect.width / 2,
    y: 0
  };
};

export const getStart: PositionHandlerWithDirection = ({ targetRect }, direction) => {
  if (direction === Direction.Vertical)
    return {
      x: 0,
      y: targetRect.y
    };

  return {
    x: targetRect.x,
    y: 0
  };
};

export const getEnd: PositionHandlerWithDirection = ({ targetRect, wowerlayRect }, direction) => {
  if (direction === Direction.Vertical)
    return {
      x: 0,
      y: targetRect.y + targetRect.height - wowerlayRect.height
    };

  return {
    x: targetRect.x + targetRect.width - wowerlayRect.width,
    y: 0
  };
};

export const getRight: PositionHandler = ({ targetRect, wowerlayRect }, { horizontalGap }) => ({
  x: targetRect.x + targetRect.width + horizontalGap,
  y: getCenter({ targetRect, wowerlayRect }, Direction.Vertical).y
});
export const getRightStart: PositionHandler = (rect, gaps) => ({
  x: getRight(rect, gaps).x,
  y: getStart(rect, Direction.Vertical).y
});
export const getRightEnd: PositionHandler = (rect, gaps) => ({
  x: getRight(rect, gaps).x,
  y: getEnd(rect, Direction.Vertical).y
});

export const getLeft: PositionHandler = ({ targetRect, wowerlayRect }, { horizontalGap }) => ({
  x: targetRect.x - wowerlayRect.width - horizontalGap,
  y: getCenter({ targetRect, wowerlayRect }, Direction.Vertical).y
});
export const getLeftStart: PositionHandler = (rect, gaps) => ({
  x: getLeft(rect, gaps).x,
  y: getStart(rect, Direction.Vertical).y
});
export const getLeftEnd: PositionHandler = (rect, gaps) => ({
  x: getLeft(rect, gaps).x,
  y: getEnd(rect, Direction.Vertical).y
});

export const getTop: PositionHandler = ({ targetRect, wowerlayRect }, { verticalGap }) => ({
  x: getCenter({ targetRect, wowerlayRect }, Direction.Horizontal).x,
  y: targetRect.y - wowerlayRect.height - verticalGap
});
export const getTopStart: PositionHandler = (rect, gaps) => ({
  x: getStart(rect, Direction.Horizontal).x,
  y: getTop(rect, gaps).y
});
export const getTopEnd: PositionHandler = (rect, gaps) => ({
  y: getTop(rect, gaps).y,
  x: getEnd(rect, Direction.Horizontal).x
});

export const getBottom: PositionHandler = ({ targetRect, wowerlayRect }, { verticalGap }) => ({
  x: getCenter({ targetRect, wowerlayRect }, Direction.Horizontal).x,
  y: targetRect.y + targetRect.height + verticalGap
});
export const getBottomStart: PositionHandler = (rect, gaps) => ({
  x: getStart(rect, Direction.Horizontal).x,
  y: getBottom(rect, gaps).y
});
export const getBottomEnd: PositionHandler = (rect, gaps) => ({
  y: getBottom(rect, gaps).y,
  x: getEnd(rect, Direction.Horizontal).x
});

export const checkOutOfScreenTop: OutOfScreenHandler = (
  { targetRect, wowerlayRect },
  { verticalGap }
) => targetRect.y - wowerlayRect.height - verticalGap < 0;

export const checkOutOfScreenBottom: OutOfScreenHandler = (
  { targetRect, wowerlayRect },
  { verticalGap }
) =>
  targetRect.y + targetRect.height + wowerlayRect.height + scrollbarGap + verticalGap >
  window.innerHeight;

export const checkOutOfScreenLeft: OutOfScreenHandler = (
  { targetRect, wowerlayRect },
  { horizontalGap }
) => targetRect.x - wowerlayRect.width - horizontalGap < 0;

export const checkOutOfScreenRight: OutOfScreenHandler = (
  { targetRect, wowerlayRect },
  { horizontalGap }
) =>
  targetRect.x + targetRect.width + wowerlayRect.width + scrollbarGap + horizontalGap >
  window.innerWidth;

export const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const isResizeObserverSupported = () => isBrowser() && 'ResizeObserver' in window;

export const isElement = (el: any): el is HTMLElement => isBrowser() && el instanceof HTMLElement;
