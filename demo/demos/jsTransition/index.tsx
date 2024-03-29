import { defineComponent } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay, type WowerlayTransitionFn } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const Component = defineComponent({
  name: 'JsTransition',
  setup: () => {
    const handleTransition: WowerlayTransitionFn = (type, { popover, side }, done) => {
      const from = {
        transform: `translateY(${side === 'top' ? '10px' : '-10px'})`,
        opacity: 0,
      };

      const to = {
        transform: `translateY(0px)`,
        opacity: 1,
      };

      const animation = popover.animate(type === 'enter' ? [from, to] : [to, from], {
        duration: 200,
        easing: 'ease',
      });

      animation.onfinish = done;
    };

    return { ...useDemoState(), handleTransition };
  },
  render() {
    return (
      <button type="button" onClick={this.toggleVisible} ref="targetEl">
        Click to Show Popover
        <Wowerlay
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
          transition={this.handleTransition}
          position="bottom"
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
  name: 'JS Transition',
  component: Component,
  /* prettier-ignore */
  template: html`
    <template>
      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay 
          style="max-width: 300px"
          :transition="handleTransition"
          position="bottom"
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
  `,
  script: html`
    <script setup>
      import { ref } from 'vue';

      const handleTransition = (type, { popover, side, background }, done) => {
        if (background) {
          doBackgroundAnimation(background);
        }

        if (type === 'enter') {
          doAnimation(popover).onFinish(done);
        } else {
          doAnimation(popover).onFinish(done);
        }
      };

      const visible = ref(false);
      const target = ref();
    </script>
  `,
});
