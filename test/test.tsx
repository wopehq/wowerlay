import '../src/styles/Overlay.scss';
import '../src/styles/OverlayContainer.scss';

import { Overlay, OverlayContainer, OverlayPlugin } from '../src/lib';
import { Transition, createApp, defineComponent, onMounted, onUnmounted, ref } from 'vue';

import { OverlayRenderer } from '../src/components/OverlayRenderer';

const Mycomponent = defineComponent({
   setup() {
      onMounted(() => {
         console.log('mounted');
      });
      onUnmounted(() => {
         console.log('unmounted');
      });
      return () => <div>Selamlar</div>;
   }
});

const App = defineComponent({
   setup() {
      const isOpen = ref(false);
      const targetEl = ref<HTMLElement | null>(null);

      return () => (
         <>
            <OverlayContainer />
            <div style={{ height: '1000px', width: '100000px' }}></div>
            <h3
               style={{
                  margin: 'auto'
               }}
               onClick={() => {
                  isOpen.value = !isOpen.value;
               }}
               ref={targetEl}
            >
               Vue Overlay Yeah
            </h3>
            <OverlayRenderer
               onUpdate:visible={(state) => (isOpen.value = state)}
               visible={isOpen.value}
               tag="span"
               target={targetEl.value}
            >
               <div>Selamlar Herkese</div>
               <Mycomponent />
            </OverlayRenderer>
            <div style={{ height: '1000px' }}></div>
         </>
      );
   }
});

const app = createApp(App);
app.use(OverlayPlugin);
app.mount('#app');
