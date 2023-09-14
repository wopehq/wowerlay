import { defineComponent } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const Component = defineComponent({
  name: 'CSS Transition',
  setup: () => useDemoState(),
  render() {
    return (
      <button type="button" onClick={this.toggleVisible} ref="targetEl">
        Click to Show Popover
        <Wowerlay
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
          transition="myTransition"
        >
          <div style="max-width: 300px">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
            sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
            vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
            facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
            quisquam exercitationem a doloribus.
          </div>
        </Wowerlay>
      </button>
    );
  },
});

export default defineDemo({
  name: 'CSS Transition',
  component: Component,
  /* prettier-ignore */
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <!-- See: https://vuejs.org/guide/built-ins/transition.html#named-transitions -->
        <Wowerlay
          transition="myTransitionName"
          style="max-width: 300px"
          v-model:visible="visible"
          :target="target"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores,
          sed ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo
          vitae quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis,
          facere, libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque
          quisquam exercitationem a doloribus.
        </Wowerlay>
      </button>
    </template>

    <!--
      you need to explicitly select standalone popover or popover inside background.
      If you change position of popover in css transition (e.g. transform: translateX(100%)) it will break positioning of popover.
      If you need to change position of popover while transitioning, use JS transition instead.
    -->
    <style>
      .wowerlay-background.transition-name-enter-active wowerlay[data-popover-placement="right"],
      .wowerlay[data-popover-placement="right"].transition-name-enter-active {
        animation: myAnimation .3s;
      }
    </style>
  `,
  script: html`
    <script setup>
      import { ref } from 'vue';

      const visible = ref(false);
      const target = ref();
    </script>
  `,
});
