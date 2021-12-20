<script lang="ts" setup>
import { Wowerlay, WowerlayProps } from '../../../src/lib';
import { ref } from 'vue';
import Button from '../../components/Button.vue';

const targetEl = ref<HTMLElement>(null!);
const isOpen = ref(false);

const position = ref('bottom' as WowerlayProps['position']);

const toggleVisible = () => (isOpen.value = !isOpen.value);
</script>

<template>
  <div
    :style="{
      display: 'inline-block',
      margin: '0 auto'
    }"
  >
    <select v-model="position" placeholder="Select Position">
      <option value="left">Left</option>
      <option value="left-start">Left Start</option>
      <option value="left-end">Left End</option>
      <option value="right">Right</option>
      <option value="right-start">Right Start</option>
      <option value="right-end">Right End</option>
      <option value="top">Top</option>
      <option value="top-start">Top Start</option>
      <option value="top-end">Top End</option>
      <option value="bottom">Bottom</option>
      <option value="bottom-start">Bottom Start</option>
      <option value="bottom-end">Bottom End</option>
    </select>
    <br />
    <br />

    <div style="color: white">
      position: <strong>{{ position }}</strong>
    </div>

    <br />
    <Button @click="toggleVisible" v-model:el="targetEl">
      Click to Show Popover
      <Wowerlay v-model:visible="isOpen" :target="targetEl" :position="position">
        <div style="max-width: 300px">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
          ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
          quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
          libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
          exercitationem a doloribus.
        </div>
      </Wowerlay>
    </Button>
  </div>
</template>
