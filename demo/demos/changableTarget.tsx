import { computed, defineComponent, ref } from 'vue';

import { Wowerlay } from '../../src/lib';
import { defineDemo } from '../helpers';

const Component = defineComponent({
  name: 'PopoverChangeTarget',
  setup() {
    const isOpen = ref(false);
    const isLeftButtonActive = ref(false);

    const leftButton = ref<HTMLButtonElement>();
    const rightButton = ref<HTMLButtonElement>();

    const targetEl = computed(() =>
      isLeftButtonActive.value ? leftButton.value : rightButton.value
    );

    const toggleVisible = () => (isOpen.value = !isOpen.value);
    const toggleTargetElement = () => (isLeftButtonActive.value = !isLeftButtonActive.value);

    return {
      isOpen,
      targetEl,
      toggleVisible,
      leftButton,
      rightButton,
      isLeftButtonActive,
      toggleTargetElement
    };
  },
  render() {
    return (
      <>
        <div
          style={{
            width: '300px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button style={{ color: this.isLeftButtonActive ? 'blue' : 'initial' }} ref="leftButton">
            Left Target
          </button>
          <button style={{ color: this.isLeftButtonActive ? 'initial' : 'blue' }} ref="rightButton">
            Right Target
          </button>
        </div>
        <br />
        <button onClick={this.toggleVisible} ref="targetEl">
          Click to Trigger Popover
          <Wowerlay
            onUpdate:visible={(visibility) => (this.isOpen = visibility)}
            visible={this.isOpen}
            target={this.targetEl}
          >
            <div>
              <div>Bruh Moment is real</div>
              <div>Who Whom</div>
              <br />
              <div>Hi How</div>
              <button onClick={this.toggleTargetElement}>Toggle Target</button>
            </div>
          </Wowerlay>
        </button>
      </>
    );
  }
});

export const Demo = defineDemo({
  name: 'Changeable Target',
  component: Component
});
