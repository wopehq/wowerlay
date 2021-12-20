import './demo.scss';
import 'highlight.js/styles/atom-one-dark.css';
import 'bottom-sheet-vue3/css/style.css';
import 'virtual:windi.css';

import Demo from './Demo.vue';
import { createApp } from 'vue';
import { createWowerlay } from '../src/lib';
import { highlightInit } from './helpers/highlight';

highlightInit();

const app = createApp(Demo);
const wowerlay = createWowerlay();
app.use(wowerlay);
app.mount('#app');
