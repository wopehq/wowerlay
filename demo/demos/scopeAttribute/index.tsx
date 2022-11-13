import { CSSProperties, defineComponent } from 'vue';

import { defineDemo, html } from '../../helpers';
import { Wowerlay } from '../../../src/lib';
import useDemoState from '../../helpers/useDemoState';

const containerStyle: CSSProperties = {
  width: '750px',
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

const boxStyles: CSSProperties = {
  backgroundColor: 'rgb(150, 120, 163)',
  width: '300px',
  minHeight: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Component = defineComponent({
  name: 'Scope Attribute',
  setup: () => {
    const {
      handleVisibleChange: handleVisibleChange2,
      isOpen: isOpen2,
      targetEl: targetEl2,
      toggleVisible: toggleVisible2,
    } = useDemoState();

    const demoState = useDemoState();

    return {
      ...demoState,
      handleVisibleChange2,
      isOpen2,
      targetEl2,
      toggleVisible2,
    };
  },
  render() {
    return (
      <>
        <div style={containerStyle}>
          <h4 style={titleStyle}>data-wowerlay-scope</h4>
          <br />
          <div>
            If clicked element or its any parent has this attribute only Wowerlay instances that has
            target inside of the scope will be closed on click.
            <br />
            <br />
            With this attribute you can control places like a dialog container only closes Wowerlay
            instances inside dialog on click.
          </div>

          <br />

          <button
            type="button"
            data-wowerlay-stop
            onClick={() => {
              this.isOpen = true;
              this.isOpen2 = true;
            }}
          >
            Show Both Popovers
          </button>

          <p>
            Color blocks has "data-wowerlay-scope" attribute. Click one of them to see how it works
          </p>

          <br />
          <div style={{ display: 'flex' }}>
            <div
              data-wowerlay-scope
              style={{
                ...boxStyles,
                marginRight: 'auto',
              }}
            >
              <div ref="targetEl" class="object">
                Target 1
              </div>
            </div>

            <div
              data-wowerlay-scope
              style={{
                ...boxStyles,
                marginLeft: 'auto',
              }}
            >
              <div class="object" ref="targetEl2">
                Target 2
              </div>
            </div>
          </div>
        </div>

        <Wowerlay
          canLeaveViewport
          onUpdate:visible={this.handleVisibleChange}
          visible={this.isOpen}
          target={this.targetEl}
          style="max-width: 300px"
          noBackground
          noFlip
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum quam, qui asperiores, sed
          ipsa fuga, repellendus officiis labore odit temporibus quisquam necessitatibus? Illo vitae
          quis reprehenderit sequi quae iste, fuga quasi atque et voluptatibus. Debitis, facere,
          libero voluptate tempore omnis voluptas corporis fugiat sequi quidem cumque quisquam
          exercitationem a doloribus.
        </Wowerlay>

        <Wowerlay
          canLeaveViewport
          onUpdate:visible={this.handleVisibleChange2}
          visible={this.isOpen2}
          target={this.targetEl2}
          style="max-width: 300px"
          noBackground
          noFlip
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
  name: 'Scope Attribute',
  component: Component,
  template: html`
    <template>
      <div data-wowerlay-scope>
        Only Wowerlays that has target inside this scope will be closed on click this element or any
        children.

        <button @click="visible = !visible" ref="target">
          Click To Trigger Popover

          <Wowerlay
            canLeaveViewport
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
      </div>
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
