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
          {Array(15)
            .fill(null)
            .map((_num, index) => (
              <div>
                <b>Hi How are you? {index}</b>
              </div>
            ))}
        </Wowerlay>
      </button>
    );
  }
});

export const Test = defineTest({
  name: 'Following Popover',
  component: Component
});
