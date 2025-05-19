import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from '/@/App.vue';
import router from '/@/router';
import { directive } from '/@/directive/index';
import { i18n } from '/@/i18n/index';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';

import '/@/theme/index.scss';
import VueGridLayout from 'vue-grid-layout';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

// import "bpmn-js/dist/assets/diagram-js.css";
// import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
// import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import Vue3Marquee from 'vue3-marquee';

//全局导入自定义组件
import ComponentRegister from './plugins/component.js';

const app = createApp(App);

directive(app);

other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus).use(i18n).use(VueGridLayout).use(ComponentRegister).use(Vue3Marquee).mount('#app');
