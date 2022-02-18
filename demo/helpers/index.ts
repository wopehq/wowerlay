import { DefineComponent, markRaw } from 'vue';

export interface IDemo {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: DefineComponent<any, any, any, any, any, any, any, any, any>;
  template?: string;
  script?: string;
  order: number;
}

const removeBeginningIndent = (code: string) => {
  // 4 spaces always thanks to prettier
  return code.replace(/\n\s{4}/g, '\n');
};

export const defineDemo = (_demo: IDemo) => {
  const demo = { ..._demo };

  demo.component = markRaw(demo.component);
  demo.script &&= removeBeginningIndent(demo.script);
  demo.template &&= removeBeginningIndent(demo.template);

  return demo;
};

export function html(code: string | TemplateStringsArray, ...expressions: string[]) {
  if (Array.isArray(code)) {
    let editedCode = '';
    code.forEach((_code, index) => {
      editedCode = editedCode.concat(_code).concat((expressions || [])[index] || '');
    });
    return editedCode;
  }
  return code as string;
}
