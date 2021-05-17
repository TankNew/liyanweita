// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import ValidatorConfig from '@/services/Validator.config'
import App from './App'
import router from './router/router.config'
import '../../../static/css/main.css'
import '../../../static/css/index.css'
import UsersModule from '@/services/UsersModule'
import axios from 'axios'
import * as uiv from 'uiv'

// 设置axios拦截器 cors设置
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false
//验证工具
const Veeconfig = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  events: 'input|blur',
  locale: 'zh_CN',
  strict: true
}
Vue.use(uiv)
Vue.use(Vuex)
Vue.use(VeeValidate, Veeconfig)
/* eslint-disable no-new */
//new Vue({
//  el: '#app',
//  router,
//  components: { App },
//  template: '<App/>'
//})
const store = new Vuex.Store({
  modules: {
    users: UsersModule
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    // 对路由进行验证
    if (store.state.users.currentUser.UserLegal) { // 已经登陆
      next()
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      next({ path: '/login', query: { Rurl: to.fullPath } })
    }
  }
  else {
    next()
  }
})
/* eslint-disable no-new */
if (!window.localStorage) {
  alert('This browser do not supports localStorage. Please change browser to ie 9.0 at least .')
}
else {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
