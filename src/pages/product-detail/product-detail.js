import Vue from 'vue'
import Vuex from 'vuex'
import '../../../static/css/main.css'
import axios from 'axios'
import * as uiv from 'uiv'
import app from './product-detail.vue'
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

Vue.use(uiv)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(app)
})
