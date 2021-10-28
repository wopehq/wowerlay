import './demo.scss';

import { WowerlayContainer, createWowerlay } from '../src/lib';
import { computed, createApp, defineComponent, onMounted, ref, watch } from 'vue';

import { IDemo } from './helpers';

const demosGlob = import.meta.globEager('./demos/**/*') as Record<string, { Demo: IDemo }>;
const demos = Object.values(demosGlob).map(($export) => $export.Demo);

const centerContent = () => {
  setTimeout(() => {
    const { scrollWidth, scrollHeight } = document.documentElement;
    document.documentElement.scroll({
      left: (scrollWidth - window.innerWidth) / 2,
      top: (scrollHeight - window.innerHeight) / 2,
      behavior: 'smooth'
    });
  }, 250);
};

const App = defineComponent({
  setup() {
    const activeDemoIndex = ref(0);
    const DemoComponent = computed(() => demos[activeDemoIndex.value].component);

    watch(activeDemoIndex, centerContent, { flush: 'post' });
    onMounted(centerContent);

    return {
      activeDemoIndex,
      DemoComponent
    };
  },
  render() {
    const TestsMenu = (
      <div class="demo-menu">
        {demos.map((demo, index) => (
          <div
            role="button"
            onClick={() => {
              this.activeDemoIndex = index;
            }}
            class={[
              'demo-menu-item',
              {
                active: index === this.activeDemoIndex
              }
            ]}
          >
            {demo.name}
          </div>
        ))}
      </div>
    );

    return (
      <>
        <WowerlayContainer />
        <div class="test-container">
          {TestsMenu}
          <div class="test-content">
            <this.DemoComponent />
          </div>
        </div>
      </>
    );
  }
});

const app = createApp(App);
const wowerlay = createWowerlay();
app.use(wowerlay);
app.mount('#app');
