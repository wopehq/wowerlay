import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

export function highlightInit() {
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('html', xml);
}

export const useHighlight = () => hljs;
