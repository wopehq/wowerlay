import { Wowerlay, WowerlayProps } from '../../src/lib';
import { defineComponent, ref } from 'vue';
import { defineDemo, html } from '../helpers';

import { WowerlayBaseProps } from '../../src/components/WowerlayReusables';

const Component = defineComponent({
  setup() {
    const targetEl = ref<HTMLElement>();
    const isOpen = ref(false);

    const handleVisibleChange = (state: boolean) => (isOpen.value = state);
    const toggleVisible = () => (isOpen.value = !isOpen.value);

    const count = ref(0);
    const positions = ['bottom', 'right', 'top', 'left'] as WowerlayBaseProps['position'][];
    const position = ref<WowerlayProps['position']>('bottom');

    const updatePosition = () => {
      count.value++;
      position.value = positions[count.value % positions.length];
    };

    return {
      isOpen,
      targetEl,
      handleVisibleChange,
      toggleVisible,
      updatePosition,
      position
    };
  },
  render() {
    return (
      <button onClick={this.toggleVisible} ref="targetEl">
        Click to Show Popover
        <Wowerlay
          centered
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
          position={this.position}
        >
          <div style="max-width: 300px">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
            sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
            vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
            facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
            quisquam exercitationem a doloribus.
            <br />
            <button onClick={this.updatePosition}>Update position</button>
          </div>
        </Wowerlay>
      </button>
    );
  }
});

export const Demo = defineDemo({
  name: 'Centered',
  component: Component,
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay centered v-model:visible="visible" :target="target">
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
