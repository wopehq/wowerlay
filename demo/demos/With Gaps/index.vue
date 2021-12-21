<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { Wowerlay, WowerlayProps } from '../../../src/lib';
import Button from '../../components/Button.vue';

const targetEl = ref<HTMLElement>();
const visibility = ref(false);

const verticalGap = ref(0);
const horizontalGap = ref(0);

const positionCount = ref(0);
const positions: WowerlayProps['position'][] = [
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end'
];

const position = computed(() => positions[positionCount.value % positions.length]);
onMounted(() => setTimeout(() => (visibility.value = true), 250));
</script>

<template>
  <div class="object">
    <div class="input-wrapper">
      verticalGap: <input type="number" v-model.number="verticalGap" />
    </div>
    <br />
    <div class="input-wrapper">
      horizontalGap: <input type="number" v-model.number="horizontalGap" />
    </div>
  </div>

  <br />
  <br />

  <div class="object" ref="targetEl">
    Click to Show Popover
    <Wowerlay
      :verticalGap="verticalGap"
      :horizontalGap="horizontalGap"
      :position="position"
      :visible="visibility"
      :target="targetEl"
      noBackground
    >
      <div style="max-width: 300px">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
        ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
        quis reprehenderit sequi quae iste.
        <br />
        <Button @click="positionCount++">Update Position</Button>
      </div>
    </Wowerlay>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  @apply flex w-full flex-row flex-nowrap justify-between gap-10px;
}
</style>
