import Vue from 'vue'
import Vuex from 'vuex'
import '../../../static/css/main.css'
import axios from 'axios'
import * as uiv from 'uiv'
import app from './search.vue'
import VeeValidate from 'vee-validate'
import ValidatorConfig from '@/services/Validator.config'
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
//验证工具
const Veeconfig = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  events: 'input|blur',
  locale: 'zh_CN',
  strict: true
}
Vue.config.productionTip = false

Vue.use(uiv)
Vue.use(Vuex)
Vue.use(VeeValidate, Veeconfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(app)
})
