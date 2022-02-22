import { defineComponent, ref } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const Component = defineComponent({
  name: 'Nested',
  setup() {
    const secondTarget = ref<HTMLElement>();
    const secondPopoverVisibility = ref(false);

    return {
      ...useDemoState(),
      secondPopoverVisibility,
      secondTarget,
    };
  },
  render() {
    return (
      <button type="button" onClick={this.toggleVisible} ref="targetEl">
        Click to Show Popover
        <Wowerlay
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
        >
          <div style="max-width: 300px">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
            sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
            vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
            facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
            quisquam exercitationem a doloribus.
            <br />
            <button
              type="button"
              onClick={() => {
                this.secondPopoverVisibility = true;
              }}
              ref="secondTarget"
            >
              Toggle Second Popover
              <Wowerlay
                onUpdate:visible={(v) => {
                  this.secondPopoverVisibility = v;
                }}
                visible={this.secondPopoverVisibility}
                target={this.secondTarget}
              >
                <div style="max-width: 300px">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui
                  asperiores, sed ipsa fuga, repellendus officiis labore odit temporibus quisquam
                  necessitatibus? Illo vitae quis reprehenderit sequi quae iste, fuga quasi atque et
                  voluptatibus. Debitis, facere, libero voluptate tempore omnis voluptas corporis
                  fugiat sequi quidem cumque quisquam exercitationem a doloribus.
                </div>
              </Wowerlay>
            </button>
          </div>
        </Wowerlay>
      </button>
    );
  },
});

export default defineDemo({
  name: 'Nested',
  component: Component,
  /* prettier-ignore */
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay 
          style="max-width: 300px"
          v-model:visible="visible"
          :target="target"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
          ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
          quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
          libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
          exercitationem a doloribus.

          <button @click="secondVisible = !secondVisible" ref="secondTarget">
            Toggle Second Popover
            <Wowerlay
              style="max-width: 300px"
              v-model:visible="secondVisible"
              :target="secondTarget"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui
              asperiores, sed ipsa fuga, repellendus officiis labore odit temporibus quisquam
              necessitatibus? Illo vitae quis reprehenderit sequi quae iste, fuga quasi atque et
              voluptatibus. Debitis, facere, libero voluptate tempore omnis voluptas corporis
              fugiat sequi quidem cumque quisquam exercitationem a doloribus.
            </Wowerlay>
          </button>
        </Wowerlay>
      </button>
    </template>
  `,
  script: html`
    <script setup>
      import { ref } from 'vue';

      const visible = ref(false);
      const secondVisible = ref(false);

      const secondTarget = ref();
      const target = ref();
    </script>
  `,
});
