import './test.scss';

import { Transition, createApp, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { Wowerlay, WowerlayContainer, createWowerlay } from '../src/lib';

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
            <WowerlayContainer />
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
                  <div
                     style={{
                        margin: 'auto',
                        display: 'inline-block'
                     }}
                     ref={targetEl}
                  >
                     <button
                        onClick={() => {
                           isOpen.value = !isOpen.value;
                        }}
                     >
                        Vue Overlay Yeah
                        <Wowerlay
                           onUpdate:visible={(state) => (isOpen.value = state)}
                           visible={isOpen.value}
                           target={targetEl.value}
                        >
                           <Mycomponent />
                        </Wowerlay>
                     </button>
                  </div>
                  <h4 style="margin-top: 150px;">Hi</h4>
               </div>
            </div>
            <div style={{ height: '1000px' }}></div>
         </>
      );
   }
});

const app = createApp(App);
const wowerlay = createWowerlay();
app.use(wowerlay);
app.mount('#app');
