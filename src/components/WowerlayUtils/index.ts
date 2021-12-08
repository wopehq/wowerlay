export interface PositionHandlerParameters {
  wowerlayRect: DOMRect;
  targetRect: DOMRect;
}

export type PositionHandler = (rect: PositionHandlerParameters) => { x: number; y: number };

export type PositionHandlerWithDirection = (
  rect: PositionHandlerParameters,
  direction: Direction
) => { x: number; y: number };

type OutOfScreenHandler = (rect: PositionHandlerParameters) => boolean;

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

export const getRight: PositionHandler = ({ targetRect, wowerlayRect }) => ({
  x: targetRect.x + targetRect.width,
  y: getCenter({ targetRect, wowerlayRect }, Direction.Vertical).y
});
export const getRightStart: PositionHandler = (rect) => ({
  x: getRight(rect).x,
  y: getStart(rect, Direction.Vertical).y
});
export const getRightEnd: PositionHandler = (rect) => ({
  x: getRight(rect).x,
  y: getEnd(rect, Direction.Vertical).y
});

export const getLeft: PositionHandler = ({ targetRect, wowerlayRect }) => ({
  x: targetRect.x - wowerlayRect.width,
  y: getCenter({ targetRect, wowerlayRect }, Direction.Vertical).y
});
export const getLeftStart: PositionHandler = (rect) => ({
  x: getLeft(rect).x,
  y: getStart(rect, Direction.Vertical).y
});
export const getLeftEnd: PositionHandler = (rect) => ({
  x: getLeft(rect).x,
  y: getEnd(rect, Direction.Vertical).y
});

export const getTop: PositionHandler = ({ targetRect, wowerlayRect }) => ({
  x: getCenter({ targetRect, wowerlayRect }, Direction.Horizontal).x,
  y: targetRect.y - wowerlayRect.height
});
export const getTopStart: PositionHandler = (rect) => ({
  x: getStart(rect, Direction.Horizontal).x,
  y: getTop(rect).y
});
export const getTopEnd: PositionHandler = (rect) => ({
  y: getTop(rect).y,
  x: getEnd(rect, Direction.Horizontal).x
});

export const getBottom: PositionHandler = ({ targetRect, wowerlayRect }) => ({
  x: getCenter({ targetRect, wowerlayRect }, Direction.Horizontal).x,
  y: targetRect.y + targetRect.height
});
export const getBottomStart: PositionHandler = (rect) => ({
  x: getStart(rect, Direction.Horizontal).x,
  y: getBottom(rect).y
});
export const getBottomEnd: PositionHandler = (rect) => ({
  y: getBottom(rect).y,
  x: getEnd(rect, Direction.Horizontal).x
});

export const checkOutOfScreenTop: OutOfScreenHandler = ({ targetRect, wowerlayRect }) =>
  targetRect.y - wowerlayRect.height < 0;

export const checkOutOfScreenBottom: OutOfScreenHandler = ({ targetRect, wowerlayRect }) =>
  targetRect.y + targetRect.height + wowerlayRect.height > window.innerHeight;

export const checkOutOfScreenLeft: OutOfScreenHandler = ({ targetRect, wowerlayRect }) =>
  targetRect.x - wowerlayRect.width < 0;

export const checkOutOfScreenRight: OutOfScreenHandler = ({ targetRect, wowerlayRect }) =>
  targetRect.x + targetRect.width + wowerlayRect.width > window.innerWidth;
