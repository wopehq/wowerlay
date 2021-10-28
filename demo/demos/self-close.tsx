import { defineComponent, ref } from 'vue';

import { Wowerlay } from '../../src/lib';
import { defineTest } from '../helpers';

const Component = defineComponent({
  name: 'PopoverFollow',
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
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
        >
          <div>Hi I'm closable</div>
          <button onClick={() => (this.isOpen = false)}>Click to close</button>
        </Wowerlay>
      </button>
    );
  }
});

export const Demo = defineTest({
  name: 'Self Closable',
  component: Component
});
