import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import router from "./router"
import i18n from "@/i18n"

import VueClipboard from 'vue-clipboard2'

// toast弹窗
import Toast, {
  POSITION
} from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueClipboard)

import vant from "vant"

import 'vant/lib/index.less';
import 'amfe-flexible'

import plugin from "@/plugin"

Vue.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 1500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.8,
  showCloseButtonOnHover: false, // 仅在悬停时显示关闭按钮
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  maxToasts: 3,
});

Vue.use(vant);
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
