<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import Highlight from './components/Highlight.vue';
import { IDemo } from './helpers';
import { Sheet } from 'bottom-sheet-vue3';
import Button from './components/Button.vue';

const demosGlob = import.meta.globEager('./demos/**/*.demo.ts') as Record<string, { Demo: IDemo }>;
const demos = Object.values(demosGlob).map(($export) => $export.Demo);

const centerScreen = () => {
  const { scrollWidth, scrollHeight } = document.documentElement;
  document.documentElement.scroll({
    left: (scrollWidth - window.innerWidth) / 2,
    top: (scrollHeight - window.innerHeight) / 2,
    behavior: 'smooth'
  });
};

const activeDemoIndex = ref(0);
const isCodeSampleVisible = ref(false);

const DemoComponent = computed(() => demos[activeDemoIndex.value].component);
const activeDemo = computed(() => demos[activeDemoIndex.value]);
const isWithCodeSamples = computed(() => !!activeDemo.value.script || !!activeDemo.value.template);

const isActive = (index: number) => activeDemoIndex.value === index;

watch(activeDemoIndex, centerScreen, { flush: 'post' });
onMounted(() => {
  setTimeout(() => {
    centerScreen();
  }, 250);
});
</script>

<template>
  <div class="demo-container">
    <div class="demo-menu">
      <div
        v-for="(demo, index) in demos"
        @click="activeDemoIndex = index"
        class="demo-menu-item"
        :class="{
          active: isActive(index)
        }"
      >
        {{ demo.name }}
      </div>

      <Button
        v-if="isWithCodeSamples"
        @click="isCodeSampleVisible = true"
        class="demo-show-code-button"
      >
        Show Code
      </Button>
    </div>

    <div class="demo-content">
      <component :is="DemoComponent" />

      <Sheet
        v-if="isWithCodeSamples"
        sliderIconColor="rgb(15, 15, 15)"
        containerColor="rgba(55,55,55, .6)"
        sheetColor="rgb(28, 28, 28)"
        v-model:visible="isCodeSampleVisible"
      >
        <Highlight v-if="activeDemo.template" language="html" :code="activeDemo.template" />
        <Highlight v-if="activeDemo.script" language="html" :code="activeDemo.script" />
      </Sheet>
    </div>
  </div>
</template>
