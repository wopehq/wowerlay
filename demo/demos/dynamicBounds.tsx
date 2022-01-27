import { CSSProperties, defineComponent, ref, watch } from 'vue';
import { defineDemo, html } from '../helpers';

import { Wowerlay } from '../../src/lib';

const fruits = ['Banana', 'Apple', 'Strawberry', 'Orange', 'Peach', 'Pear', 'Apricot'];
const searchFruit = (name: string) => {
  return fruits.filter((fruitName) => {
    return fruitName.trim().toLowerCase().includes(name.toLowerCase());
  });
};

const sFruitItem: CSSProperties = {
  width: '100%',
  padding: '5px',
};

const sFruitInput: CSSProperties = {
  padding: '5px',
  marginBottom: '5px',
};

const Component = defineComponent({
  name: 'PopoverFollow',
  setup() {
    const targetEl = ref<HTMLElement>();
    const isOpen = ref(false);
    const fruitQuery = ref('');
    const input = ref<HTMLElement>();

    const handleVisibleChange = (state: boolean) => {
      isOpen.value = state;
    };
    const toggleVisible = () => {
      isOpen.value = !isOpen.value;
    };

    watch(
      isOpen,
      () => {
        input.value?.focus();
      },
      { flush: 'post' },
    );

    return {
      isOpen,
      targetEl,
      fruitQuery,
      input,
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
        </span>

        <br />
        <br />

        <button type="button" onClick={this.toggleVisible} ref="targetEl">
          Click to Show Popover
          <Wowerlay
            onUpdate:visible={this.handleVisibleChange}
            visible={this.isOpen}
            target={this.targetEl}
            position="top"
          >
            <div style="max-width: 300px">
              <input
                ref="input"
                style={sFruitInput}
                v-model={this.fruitQuery}
                placeholder="Search for fruits"
                type="text"
              />
              {searchFruit(this.fruitQuery).map((name) => (
                <div style={sFruitItem}>{name}</div>
              ))}
            </div>
          </Wowerlay>
        </button>
      </>
    );
  },
});

export const Demo = defineDemo({
  name: 'Dynamic Bounds',
  component: Component,
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay fixed v-model:visible="visible" :target="target">
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
  `,
});
