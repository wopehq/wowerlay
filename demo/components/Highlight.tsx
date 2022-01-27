import { CSSProperties, PropType, defineComponent, onMounted, shallowRef, watch } from 'vue';

import { useHighlight } from '../helpers/highlight';

const style: CSSProperties = {
  whiteSpace: 'pre',
  textAlign: 'left',
  color: 'rgb(235, 235, 235)',
  fontFamily: `'Source Code Pro', monospace`,
  margin: '0 10px',
};

export const Highlight = defineComponent({
  name: 'Highlight',
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String as PropType<'html' | 'javascript'>,
      required: true,
    },
  },
  setup(props) {
    const code = shallowRef('');
    const hljs = useHighlight();

    const highlight = () => {
      code.value = hljs.highlight(props.code, { language: props.language }).value;
    };

    onMounted(highlight);
    watch(() => [props.code], highlight);

    return { code };
  },
  render() {
    return this.code && <div style={style} innerHTML={this.code} />;
  },
});
