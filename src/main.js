import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import AOS from 'aos'
import 'aos/dist/aos.css'
import i18n from './i18n'
import store from "./state/store";

import BootstrapVue3 from 'bootstrap-vue-3';
import vClickOutside from "click-outside-vue3"
import VueApexCharts from "vue3-apexcharts";
import Maska from 'maska';

import VueFeather from 'vue-feather';
import Particles from "particles.vue3";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/scss/config/default/app.scss';
import '@vueform/slider/themes/default.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


AOS.init({
    easing: 'ease-out-back',
    duration: 1000
})

const app = createApp(App)
app
    .use(store)
    .use(router)
    .use(VueApexCharts)
    .use(BootstrapVue3)
    .component(VueFeather.type, VueFeather)
    .use(Maska)
    .use(Particles)
    .use(ElementPlus)
    .use(i18n)
    .use(vClickOutside).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
