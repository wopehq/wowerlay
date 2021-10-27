import { DefineComponent, markRaw } from 'vue';

export interface ITest {
  name: string;
  component: DefineComponent<any, any, any, any, any, any, any, any, any>;
}

export const defineTest = (test: ITest) => {
  test.component = markRaw(test.component);
  return test;
};
