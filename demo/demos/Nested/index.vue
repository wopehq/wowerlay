<script lang="ts" setup>
import { ref } from 'vue';

import { Wowerlay } from '../../../src/lib';
import Button from '../../components/Button.vue';

const targetEl = ref<HTMLElement>();
const isOpen = ref(false);

const toggleVisible = () => (isOpen.value = !isOpen.value);

const secondTarget = ref<HTMLElement>();
const secondPopoverVisibility = ref(false);
</script>

<template>
  <Button @click="toggleVisible" v-model:el="targetEl">
    Click to Show Popover
    <Wowerlay v-model:visible="isOpen" :target="targetEl">
      <div style="max-width: 300px">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
        ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
        quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
        libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
        exercitationem a doloribus.
        <br />
        <Button @click="secondPopoverVisibility = true" v-model:el="secondTarget">
          Toggle Second Popover
          <Wowerlay v-model:visible="secondPopoverVisibility" :target="secondTarget">
            <div style="max-width: 300px">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
              sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus?
              Illo vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus.
              Debitis, facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem
              cumque quisquam exercitationem a doloribus.
            </div>
          </Wowerlay>
        </Button>
      </div>
    </Wowerlay>
  </Button>
</template>
