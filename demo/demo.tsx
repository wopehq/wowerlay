import './demo.scss';
import 'highlight.js/styles/atom-one-dark.css';
import 'bottom-sheet-vue3/css/style.css';

import { computed, createApp, defineComponent, onMounted, ref, watch } from 'vue';

import { Highlight } from './components/Highlight';
import { IDemo } from './helpers';
import { Sheet } from 'bottom-sheet-vue3';
import { createWowerlay } from '../src/lib';
import { highlightInit } from './helpers/highlight';

highlightInit();

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
    const isCodeSampleVisible = ref(false);

    const DemoComponent = computed(() => demos[activeDemoIndex.value].component);
    const activeDemo = computed(() => demos[activeDemoIndex.value]);
    const isWithCodeSamples = computed(
      () => !!activeDemo.value.script || !!activeDemo.value.template
    );

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
      isActive,
      activeDemo,
      isCodeSampleVisible,
      isWithCodeSamples
    };
  },
  render() {
    const Demo = this.DemoComponent;

    const AllDemos = () =>
      demos.map((demo, index) => (
        <div
          onClick={() => (this.activeDemoIndex = index)}
          class={['demo-menu-item', { active: this.isActive(index) }]}
        >
          {demo.name}
        </div>
      ));

    const Modal = () =>
      this.isWithCodeSamples && (
        // @ts-ignore
        <Sheet
          sliderIconColor="rgb(15, 15, 15)"
          containerColor="rgba(55,55,55, .6)"
          sheetColor="rgb(28, 28, 28)"
          v-model:visible={this.isCodeSampleVisible}
        >
          {this.activeDemo.template && (
            <Highlight language="html" code={this.activeDemo.template} />
          )}
          {this.activeDemo.script /* */ && (
            <Highlight language="html" code={this.activeDemo.script} />
          )}
        </Sheet>
      );

    return (
      <>
        <div class="demo-container">
          <div class="demo-menu">
            {AllDemos()}
            {this.isWithCodeSamples && (
              <button
                onClick={() => (this.isCodeSampleVisible = true)}
                class="demo-show-code-button"
              >
                Show Code
              </button>
            )}
          </div>
          <div class="demo-content">
            <Demo />
            {Modal()}
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
