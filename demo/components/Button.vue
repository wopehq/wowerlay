<script lang="ts">
export default {
  name: 'Button',
  inheritAttrs: false
};
</script>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { WindowEvents } from 'vue3-window-events';

interface Emits {
  (e: 'update:el', v?: HTMLElement): void;
}
interface Props {
  outline?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const button = ref<HTMLDivElement>();
const isGradientVisible = ref(false);
const gradientCoords = reactive({
  x: 0,
  y: 0
});

watchEffect(() => emit('update:el', button.value));

const handleClick = () => {
  const el = button.value!;
  el.animate(
    [
      { boxShadow: '0px 0px 6px 2px rgba(255, 255, 255, 0.15)' },
      { boxShadow: '0px 0px 12px 4px rgba(28, 179, 255, .6)' },
      { boxShadow: '0px 0px 6px 2px rgba(255, 255, 255, 0.15)' }
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
      outline: props.outline
    }"
  >
    <div :class="{ active: isGradientVisible }" class="gradient"></div>
    <span class="body"><slot /></span>
  </button>
</template>

<style lang="scss" scoped>
$backgroundColor: rgb(28, 179, 255);
$textColor: #0e0e0e;

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
      p-[4px];

  background-color: $backgroundColor;
  color: $textColor;

  .body {
    @apply z-2 inline-flex items-center justify-between rounded px-3 py-3;
  }

  &.outline {
    @apply text-white;
    .body {
      @apply bg-secondary;
    }
  }

  .gradient {
    @apply z-2
         pointer-events-none
         inline-block
         absolute
         rounded-[50%]
         transform
         transition-transform
         duration-100
         scale-0
         translate-x[-50%]
         translate-y-[-50%]
         text;

    $gradientSize: 85px;
    left: calc(v-bind('gradientCoords.x') * 1px);
    top: calc(v-bind('gradientCoords.y') * 1px);
    width: $gradientSize;
    height: $gradientSize;
    background: radial-gradient(farthest-side, rgba(255, 255, 255, 0.65), transparent);
    background-position: 0px 0px;

    &.active {
      @apply scale-100;
    }
  }

  &:active {
    .gradient {
      @apply scale-50;
    }
  }
}
</style>
