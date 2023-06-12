import { CSSProperties, FunctionalComponent, computed, defineComponent, ref } from 'vue';

import { defineDemo, html } from '../../helpers';
import { ArrowProps, Side, Wowerlay, WowerlayProps } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const sideBorderMap: Record<Side, CSSProperties> = {
  bottom: {
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderBottom: '15px solid #1a1a1a',
  },
  left: {
    borderTop: '15px solid transparent',
    borderBottom: '15px solid transparent',
    borderLeft: '15px solid #1a1a1a',
  },
  top: {
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderTop: '15px solid #1a1a1a',
  },
  right: {
    borderTop: '15px solid transparent',
    borderBottom: '15px solid transparent',
    borderRight: '15px solid #1a1a1a',
  },
};

const Arrow: FunctionalComponent<ArrowProps> = (props) => {
  const { side } = props;

  const style: CSSProperties = {
    width: '0',
    height: '0',
    ...sideBorderMap[side],
  };

  return <div style={style} />;
};

const Component = defineComponent({
  name: 'WithArrow',
  setup() {
    const { handleVisibleChange, isOpen, targetEl, toggleVisible } = useDemoState();

    const positionCount = ref(0);
    const positions: WowerlayProps['position'][] = ['bottom', 'left', 'top', 'right'];

    const position = computed(() => positions[positionCount.value % positions.length]);

    isOpen.value = true;

    return {
      isOpen,
      targetEl,
      handleVisibleChange,
      toggleVisible,
      position,
      positionCount,
    };
  },
  render() {
    return (
      <div class="object" ref="targetEl">
        Click to Show Popover
        <Wowerlay
          position={this.position}
          visible={this.isOpen}
          target={this.targetEl}
          style="overflow: visible"
          v-slots={{
            arrow: (props: ArrowProps) => <Arrow {...props} />,
          }}
          gap={15}
          noBackground
        >
          <div style="max-width: 300px">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
            sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
            vitae quis reprehenderit sequi quae iste.
            <br />
            <button
              type="button"
              onClick={() => {
                this.positionCount += 1;
              }}
            >
              Update Position
            </button>
          </div>
        </Wowerlay>
      </div>
    );
  },
});

export default defineDemo({
  name: 'With Arrow',
  component: Component,
  /* prettier-ignore */
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <!-- Gap is for arrow -->
        <Wowerlay
          :gap="15"
          style="max-width: 300px" 
          v-model:visible="visible"
          :target="target"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
          sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
          vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
          facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
          quisquam exercitationem a doloribus.

          <template #arrow="{ placement, side }">
            <div
              :style="[
                'width: 15px; height: 15px; background: blue',
                getArrowStyle(placement, side),
              ]" 
            />
          </template>
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
