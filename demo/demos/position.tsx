import { Wowerlay, WowerlayProps } from '../../src/lib';
import { defineComponent, ref } from 'vue';
import { defineDemo, html } from '../helpers';

const Component = defineComponent({
  name: 'PopoverFollow',
  setup() {
    const targetEl = ref<HTMLElement>(null!);
    const isOpen = ref(false);

    const position = ref('bottom' as WowerlayProps['position']);

    const handleVisibleChange = (state: boolean) => (isOpen.value = state);
    const toggleVisible = () => (isOpen.value = !isOpen.value);

    return {
      isOpen,
      targetEl,
      handleVisibleChange,
      toggleVisible,
      position
    };
  },
  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          margin: '0 auto'
        }}
      >
        <select v-model={this.position} placeholder="Select Position">
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
        <br />
        <br />

        <div style={{ color: 'white' }}>
          position: <strong>{this.position}</strong>
        </div>

        <br />
        <button onClick={this.toggleVisible} ref="targetEl">
          Click to Show Popover
          <Wowerlay
            onUpdate:visible={this.handleVisibleChange}
            visible={this.isOpen}
            target={this.targetEl}
            position={this.position as WowerlayProps['position']}
          >
            <div style="max-width: 300px">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
              sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus?
              Illo vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus.
              Debitis, facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem
              cumque quisquam exercitationem a doloribus.
            </div>
          </Wowerlay>
        </button>
      </div>
    );
  }
});

export const Demo = defineDemo({
  name: 'Position',
  component: Component,
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay position="left" v-model:visible="visible" :target="target">
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
