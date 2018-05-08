// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios
import '../static/dist/css/mui.css'
Vue.config.productionTip = false
import httpUrl from './assets/httpurl/http_url';
Vue.prototype.$httpUrl = httpUrl;
router.beforeEach((to, from, next) => {
  console.group("即将要进入的目标路由对象：");
  console.log(to);
  console.groupEnd();
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
