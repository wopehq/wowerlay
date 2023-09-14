## 1.1.0
#### Breaking Changes
  - Transition handling mechanism is changed, now `Transition` component is on top of `wowerlay-background` element, that means you are targeting background element if `noBackground` prop is not given. For CSS transitions now users must select `.wowerlay-background-name-active .wowerlay` if target is background. 

    For JavaScript api you can now choose `popover, background` explicitly. See [demo](https://wowerlay.pages.dev/) page for examples.

## 1.0.2
  - Fixed minor problem.
  
<br>

## 1.0.1
#### New Features
  - Added `arrow` slot for supporting custom arrows.

  - Added `arrowPadding` prop for `floating-ui` `arrow` middleware.

<br>

## 1.0.0
#### Breaking Changes
  - Now instead of custom positioning algorithm, Wowerlay uses floating-ui.
  - `syncWidth` and `syncHeight` props are changed to single `syncSize` prop. Depending on the side it will synchronize the bounds.
  
  - `verticalGap` and `horizontalGap` props are changed to single `gap` prop. Depending on the side it will put the gap.
  
  - Now Wowerlay doesn't come with an opacity transition, by default Wowerlay has no transition.
  
  - `transition` prop does not accept `false` anymore.

#### New Features
  - Now thanks to `floating-ui`, Wowerlay supports `VirtualElement` a.k.a an object with `getBoundingClientRect` as the target.

  - New `middlewares[]` prop can inject custom middlewares into `Floating-UI`.

  - Now Wowerlay writes it's information to itself as attributes: `data-popover-placement`, `data-popover-rect`, `data-popover-x` and `data-popover-y`. Purpose of these attributes are `placement-based` transitioning. See `Demo/JS Transition` for sample code.
  
  - Now `transition` prop accepts a function that handles both enter and leave transitions.  See `Demo/JS Transition` for sample code.

  - Some of the `Floating-UI` types are exported from Wowerlay.

<br>

## 0.8.0

- **Added** `data-wowerlay-scope` and `data-wowerlay-stop` attributes. See [demo](https://wowerlay.pages.dev/) page for examples.

#### Behavior Changes
  - Formerly Wowerlay was using `event.stopPropagation` on click for Popover and Background. Wowerlay would have listened 3 events and those were self click, background click and window click.

    With new attributes we just have single `window click` listener. Even Wowerlay uses special attributes for nested Wowerlays to work properly and to prevent closing itself `(data-wowerlay-stop)`.

    This update mey be both `Breaking Change` and `Behavior Change` current users may be using `stopPropagation` for Wowerlay's listener.


<br>

## 0.7.0

- **Added** `backgroundAttrs` prop, with this you can pass any attribute to Wowerlay's background element.
  > `key` attribute is black listed, wont be injected. If we didn't prevent it, it would create conflicts in Wowerlay state. If you want to pass a `key`, pass it to Wowerlay instead.
- **Updated** readme.

#### Behavior Changes
  - Now Wowerlay do not leave a `div.wowerlay-background` when it isn't visible.
  - Now if `noBackground` prop is given, instead of adding `.no-background` to background element, Wowerlay mounts to body without a background element.

#### Breaking Changes
  - **Removed** createWowerlay function `(it's deprecated in 0.6.0)`.

<br>

## 0.6.1

- **Added** custom expose (template ref).
- **Updated** readme.

<br>

## 0.6.0

- **Updated** Now each Wowerlay instance will climb from target element to root element and attach a `scroll` event for better auto replacement.
- **Updated** Now each Wowerlay instance adds a click event to Window, it used to be single click event for all instances.

#### Breaking Changes

- **Deprecated** `createWowerlay`, now each Wowerlay component instance are independent, altough we still provide an empty function not to break projects.

<br>

## 0.5.1 / 0.5.2

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
