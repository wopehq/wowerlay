import { DefineComponent, markRaw } from 'vue';
import dedent from 'dedent';

export interface IDemo {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: DefineComponent<any, any, any, any, any, any, any, any, any>;
  template?: string;
  script?: string;
}

export const defineDemo = (_demo: IDemo) => {
  const demo = { ..._demo };

  demo.component = markRaw(demo.component);

  return demo;
};

export function html(code: string | TemplateStringsArray, ...expressions: string[]) {
  if (Array.isArray(code)) {
    let editedCode = '';
    code.forEach((_code, index) => {
      editedCode = editedCode.concat(_code).concat((expressions || [])[index] || '');
    });
    return dedent(editedCode);
  }
  return dedent(code as string);
}
