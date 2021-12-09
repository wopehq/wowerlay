import { CSSProperties, computed, defineComponent, onMounted, ref } from 'vue';
import { Wowerlay, WowerlayProps } from '../../src/lib';
import { defineDemo, html } from '../helpers';

const Component = defineComponent({
  name: 'PopoverFollow',
  setup() {
    const targetEl = ref<HTMLElement>();
    const isOpen = ref(false);
    const visibility = ref(false);

    const handleVisibleChange = (state: boolean) => (isOpen.value = state);
    const toggleVisible = () => (isOpen.value = !isOpen.value);

    const verticalGap = ref(0);
    const horizontalGap = ref(0);

    const positionCount = ref(0);
    const positions: WowerlayProps['position'][] = [
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end'
    ];

    const position = computed(() => positions[positionCount.value % positions.length]);

    onMounted(() => setTimeout(() => (visibility.value = true), 250));

    return {
      isOpen,
      targetEl,
      handleVisibleChange,
      toggleVisible,
      position,
      positionCount,
      verticalGap,
      horizontalGap,
      visibility
    };
  },
  render() {
    const inputWrapperStyle: CSSProperties = {
      display: 'flex',
      width: '100%',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      gap: '10px'
    };

    return (
      <>
        <div class="object">
          <div style={inputWrapperStyle}>
            verticalGap: <input type="number" v-model={[this.verticalGap, ['number']]} />
          </div>
          <br />
          <div style={inputWrapperStyle}>
            horizontalGap: <input type="number" v-model={[this.horizontalGap, ['number']]} />
          </div>
        </div>

        <br />
        <br />

        <div class="object" ref="targetEl">
          Click to Show Popover
          <Wowerlay
            verticalGap={this.verticalGap}
            horizontalGap={this.horizontalGap}
            position={this.position}
            visible={this.visibility}
            target={this.targetEl}
          >
            <div style="max-width: 300px">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
              sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus?
              Illo vitae quis reprehenderit sequi quae iste.
              <br />
              <button onClick={() => this.positionCount++}>Update Position</button>
            </div>
          </Wowerlay>
        </div>
      </>
    );
  }
});

export const Demo = defineDemo({
  name: 'With Gaps',
  component: Component,
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay :horizontalGap="5" :verticalGap="10" v-model:visible="visible" :target="target">
          <div style="max-width: 300px">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
            sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
            vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
            facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
            quisquam exercitationem a doloribus.
          </div>
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
  `
});
