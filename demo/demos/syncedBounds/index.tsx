import { CSSProperties, defineComponent, ref } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const Seperator = () => (
  <div
    style={{
      height: '30px',
    }}
  />
);

const bigButtonStyle: CSSProperties = {
  width: '400px',
  height: '60px',
};

const baseButtonStyle: CSSProperties = {
  width: '260px',
  height: '40px',
  transition: 'all .3s',
};

const Component = defineComponent({
  name: 'SyncedBounds',
  setup() {
    const { targetEl } = useDemoState();

    const isBig = ref(false);

    return {
      targetEl,
      isBig,
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

        <button
          onClick={() => {
            this.isBig = !this.isBig;
          }}
          style={[
            baseButtonStyle, //
            this.isBig ? bigButtonStyle : {},
          ]}
          type="button"
          ref="targetEl"
        >
          Click to resize
          <Wowerlay
            visible
            noBackground
            canLeaveViewport
            noFlip
            position="bottom"
            target={this.targetEl}
            syncSize
          >
            This Wowerlay is synced to width of target element.
          </Wowerlay>
          <Wowerlay
            visible
            noBackground
            canLeaveViewport
            noFlip
            position="right"
            target={this.targetEl}
            syncSize
          >
            This Wowerlay is synced to height of target element.
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
          v-model:visible="visible"
          :target="target"
          syncSize
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
