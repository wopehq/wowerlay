import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const Component = defineComponent({
  name: 'SyncedBounds',
  setup() {
    const { targetEl, isOpen, handleVisibleChange, toggleVisible } = useDemoState();

    const syncWidth = ref(true);
    const syncHeight = ref(false);

    const positions = ['bottom', 'right'] as const;
    const positionIndex = ref(0);
    const position = computed(() => positions[positionIndex.value % positions.length]);

    let interval = -1;

    onUnmounted(() => {
      clearInterval(interval);
    });

    onMounted(() => {
      interval = window.setInterval(() => {
        positionIndex.value += 1;
      }, 2000);

      if (targetEl.value) {
        const baseWidth = targetEl.value.offsetWidth;
        const baseHeight = targetEl.value.offsetHeight;

        targetEl.value?.animate(
          [
            { width: `${baseWidth}px`, height: `${baseHeight}px` },
            { width: `${baseWidth * 2}px`, height: `${baseHeight * 2}px` },
          ],
          {
            direction: 'alternate-reverse',
            duration: 1000,
            iterations: Infinity,
          },
        );
      }
    });

    return {
      isOpen,
      targetEl,
      syncWidth,
      syncHeight,
      position,
      handleVisibleChange,
      toggleVisible,
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
          <br />
          <br />
          <label>
            Sync Width:
            <input type="checkbox" v-model={this.syncWidth} />
          </label>
          <br />
          <label>
            Sync Height:
            <input type="checkbox" v-model={this.syncHeight} />
          </label>
        </span>

        <br />
        <br />

        <button type="button" onClick={this.toggleVisible} ref="targetEl">
          Click to Show Popover
          <Wowerlay
            visible
            noBackground
            canLeaveViewport
            noFlip
            position={this.position}
            target={this.targetEl}
            syncWidth={this.syncWidth}
            syncHeight={this.syncHeight}
          >
            <div style="max-width: 300px">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
              sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus?
              Illo vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus.
              Debitis, facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem
              cumque quisquam exercitationem a doloribus.
            </div>
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
          fixed
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
