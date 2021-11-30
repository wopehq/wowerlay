import { defineComponent, ref } from 'vue';
import { defineDemo, html } from '../helpers';

import { Wowerlay } from '../../src/lib';
import { WowerlayBaseProps } from '../../src/components/WowerlayReusables';

const Component = defineComponent({
  name: 'PopoverFollow',
  setup() {
    const targetEl = ref<HTMLElement>(null!);
    const isOpen = ref(false);

    const position = ref('');

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
          <option value="">Select Position</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>

        <br />
        <br />

        <button onClick={this.toggleVisible} ref="targetEl">
          Click to Show Popover
          <Wowerlay
            onUpdate:visible={this.handleVisibleChange}
            visible={this.isOpen}
            target={this.targetEl}
            position={this.position as WowerlayBaseProps['position']}
          >
            {Array(15)
              .fill(null)
              .map((_num, index) => {
                return (
                  <div>
                    <b>Hi How are you? {index}</b>
                  </div>
                );
              })}
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
          Hi This is Content
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
