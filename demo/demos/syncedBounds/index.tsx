import { computed, defineComponent, onMounted, ref } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay } from '../../../src/lib';

const Seperator = () => (
  <div
    style={{
      height: '30px',
    }}
  />
);

const animationOptions: KeyframeAnimationOptions = {
  direction: 'alternate-reverse',
  duration: 2000,
  iterations: Infinity,
  easing: 'ease',
};

const Component = defineComponent({
  name: 'SyncedBounds',
  setup() {
    const firstEl = ref<HTMLButtonElement | null>(null);
    const secondEl = ref<HTMLButtonElement | null>(null);
    const thirdEl = ref<HTMLButtonElement | null>(null);

    const syncWidth = ref(true);
    const syncHeight = ref(false);

    const positions = ['bottom', 'right'] as const;
    const positionIndex = ref(0);
    const position = computed(() => positions[positionIndex.value % positions.length]);

    onMounted(() => {
      if (!firstEl.value || !secondEl.value || !thirdEl.value) return;

      firstEl.value.animate(
        [
          {
            width: `${thirdEl.value.offsetWidth}px`,
            height: `${thirdEl.value.offsetHeight * 2}px`,
          },
          {
            width: `${thirdEl.value.offsetWidth * 2}px`,
            height: `${thirdEl.value.offsetHeight}px`,
          },
        ],
        animationOptions,
      );

      secondEl.value.animate(
        [
          { height: `${firstEl.value.offsetHeight}px` },
          { height: `${firstEl.value.offsetHeight * 2}px` },
        ],
        animationOptions,
      );

      thirdEl.value.animate(
        [
          { width: `${thirdEl.value.offsetWidth}px` },
          { width: `${thirdEl.value.offsetWidth * 2}px` },
        ],
        animationOptions,
      );
    });

    return {
      firstEl,
      secondEl,
      thirdEl,
      syncWidth,
      syncHeight,
      position,
    };
  },
  render() {
    return (
      <>
        <span style="color: white">
          This only works if your browser supports{' '}
          <a
            target="_blank"
            href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver#browser_compatibility"
            rel="noreferrer"
          >
            ResizeObserver
          </a>
        </span>

        <Seperator />
        <Seperator />
        <Seperator />

        <button type="button" ref="firstEl">
          Synced by Width and Height
          <Wowerlay
            visible
            noBackground
            canLeaveViewport
            noFlip
            position="top"
            target={this.firstEl}
            syncWidth
            syncHeight
          >
            <div style="max-width: 300px">
              This Wowerlay is synced to width and height of target element.
            </div>
          </Wowerlay>
        </button>

        <Seperator />

        <button type="button" ref="secondEl">
          Synced by Height
          <Wowerlay
            visible
            noBackground
            canLeaveViewport
            noFlip
            position="right-end"
            target={this.secondEl}
            syncHeight
          >
            <div style="max-width: 300px">This Wowerlay is synced to height of target element.</div>
          </Wowerlay>
        </button>

        <Seperator />

        <button type="button" ref="thirdEl">
          Synced by Width
          <Wowerlay
            visible
            noBackground
            canLeaveViewport
            noFlip
            position="bottom"
            target={this.thirdEl}
            syncWidth
          >
            <div style="max-width: 300px">This Wowerlay is synced to width of target element.</div>
          </Wowerlay>
        </button>
      </>
    );
  },
});

export default defineDemo({
  name: 'Synced Bounds',
  component: Component,
  /* prettier-ignore */
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay
          style="max-width: 300px"
          v-model:visible="visible"
          :target="target"
          syncWidth
          syncHeight
        >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
            sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
            vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
            facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
            quisquam exercitationem a doloribus.
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
  `,
});
