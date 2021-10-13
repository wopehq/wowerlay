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
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '1000px',
                  width: '3000px'
               }}
            >
               <div style="text-align: center; width: 100%">
                  <h3
                     style={{
                        margin: 'auto',
                        display: 'inline-block'
                     }}
                     onClick={() => {
                        isOpen.value = !isOpen.value;
                     }}
                     ref={targetEl}
                  >
                     Vue Overlay Yeah
                  </h3>
               </div>
               <OverlayRenderer
                  onUpdate:visible={(state) => (isOpen.value = state)}
                  visible={isOpen.value}
                  tag="div"
                  target={targetEl.value}
               >
                  <div>Selamlar Herkese</div>
                  <Mycomponent />
               </OverlayRenderer>
            </div>
            <div style={{ height: '1000px' }}></div>
         </>
      );
   }
});

const app = createApp(App);
app.use(OverlayPlugin);
app.mount('#app');
