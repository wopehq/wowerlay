import { defineComponent, ref } from 'vue';
import { defineDemo, html } from '../helpers';

import { Wowerlay } from '../../src/lib';

const Component = defineComponent({
  name: 'PopoverFollow',
  setup() {
    const targetEl = ref<HTMLElement>();
    const isOpen = ref(false);

    const handleVisibleChange = (state: boolean) => (isOpen.value = state);
    const toggleVisible = () => (isOpen.value = !isOpen.value);

    return {
      isOpen,
      targetEl,
      handleVisibleChange,
      toggleVisible
    };
  },
  render() {
    return (
      <button onClick={this.toggleVisible} ref="targetEl">
        Click to Show Popover
        <Wowerlay
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
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
    );
  }
});

export const Demo = defineDemo({
  name: 'Following Popover',
  component: Component,
  // prettier-ignore
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover
        
        <Wowerlay v-model:visible="visible" :target="target">
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
