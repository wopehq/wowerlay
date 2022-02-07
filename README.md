### Overlay/Popover library for Vue 3

<br>

<p align="center">
   <img src="md/wowerlay.png">
</p>

[![wowerlay](https://img.shields.io/npm/v/wowerlay)](https://npmjs.com/package/wowerlay)

## Demos

You can view and test all demos: [Click](https://wowerlay.pages.dev)

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

First you have to register the plugin and import `style` file.

### `main.(js|ts)`

```ts
// import style file!
import 'wowerlay/style.css';

import { createWowerlay } from 'wowerlay';
import { createApp } from 'vue';
import App from './App.vue';

const wowerlay = createWowerlay();
const app = createApp(App);
app.use(wowerlay);
app.mount('#app');
```

## Using Wowerlay.

To make Wowerlay visible you must set `visibility` to `true` and give a target element, template refs can be given.

Don't worry, anthing goes to `<Wowerlay/>` will be unmounted when visible is `false`.

And `<Wowerlay/>` component is just a `div` with extra features, you can change the tag of it with `tag` prop.

```html
<template>
  <button ref="targetElement" @click="toggle">Hi How Are you?</button>

  <Wowerlay tag="section" :target="targetElement" v-model:visible="isVisible">
    <div>Hey how you doin?</div>
    <button>Good</button>
    <button>Bad</button>
  </Wowerlay>
</template>

<!-- Typescript is optional -->
<script setup lang="ts">
  import { Wowerlay } from 'wowerlay';
  import { ref } from 'vue';

  /*
   * if you are using typescript define template ref like this otherwise
   * you will get a type error.
   */
  const targetElement = ref<HTMLElement>();
  const targetElement = ref(null);

  const isVisible = ref(false);
  const toggle = () => (isVisible.value = !isVisible.value);
</script>
```

If you don't want to use `v-model:visible` syntax you can use the following one;

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

And lastly if you don't want to stop [`attribute inheritance`](https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance) you can use
`<Wowerlay/>` component inside of an element, it will work as expected because it will be `teleported` to `body` eventually.

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

Styling wowerlay is too simple because `<Wowerlay/>` is just a single wrapper element. You can give any class any style and any attribute to it, that's why it doesn't have props like `width` and `height`.

**!!! Except necessary styles, avoid to change them !!!**

```html
<Wowerlay tag="span" style="width: 300px; height: 300px; display: inline-block">
  Content Goes Here
</Wowerlay>
```

## Props

```ts
interface WowerlayProps {
  /**
   * If given Wowerlay won't update its position after mounted
   */
  fixed: boolean;
  /**
   * Horizontal gap betweeen Wowerlay and the target
   * @default 0
   */
  horizontalGap: number;
  /**
   * Primary position for Wowerlay.
   * @default "bottom"
   */
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
  /**
   * Tag name for Wowerlay wrapper element.
   * @default "div"
   */
  tag: string;
  /**
   * Target element for Wowerlay to follow
   */
  target?: HTMLElement;
  /**
   * Vertical gap between Wowerlay and the target.
   * @default 0
   */
  verticalGap: number;
  /**
   *
   * Disables click blocker background when Wowerlay is visible
   * @default false
   */
  noBackground: boolean;
  /**
   * Disable or set custom transition for Wowerlay
   * @set {false} to disable transition
   * @set {string} to use your own transition name (enter-to, enter-from, enter-active class animation name)
   */
  transition: string | boolean;
}
```

## What about TypeScript?

This package has built-in TypeScript support for events and props. It works with `JSX | TSX` and `Render Functions` with type support. Check the source code we wrote the library in `TSX`.

To have types support in vue files we recommend you to use `Volar` plugin. <br>
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) <br>
[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
