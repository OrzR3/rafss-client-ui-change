// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import i18n from './i18n/i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/scss/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import { getItem, removeItem } from "@/utils/store";
import { getToken, setToken, removeToken } from '@/utils/auth'
i18n.locale = 'cn'
Vue.config.productionTip = false
import api from './http/index'
Vue.use(api)
Vue.use(ElementUI);
/* eslint-disable no-new */

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    const role = getToken();
    if(role){
      if (to.path === '/login') {
        removeToken();
        window.location.reload()
      } else {
        next()
      }
    }else{
      next({ path: '/login', query: { redirect: to.fullPath }})
    }
  }else{
    next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
