import { defineComponent, ref } from 'vue';

import { Wowerlay } from '../../src/lib';
import { defineDemo } from '../helpers';

const Component = defineComponent({
  name: 'PopoverFixed',
  setup() {
    const targetEl = ref<HTMLElement | null>(null);
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
        Click to Trigger Popover
        <Wowerlay
          fixed
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
  name: 'Fixed',
  component: Component
});
