<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Wowerlay } from '../../../src/lib';
import Button from '../../components/Button.vue';

const isOpen = ref(false);
const isLeftButtonActive = ref(false);

const firstTarget = ref<HTMLButtonElement>();
const secondTarget = ref<HTMLButtonElement>();

const targetEl = computed(() =>
  isLeftButtonActive.value ? firstTarget.value : secondTarget.value
);

const toggleVisible = () => (isOpen.value = !isOpen.value);
const toggleTargetElement = (): any => (isLeftButtonActive.value = !isLeftButtonActive.value);
</script>

<template>
  <div class="content">
    <div class="object" ref="firstTarget">Target 1</div>
    <div class="object" ref="secondTarget">Target 2</div>
  </div>

  <br />

  <Button @click="toggleVisible">
    Click to Show Popover
    <Wowerlay v-model:visible="isOpen" :target="targetEl">
      <div style="max-width: 300px">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum porro accusantium sed
        perspiciatis quo! Esse omnis blanditiis atque itaque nemo, eligendi perferendis inventore
        aspernatur vero ipsum rerum porro suscipit repudiandae numquam quasi dolores fugit tenetur
        soluta labore dicta? Vitae fuga officiis, incidunt laboriosam blanditiis reprehenderit
        voluptatem assumenda impedit aliquid fugiat.
        <br />
        <Button @click="toggleTargetElement">Toggle Target</Button>
      </div>
    </Wowerlay>
  </Button>
</template>

<style lang="scss" scoped>
.content {
  width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
