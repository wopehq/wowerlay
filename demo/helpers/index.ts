import { DefineComponent, markRaw } from 'vue';

export interface IDemo {
  name: string;
  component: DefineComponent<any, any, any, any, any, any, any, any, any>;
}

export const defineTest = (demo: IDemo) => {
  demo.component = markRaw(demo.component);
  return demo;
};
