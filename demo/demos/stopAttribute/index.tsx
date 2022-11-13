import { CSSProperties, defineComponent } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const containerStyle: CSSProperties = {
  width: '500px',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  margin: '0 auto 5px auto',
  color: '#fff',
};

const titleStyle: CSSProperties = {
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '5px 0px',
  color: 'rgb(28, 179, 255)',
};

const Component = defineComponent({
  name: 'Stop Attribute',
  setup: () => useDemoState(),
  render() {
    return (
      <>
        <div style={containerStyle}>
          <h4 style={titleStyle}>data-wowerlay-stop</h4>
          <br />
          <div>
            If clicked element or its any parent has this attribute, wowerlay won't close itself.
            <br />
            <br />
            With this attribute you don't have to use stopPropagation.
          </div>
        </div>

        <br />
        <button
          style={{ marginRight: '10px' }}
          type="button"
          onClick={this.toggleVisible}
          ref="targetEl"
        >
          Click to Show Popover
        </button>

        <button data-wowerlay-stop type="button">
          Click will not close Wowerlay
        </button>

        <Wowerlay
          canLeaveViewport
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
          style="max-width: 300px"
          noBackground
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
          ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
          quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
          libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
          exercitationem a doloribus.
        </Wowerlay>
      </>
    );
  },
});

export default defineDemo({
  name: 'Stop Attribute',
  component: Component,
  /* prettier-ignore */
  template: html`
    <template>
      <div data-wowerlay-stop>
        Clicking me won't close it
      </div>

      <button @click="visible = !visible" ref="target">
        Click To Trigger Popover

        <Wowerlay
          canLeaveViewport
          style="max-width: 300px" 
          v-model:visible="visible"
          :target="target"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
          ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
          quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
          libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
          exercitationem a doloribus.
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
