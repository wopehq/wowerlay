import { defineDemo, html } from '../../helpers';

import Component from './index.vue';

export const Demo = defineDemo({
  name: 'Following Popover',
  component: Component,
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay v-model:visible="visible" :target="target">
          <div style="max-width: 300px">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
            sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
            vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
            facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
            quisquam exercitationem a doloribus.
          </div>
        </Wowerlay>
      </button>
    </template>
  `,
  script: html`
    <script setup>
      import { ref } from 'vue';

      const visible = ref(false);
      const target = ref();
    </script>
  `
});
