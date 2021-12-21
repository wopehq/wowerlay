<script lang="ts" setup>
import { Wowerlay, WowerlayProps } from '../../../src/lib';
import { ref } from 'vue';
import Button from '../../components/Button.vue';
import Select from '../../components/Select.vue';

const targetEl = ref<HTMLElement>(null!);
const isOpen = ref(false);

const positions: {
  [Key in WowerlayProps['position']]: string;
} = {
  'bottom-end': 'Bottom End',
  'bottom-start': 'Bottom Start',
  bottom: 'Bottom',
  'left-end': 'Left End',
  'left-start': 'Left Start',
  'right-end': 'Right End',
  'right-start': 'Right Start',
  'top-end': 'Top End',
  'top-start': 'Top Start',
  left: 'Left',
  right: 'Right',
  top: 'Top'
};

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
    <Select :data="positions" v-model="position" />

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
