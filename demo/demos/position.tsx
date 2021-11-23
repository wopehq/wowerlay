import { defineComponent, ref } from 'vue';

import { Wowerlay } from '../../src/lib';
import { WowerlayBaseProps } from '../../src/components/WowerlayReusables';
import { defineDemo } from '../helpers';

const Component = defineComponent({
  name: 'PopoverFollow',
  setup() {
    const targetEl = ref<HTMLElement>(null!);
    const isOpen = ref(false);

    const position = ref('');
    const priority = ref('');

    const handleVisibleChange = (state: boolean) => (isOpen.value = state);
    const toggleVisible = () => (isOpen.value = !isOpen.value);

    return {
      isOpen,
      targetEl,
      handleVisibleChange,
      toggleVisible,
      position,
      priority
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
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
        <select v-model={this.priority} placeholder="Select Position">
          <option value="">Select Priority</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>

        <br />
        <br />

        <button onClick={this.toggleVisible} ref="targetEl">
          Click to Trigger Popover
          <Wowerlay
            onUpdate:visible={this.handleVisibleChange}
            visible={this.isOpen}
            target={this.targetEl}
            priority={this.priority as WowerlayBaseProps['priority']}
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
  component: Component
});
