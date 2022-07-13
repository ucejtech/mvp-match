import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'windi.css';
import './filters/formatter';
import '@/components/_global';
import toast from './plugins/toast';
import 'izitoast/dist/css/iziToast.min.css';
import { IToastObject } from './types/interfaces';

declare module 'vue/types/vue' {
  interface Vue {
    $toast: IToastObject;
  }
}
Vue.prototype.$toast = toast;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
