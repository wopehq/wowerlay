import './demo.scss';

import { WowerlayContainer, createWowerlay } from '../src/lib';
import { computed, createApp, defineComponent, onMounted, ref, watch } from 'vue';

import { IDemo } from './helpers';

const demosGlob = import.meta.globEager('./demos/**/*') as Record<string, { Demo: IDemo }>;
const demos = Object.values(demosGlob).map(($export) => $export.Demo);

const centerScreen = () => {
  const { scrollWidth, scrollHeight } = document.documentElement;
  document.documentElement.scroll({
    left: (scrollWidth - window.innerWidth) / 2,
    top: (scrollHeight - window.innerHeight) / 2,
    behavior: 'smooth'
  });
};

const App = defineComponent({
  setup() {
    const activeDemoIndex = ref(0);
    const DemoComponent = computed(() => demos[activeDemoIndex.value].component);

    const isActive = (index: number) => activeDemoIndex.value === index;

    watch(activeDemoIndex, centerScreen, { flush: 'post' });
    onMounted(() => {
      setTimeout(() => {
        centerScreen();
      }, 250);
    });

    return {
      activeDemoIndex,
      DemoComponent,
      isActive
    };
  },
  render() {
    const AllDemos = demos.map((demo, index) => (
      <div
        onClick={() => (this.activeDemoIndex = index)}
        class={['demo-menu-item', { active: this.isActive(index) }]}
      >
        {demo.name}
      </div>
    ));

    const Demo = this.DemoComponent;

    return (
      <>
        <WowerlayContainer />
        <div class="demo-container">
          <div class="demo-menu">{AllDemos}</div>
          <div class="demo-content">
            <Demo />
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
