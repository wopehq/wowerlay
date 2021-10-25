### A Overlay/Popover library for Vue3. (WORK IN PROGRESS BUT WORKS)

<p align="center">
   <img src="md/wowerlay.png">
</p>

[![wowerlay](https://img.shields.io/npm/v/wowerlay)](https://npmjs.com/package/wowerlay)

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

Don't worry, anthing goes to `<Wowerlay/>` will be unmounted when visible is `false` but currently I don't recommend you to use it with `<KeepAlive/>` because I haven't test it yet.

And `<Wowerlay/>` component is jut a `div` with extra features, you can change tag of it with `tag` prop.

```html
<template>
  <button ref="targetElement" @click="toggle">Hi How Are you?</button>
  <!-- tag prop is "div" by default -->
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

  // if you are using typescript define template ref like this otherwise
  // you will get a type error.
  // const targetElement = ref<HTMLElement | null>(null);
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
    <!-- nice right? but be careful with recursive components :) -->
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

Styling wowerlay is too simple because `<Wowerlay/>` is just a single wrapper element. You can give any class any style and any attribute to it, that's why I didn't make props like `width`, `height` because you have full control with styles.

`!!! Except necessary ones, please do not break them :)`

By default `<Wowerlay/>` will try to fit in viewport. If you don't want that behavior in future you can use `disableFit: boolean` prop but not implemented yet.

```html
<Wowerlay tag="something" style="width: 300px; height: 300px;"> Content Goes Here </Wowerlay>
```

## Props

Currently `target` and `visible` props are supported, other ones will be finished in the future.

```ts
export interface OverlayProps {
  align?: 'auto' | 'top' | 'bottom'; // not implemented yet
  canLeaveViewport?: boolean; // not implemented yet
  disableFit?: boolean; // not implemented yet
  noFollow?: boolean; // not implemented yet
  target: null | HTMLElement;
  tag?: string; // default: "div"
}
```

## What about TypeScript?

This package has built-in typescript support for events and props it should work with `.tsx` files. If you check source code of this project you can see I wrote whole plugin with tsx.

To have types support in vue files we recommend you to use `Volar` plugin. <br>
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) <br>
[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
