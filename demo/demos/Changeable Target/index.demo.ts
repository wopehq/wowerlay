import { defineDemo, html } from '../../helpers';

import Component from './index.vue';

export const Demo = defineDemo({
  name: 'Changeable Target',
  component: Component,
  template: html`
    <template>
      <div class="object" ref="firstTarget">Target 1</div>
      <div class="object" ref="secondTarget">Target 2</div>

      <Wowerlay :visible="true" :target="wowerlayTarget">
        <div style="max-width: 300px">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
          ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
          quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
          libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
          exercitationem a doloribus.
        </div>
      </Wowerlay>
    </template>
  `,
  script: html`
    <script setup>
      import { ref, computed } from 'vue';

      const firstTarget = ref();
      const secondTarget = ref();

      const wowerlayTarget = computed(() => firstTarget.value || secondTarget.value);
    </script>
  `
});
