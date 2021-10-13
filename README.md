[![simplebar-vue3](https://img.shields.io/npm/v/simplebar-vue3)](https://npmjs.com/package/simplebar-vue3)

### A Vue3 Wrapper for SimpleBar

### Intallation

For npm and pnpm:

```
(npm or pnpm) install simplebar simplebar-vue3
```

For yarn:

```
yarn add simplebar simplebar-vue3
```

### Usage

You need to import simplebar stylesheet in your `main.(js|ts)` file for scrollbar to look normal and work. <br>

##### main.(js|ts)

```ts
import 'simplebar/dist/simplebar.min.css';

import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');
```

To use it in `.vue` files just import the component and use.

```html
<template>
   <SimpleBar style="height: 500px; overflow-y: auto"> ... Content Goes here </SimpleBar>
</template>

<script setup>
   import { SimpleBar } from 'simplebar-vue3';
</script>
<!-- FOR NORMAL SCRIPT -->
<script>
   import { SimpleBar } from 'simplebar-vue3';
   import { defineComponent } from 'vue';

   export default defineComponent({
      components: { SimpleBar }
   });
</script>
```

### Accessing Simplebar Instance

##### Via event;

If you want to access simplebar instance by event you can use `@created` event.

```html
<template>
   <SimpleBar
      @created="instance => {
         simplebarInstance = instance;
      }"
   >
   </SimpleBar>
</template>

<!-- Typescript is optional -->
<script setup lang="ts">
   import type { SimplebarInstanceRef } from 'simplebar-vue3';
   import { SimpleBar } from 'simplebar-vue3';
   import { ref } from 'vue';

   const simplebarInstance = ref<SimplebarInstanceRef>(null);
</script>
```

##### Via template ref;

You access simplebar instance ref

```html
<template>
   <SimpleBar ref="simplebarInstance"> </SimpleBar>
   <!-- Or this behavior can be used but it will give type error probably -->
   <SimpleBar :ref="(instance) => { simplebarInstance = instance }"> </SimpleBar>
</template>

<!-- Typescript is optional -->
<script setup lang="ts">
   import type { SimplebarInstanceRef } from 'simplebar-vue3';
   import { SimpleBar } from 'simplebar-vue3';
   import { ref } from 'vue';

   const simplebarInstance = ref<SimplebarInstanceRef>(null);
</script>
```

##### Via composable;

In **CHILD COMPONENTS** you can use `useSimplebar` composable to access simplebar instance as a **Ref**. <br>
**NOTE:** If you try access to instance before parent `mounted` this composable will return `null`;

##### parent.vue

```html
<SimpleBar>
   <ChildComponent />
</SimpleBar>
```

##### child.vue

```html
<!-- Typescript is optional -->
<script lang="ts">
   import { useSimplebar } from 'simplebar-vue3';
   import { onMounted } from 'vue';

   const simplebar = useSimplebar();
   onMounted(() => {
      simplebar.value.recalculate();
      simplebar.value.el.getBoundingClientRect();
      // or more
   });
</script>
```

### Options

You can give these options to the component as props.

```ts
import { Options } from 'simplebar';

interface SimpleBarProps {
   tag?: string; //default 'div'

   // Simplebar Options as prop
   autoHide?: Options['autoHide'];
   classNames?: Options['classNames'];
   clickOnTrack?: Options['clickOnTrack'];
   direction?: Options['direction'];
   forceVisible?: Options['forceVisible'];
   scrollbarMaxSize?: Options['scrollbarMaxSize'];
   scrollbarMinSize?: Options['scrollbarMinSize'];
   timeout?: Options['timeout'];
}
```

### TypeScript Support

This package has built-in typescript support for events and props it should work with `.tsx` files with no trouble.

To have types support in vue files we recommend you to use `Volar` plugin. <br>
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) <br>
[TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
