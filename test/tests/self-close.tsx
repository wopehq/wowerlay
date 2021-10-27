import { defineComponent, ref } from 'vue';

import { Wowerlay } from '../../src/lib';
import { defineTest } from '../helpers';

const Component = defineComponent({
  name: 'PopoverFollow',
  setup() {
    const targetEl = ref<HTMLElement | null>(null);
    const isOpen = ref(false);

    return {
      isOpen,
      targetEl
    };
  },
  render() {
    return (
      <button
        onClick={() => (this.isOpen = !this.isOpen)}
        ref={(el) => (this.targetEl = el as HTMLElement)}
      >
        Click to Trigger Popover
        <Wowerlay
          onUpdate:visible={(state) => (this.isOpen = state)}
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

export const Test = defineTest({
  name: 'Self Closable',
  component: Component
});
