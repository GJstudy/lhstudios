import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入httpApis
import httpApis from './http/index'
Vue.prototype.$http=httpApis

// 设置JScode安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "c478f6a2eb5ceb30caa0ace41e267336",
};

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
