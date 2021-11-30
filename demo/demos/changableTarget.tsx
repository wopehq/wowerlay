import { computed, defineComponent, ref } from 'vue';
import { defineDemo, html } from '../helpers';

import { Wowerlay } from '../../src/lib';

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
          <button disabled ref="leftButton">
            Left Target
          </button>
          <button disabled ref="rightButton">
            Right Target
          </button>
        </div>
        <br />
        <button onClick={this.toggleVisible}>
          Click to Show Popover
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
  component: Component,
  template: html`
    <template>
      <button ref="firstTarget">Target 1</button>
      <button ref="secondTarget">Target 2</button>

      <Wowerlay :visible="true" :target="wowerlayTarget">
        <div>Wowerlay Content</div>
        <div>Here</div>
      </Wowerlay>
    </template>
  `,
  script: html`
    <script setup>
      import { ref, computed } from 'vue';

      const firstTarget = ref();
      const secondTarget = ref();

      const wowerlayTarget = computed(() => firstTarget.value || secondTarget.value);
    </script>
  `
});
