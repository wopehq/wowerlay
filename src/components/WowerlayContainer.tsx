import { Teleport, defineComponent, onBeforeUnmount, onMounted } from 'vue';

import { cWowerlayContainer } from '../consts';
import { useWowerlayContext } from '../event';

export const WowerlayContainer = defineComponent({
  name: 'WowerlayContainer',
  setup() {
    const { calculateAll, clickAll } = useWowerlayContext();
    const wa = window.addEventListener;
    const wr = window.removeEventListener;

    onMounted(() => {
      wa('scroll', calculateAll);
      wa('wheel', calculateAll);
      wa('resize', calculateAll);
      wa('click', clickAll);
    });
    onBeforeUnmount(() => {
      wr('scroll', calculateAll);
      wr('wheel', calculateAll);
      wr('resize', calculateAll);
      wr('click', clickAll);
    });
  },
  render() {
    return (
      <Teleport to="body">
        <div class={cWowerlayContainer}></div>
      </Teleport>
    );
  }
});
