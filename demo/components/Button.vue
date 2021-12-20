<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Button',
  inheritAttrs: false
});
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { WindowEvents } from 'vue3-window-events';

interface Props {
  onlyGradient?: boolean;
}
const props = defineProps<Props>();

const button = ref<HTMLDivElement>();
const gradient = ref<HTMLDivElement>();
const isGradientVisible = ref(false);
const gradientCoords = reactive({
  x: 0,
  y: 0
});

const handleClick = () => {
  if (props.onlyGradient) return;

  const el = button.value!;
  el.animate(
    [
      { boxShadow: '0px 0px 6px 2px rgba(255, 255, 255, 0.15)' },
      { boxShadow: '0px 0px 12px 4px rgba(28, 179, 255, .6)' },
      { boxShadow: '0px 0px 6px 2px rgba(255, 255, 255, 0.15)' }
    ],
    { duration: 600, easing: 'ease-out' }
  );

  gradient.value?.animate(
    [
      { transform: `scale(1) translate(-50%, -50%)` },
      { transform: `scale(8) translate(-50%, -50%)` },
      { transform: `scale(1) translate(-50%, -50%)` }
    ],
    { duration: 600, easing: 'ease-out' }
  );
};

const handleMouseMove = (e: MouseEvent) => {
  const { x, y, width, height } = button.value!.getBoundingClientRect();
  const { clientX, clientY } = e;

  isGradientVisible.value = true;

  const newX = clientX - x;
  const newY = clientY - y;

  if (Math.abs(newX) <= width + 75 && Math.abs(newY) <= height + 75) {
    gradientCoords.x = newX;
    gradientCoords.y = newY;
  } else {
    isGradientVisible.value = false;
  }
};

defineExpose(button);
</script>

<template>
  <WindowEvents @mousemove="handleMouseMove" />

  <button
    v-bind="$attrs"
    ref="button"
    @click="handleClick"
    class="button-bg"
    :class="{
      'with-gradient': isGradientVisible,
      'only-gradient': props.onlyGradient
    }"
  >
    <div ref="gradient" :class="{ active: isGradientVisible }" class="gradient"></div>
    <span class="body"><slot /></span>
  </button>
</template>

<style lang="scss" scoped>
$backgroundColor: rgb(28, 179, 255);
$textColor: #0e0e0e;
$padding: 8px 13px;
$radius: 3px;

.button-bg {
  @apply inline-flex
      relative
      overflow-hidden
      items-center
      justify-center
      cursor-default
      text-size-15px
      font-bold
      transition-shadow
      rounded
      select-none
      px-4 py-3;

  background-color: $backgroundColor;
  color: $textColor;

  .body {
    @apply z-2;
  }

  .gradient {
    @apply z-2
         pointer-events-none
         inline-block
         absolute
         origin-top-left
         rounded-[50%]
         transform
         transition-transform
         duration-200
         scale-0
         translate-x[-50%]
         translate-y-[-50%]
         text;

    $gradientSize: 150px;
    left: calc(v-bind('gradientCoords.x') * 1px);
    top: calc(v-bind('gradientCoords.y') * 1px);
    width: $gradientSize;
    height: $gradientSize;
    background: radial-gradient(farthest-side, rgba(255, 255, 255, 0.5), transparent);
    background-position: 0px 0px;

    &.active {
      transform: scale(1) translate(-50%, -50%);
    }
  }

  &:not(.only-gradient):hover {
    box-shadow: 0px 0px 6px 1px rgba(255, 255, 255, 0.2);
  }

  &:active {
    .gradient {
      @apply scale-50 translate-x-[-50%] translate-y-[-50%];
    }
  }
}
</style>
