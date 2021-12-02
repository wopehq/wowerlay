import { computed, defineComponent, ref } from 'vue';
import { defineDemo, html } from '../helpers';

import { Wowerlay } from '../../src/lib';

const Component = defineComponent({
  name: 'PopoverChangeTarget',
  setup() {
    const isOpen = ref(false);
    const isLeftButtonActive = ref(false);

    const firstTarget = ref<HTMLButtonElement>();
    const secondTarget = ref<HTMLButtonElement>();

    const targetEl = computed(() =>
      isLeftButtonActive.value ? firstTarget.value : secondTarget.value
    );

    const toggleVisible = () => (isOpen.value = !isOpen.value);
    const toggleTargetElement = () => (isLeftButtonActive.value = !isLeftButtonActive.value);

    return {
      isOpen,
      targetEl,
      toggleVisible,
      firstTarget,
      secondTarget,
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
          <div class="object" ref="firstTarget">
            Target 1
          </div>
          <div class="object" ref="secondTarget">
            Target 2
          </div>
        </div>
        <br />
        <button onClick={this.toggleVisible}>
          Click to Show Popover
          <Wowerlay
            onUpdate:visible={(visibility) => (this.isOpen = visibility)}
            visible={this.isOpen}
            target={this.targetEl}
          >
            <div style="max-width: 300px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum porro accusantium sed
              perspiciatis quo! Esse omnis blanditiis atque itaque nemo, eligendi perferendis
              inventore aspernatur vero ipsum rerum porro suscipit repudiandae numquam quasi dolores
              fugit tenetur soluta labore dicta? Vitae fuga officiis, incidunt laboriosam blanditiis
              reprehenderit voluptatem assumenda impedit aliquid fugiat.
              <br />
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
      <div class="object" ref="firstTarget">Target 1</div>
      <div class="object" ref="secondTarget">Target 2</div>

      <Wowerlay :visible="true" :target="wowerlayTarget">
        <div style="max-width: 300px">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
          ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
          quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
          libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
          exercitationem a doloribus.
        </div>
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
