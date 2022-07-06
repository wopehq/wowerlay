## 0.6.0

- **Updated** Now each Wowerlay instance will climb from target element to root element and attach a `scroll` event for better auto replacement.
- **Updated** Now each Wowerlay instance adds a click event to Window, it used to be single click event for all instances.

#### Breaking Changes

- **Deprecated** `createWowerlay`, now each Wowerlay component instance are independent, altough we still provide an empty function not to break projects.

<br>

## 0.5.2

## 0.5.1

- **Added** `syncWidth` and `syncHeight` props.

#### Demos/Samples

- **Added** demo for `syncWidth` and `syncHeight` props.

<br>

## 0.5.0

- **Updated** readme.
- **Added** `noFlip` prop.
- **Added** `update:el` emit.

#### Demos/Samples

- **Refactored** all demos and directory structure.
- **Reordered** demos from simple to complicated.

<br>

## 0.4.3

- **Added** Custom transition support.

#### Demos/Samples

- **Added** `No Transition` sample.
- **Added** `Custom Transition` sample.

<br>

## 0.4.2

- **Added** [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) support for supporting browsers.

#### Demos/Samples

- **Added** `Dynamic Bounds` sample.

<br>

## 0.4.1

- **Fix** clicking container of Wowerlay is causing other Wowerlays to close.

<br>

## 0.4.0

- **Added** `noBackground` prop.
- **Fixed** scrollbar width/height isn't counting for screen bounds check.
- **Updated** readme.

#### Breaking Changes

- **Removed** `WowerlayContainer` component.

<br>

## 0.3.2

- **Updated** README.md

<br>

## 0.3.1

- **Fixed** `verticalGap` and `horizontalGap` props are not working.

#### Demo

- **Added** `With Gaps` demo.

<br>

## 0.3.0

- **Added** new positions.

#### Breaking Changes

- **Removed** `centered` prop.

<br>

## 0.1.1

- **Fixed** clicking Wowerlay is not hiding child Wowerlay components.
- **Added** `centered` prop.

<br>

## 0.1.0

- **Added** `fixed`, `verticalGap`, `horizontalGap`, `position` props.
- **Added** watching `target` prop for changes.
- **Added** online demo page.

<br>

## 0.0.1

- First Ready to use build.
