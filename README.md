<p align="center">
   <img src="md/wowerlay.png">
</p>

Wowerlay is a popover library for Vue 3 applications. It isn't an alternative for [Popper](https://popper.js.org/).

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

To make Wowerlay visible you must set `visibility` to `true` and give a target element, template refs can be given.

Anything goes to `<Wowerlay/>` will be unmounted when `visibility` is `false` and you can change tag of `<Wowerlay/>` wrapper with `tag` prop.

```html
<template>
  <button ref="targetElement" @click="toggle">Hi How Are you?</button>

  <Wowerlay tag="section" :target="targetElement" v-model:visible="isVisible">
    <div>Hey how you doin?</div>
    <button>Good</button>
    <button>Bad</button>
  </Wowerlay>
</template>

<script setup lang="ts">
  import { Wowerlay } from 'wowerlay';
  import { ref } from 'vue';

  /*
   * if you are using typescript define template ref like this otherwise
   * you will get a type error.
   */
  const targetElement = ref<HTMLElement>();
  /* For JS */
  const targetElement = ref(null);

  const isVisible = ref(false);
  const toggle = () => (isVisible.value = !isVisible.value);
</script>
```

If you don't want to use `v-model:visible` syntax you can use the following one:

```html
<template>
  <button ref="targetElement" @click="toggle">Hi How Are you?</button>

  <Wowerlay
    tag="span"
    :target="targetElement"
    :visible="isVisible"
    @update:visible="(state) => isVisible = state"
  >
    <div>Hey how you doin?</div>
    <button>Good</button>
    <button>Bad</button>
  </Wowerlay>
</template>
```

If you don't want to prevent [`attribute inheritance`](https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance) you can use
`<Wowerlay/>` component inside of an element, it will work as expected because it'll be `teleported` to `body` eventually.

```html
<template>
  <button ref="targetElement" @click="toggle">
    Hi How Are you?

    <Wowerlay
      tag="div"
      :target="targetElement"
      :visible="isVisible"
      @update:visible="(state) => isVisible = state"
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
<Wowerlay tag="span" style="width: 300px; height: 300px; display: inline-block">
  Content Goes Here
</Wowerlay>
```

## Emits

```ts
interface WowerlayEmits {
  /**
   * Fires when wowerlay wants to change it's visibility state.
   */
  'update:visible': (visibility: Boolean) => void;

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
   * Target element for Wowerlay to follow
   */
  target: HTMLElement;

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
   * Horizontal gap betweeen Wowerlay and the target
   * @default 0
   */
  horizontalGap?: number;

  /**
   * Vertical gap between Wowerlay and the target.
   * @default 0
   */
  verticalGap?: number;

  /**
   * Disables click blocker background when Wowerlay is visible
   * @default false
   */
  noBackground?: boolean;

  /**
   * Disable or set custom transition for Wowerlay
   * @set false to disable transition
   * @set string to use your own transition name.
   */
  transition?: string | boolean;

  /**
   * If enabled Wowerlay will sync its width same as target's width.
   * @set true to enable.
   * @default false
   */
  syncWidth?: boolean;

  /**
   * If enabled Wowerlay will sync its width same as target's width.
   * @set true to enable.
   * @default false
   */
  syncHeight?: boolean;
}
```

## What about TypeScript?

This package has built-in TypeScript support for events and props. It works with `JSX | TSX` and `Render Functions` with type support.

To have types support in vue files we recommend you to use `Volar`. <br>
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) <br>
[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
