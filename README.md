### A Overlay/Popover library for Vue3.

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

You must have `<WowerlayContainer/>` in your `App.vue`. WowerlayContainer is just a `div` element with wrapped by `<Teleport/>` so it will automatically teleport itself to end of the `body`. WowerlayContainer will keep overlays inside and is invisible, not targetable by pointers.

### `App.vue`

```html
<template>
  <!-- IMPORTANT | DO NOT FORGET THIS -->
  <WowerlayContainer />
  <Navbar />
  <router-view />
  <!-- don't use multiple times! -->
  <WowerlayContainer_But_Shouldnt_Be_Used_More_Than_Once />
</template>

<script setup>
  import { WowerlayContainer } from 'wowerlay';
</script>

<!-- FOR NORMAL SCRIPT -->
<script>
  import { WowerlayContainer } from 'wowerlay';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { WowerlayContainer }
  });
</script>
```

## Creating overlay.

To create an overlay you must at least set a `visibility` handler value and give a target element, template ref values can be given.

Don't worry, anthing goes to `<Wowerlay/>` will be unmounted when visible is `false` but currently we don't recommend you to use it with `<KeepAlive/>` because we haven't test it yet.

And `<Wowerlay/>` component is jut a `div` with extra features, you can change tag of it with `tag` prop.

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

  /* if you are using typescript define template ref like this otherwise
   * you will get a type error.
   * const targetElement = ref<HTMLElement | null>(null);
   */
  const targetElement = ref(null);
  const isVisible = ref(false);
  const toggle = () => (isVisible.value = !isVisible.value);
</script>
```

If you don't prefer `v-model:visible` syntax you can use this one;

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
`<Wowerlay/>` component inside of target button, it will work as expected because it will be `teleported` to `body` eventually.

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

Styling wowerlay is too simple because `<Wowerlay/>` is just a single wrapper element. You can give any class any style and any attribute to it, that's why it doesn't have props like `width`, `height` because you have full control with styles.

`!!! Except necessary styles, please do not break them :)`

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
}
```

## What about TypeScript?

This package has built-in typescript support for events and props it should work with `.tsx` files. If you check source code of this project you can see we this library in tsx.

To have types support in vue files we recommend you to use `Volar` plugin. <br>
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) <br>
[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
