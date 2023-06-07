Wowerlay is a popover library for Vue 3 applications. It is based on [Floating UI]()

### About Wowerlay
Wowerlay is created to work well with Vue. It wraps `floating-ui` features with it's own features like `scoping` (See Demo/Scope), `transitioning` (See Demo/Transitions) and mounting-unmounting vue components when popover visiblity changes.

[![wowerlay](https://img.shields.io/npm/v/wowerlay)](https://npmjs.com/package/wowerlay)

## Demos/Examples

You can see all examples [Here](https://wowerlay.pages.dev).

## Intallation

For npm:

```
npm install wowerlay
```

For pnpm:

```
pnpm install wowerlay
```

For yarn:

```
yarn add wowerlay
```

## Usage

First you need to import the `stylesheet`.

### `main.js`

```ts
import 'wowerlay/style.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

## Using Wowerlay.

Using wowerlay is simple, place it anywhere in your component (It will be teleported to body) and give `target` and `visible` props. Wowerlay will follow it's `target` when `visible` is true otherwise it will not be mounted.

Wowerlay is just a `div` element, any attribute that is not a Wowerlay prop will be passed as attribute to the element. Element tag can be changed by `tag` prop.

```html
<template>
  <button
    ref="targetElement"
    @click="visible = !visible"
  >
    Show Popover?
  </button>

  <Wowerlay
    tag="section"
    :target="targetElement"
    v-model:visible="visible"
  >
    <div>Hey how you doin?</div>
    <button>Good</button>
    <button>Bad</button>
  </Wowerlay>
</template>

<script setup lang="ts">
  import { Wowerlay } from 'wowerlay';
  import { ref } from 'vue';

  const targetElement = ref<HTMLElement>();
  const visible = ref(false);
</script>
```

If you don't want to prevent [`attribute inheritance`](https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance) you can use Wowerlay inside of an element, it'll be `teleported` to `body`.

```html
<template>
  <button
    ref="targetElement"
    @click="visible = !visible">
    Show popover

    <Wowerlay
      tag="div"
      :target="targetElement"
      :visible="visible"
      @update:visible="(value) => visible = value"
    >
      <div>Hey how you doin?</div>
      <button>Good</button>
      <button>Bad</button>
    </Wowerlay>
  </button>
</template>
```

## Styling Wowerlay

Styling wowerlay is simple. `<Wowerlay/>` is just a single wrapper element.

**!! You shouldn't change necessary styles !!**

```html
<Wowerlay
  tag="span"
  style="width: 300px; height: 300px; display: inline-block"
>
  Content Goes Here
</Wowerlay>
```

 ##### Z-index
 - You can set `--wowerlay-z` CSS parameter for Wowerlay z-index.

## Updating Position Dynamically

You can use TemplateRef to update position dynamically, this will ignore fixed prop.

```html
<Wowerlay ref="wowerlayInstance">
  Content Goes Here
</Wowerlay>

<script setup lang="ts">
import { WowerlayTemplateRef } from 'wowerlay'

const wowerlayInstance = ref<WowerlayTemplateRef>();

function updateSomeTime() {
  wowerlayInstance.value?.update();
}
</script>
```

## Emits

```ts
interface WowerlayEmits {
  /**
   * Fires when wowerlay wants to change it's visibility state.
   */
  'update:visible': (visible: Boolean) => void;

  /**
   * Fires when Wowerlay element changes, this can be used to do some DOM stuff to Wowerlay popover element.
   * Can be used as v-model:el
   */
  'update:el': (element: HTMLElement | null) => void;
}
```

## Props

```ts
interface WowerlayProps {
  /**
   * Primary position for Wowerlay.
   * @default "bottom"
   */
  position?:
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

  /**
   * Target for Wowerlay to follow
   */
  target: HTMLElement | VirtualElement;

  /**
   * If given, Wowerlay will be able to leave screen.
   * @default false
   */
  canLeaveViewport?: boolean;

  /**
   * If given Wowerlay won't update its position after mounted
   * @default false
   */
  fixed?: boolean;

  /**
   * If given Wowerlay will not flip to stay in view.
   * @default false
   */
  noFlip?: boolean;

  /**
   * Tag name for Wowerlay wrapper element.
   * @default "div"
   */
  tag?: string;

  /**
   * Gap between Wowerlay and the target.
   * @default 0
   */
  gap?: number;

  /**
   * Removes click blocker background when Wowerlay is visible
   * @default false
   */
  noBackground?: boolean;

  /**
   * Disable or set custom transition for Wowerlay
   * @set string to use your own transition name.
   * @set function to use a custom handler..
   * @see "Demo/JS Transition"
   */
  transition?: string | WowerlayTransitionFn;

  /**
   * If enabled Wowerlay will sync its placement bounds same as target's bounds.
   * @default false
   */
  syncSize?: boolean;

  /**
   * Any given attribute (except key) is passed to Wowerlay`s wrapper background element.
   * @default {}
   */
  backgroundAttrs?: {
    // This means that do not pass a key it will be dropped.
    key?: undefined | null;
    ref?: ((element: HTMLDivElement) => void) | Ref<HTMLElement | null | undefined>;
    [key: string]: any;
  };

  /**
   * Custom middlewares for Floating-UI.
   * @default {}
   */
  middlewas?: Middleware[];
}
```

## Special Attributes
Wowerlay has two special attributes for managing close on click situations.
These attributes help users not to use `stopPropagation` to control Wowerlay close mechanism.

- `data-wowerlay-scope`: If clicked element or any of its parent element has this attribute, only Wowerlay instances that is attached to any children  of the scope element will close on click.

- `data-wowerlay-stop`: If clicked element or any of its parent element has this attribute, Wowerlay will not fire close event. This is intended to be alternative of `stopPropagation`.

- See [demo](https://wowerlay.pages.dev) for examples.