import './test.scss';

import { WowerlayContainer, createWowerlay } from '../src/lib';
import { computed, createApp, defineComponent, onMounted, ref, watch } from 'vue';

import { ITest } from './helpers';

const testsGlob = import.meta.globEager('./tests/**/*') as Record<string, { Test: ITest }>;
const tests = Object.values(testsGlob).map((test) => test.Test);

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
    const activeTestIndex = ref(0);
    const TestComponent = computed(() => tests[activeTestIndex.value].component);

    watch(activeTestIndex, centerContent, { flush: 'post' });
    onMounted(centerContent);

    return () => {
      const TestsMenu = (
        <div class="tests-menu">
          {tests.map((test, index) => (
            <div
              role="button"
              onClick={() => {
                activeTestIndex.value = index;
              }}
              class={[
                'tests-menu-item',
                {
                  active: index === activeTestIndex.value
                }
              ]}
            >
              {test.name}
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
              <TestComponent.value />
            </div>
          </div>
        </>
      );
    };
  }
});

const app = createApp(App);
const wowerlay = createWowerlay();
app.use(wowerlay);
app.mount('#app');
