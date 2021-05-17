import Vue from 'vue'
import config from 'config'
import router from '@/pages/index/router/router.config'
import swal from 'sweetalert'
import axios from 'axios'
export default {
  state: {
    currentUser: {
      get UserDomain() {
        if (sessionStorage.getItem('UserDomain'))
          return sessionStorage.getItem('UserDomain')
        else
          return localStorage.getItem('UserDomain')
      },
      get UserName() {
        if (sessionStorage.getItem('UserName'))
          return sessionStorage.getItem('UserName')
        else
          return localStorage.getItem('UserName')
      },
      get UserLegal() {
        if (sessionStorage.getItem('UserLegal'))
          return sessionStorage.getItem('UserLegal')
        else
          return localStorage.getItem('UserLegal')
      },
      get UserSign() {
        if (sessionStorage.getItem('UserSign'))
          return sessionStorage.getItem('UserSign')
        else
          return localStorage.getItem('UserSign')
      }
    }
  },
  mutations: {
    setUser(state, { UserDomain, UserLegal, UserName, UserSign, IsLocal, Rurl }) {
      if (IsLocal) {
        sessionStorage.removeItem('UserName')
        sessionStorage.removeItem('UserDomain')
        sessionStorage.removeItem('UserLegal')
        sessionStorage.removeItem('UserSign')
        localStorage.setItem('UserName', UserName)
        localStorage.setItem('UserDomain', UserDomain)
        localStorage.setItem('UserLegal', UserLegal)
        localStorage.setItem('UserSign', UserSign)
      } else {
        localStorage.removeItem('UserName')
        localStorage.removeItem('UserDomain')
        localStorage.removeItem('UserLegal')
        localStorage.removeItem('UserSign')
        sessionStorage.setItem('UserName', UserName)
        sessionStorage.setItem('UserDomain', UserDomain)
        sessionStorage.setItem('UserLegal', UserLegal)
        sessionStorage.setItem('UserSign', UserSign)
      }
      if (Rurl === null || Rurl === undefined) {
        router.push({ path: '/control/home' })
      } else {
        router.push({ path: Rurl })
      }
    },
    logout() {
      sessionStorage.removeItem('UserName')
      sessionStorage.removeItem('UserDomain')
      sessionStorage.removeItem('UserLegal')
      sessionStorage.removeItem('UserSign')
      localStorage.removeItem('UserName')
      localStorage.removeItem('UserDomain')
      localStorage.removeItem('UserLegal')
      localStorage.removeItem('UserSign')
      let url = config.UsersUrl + 'logout'
      router.push({ path: '/login' })
    }
  },
  actions: {
    userLogin(context, { UserDomain, UserPass, IsLocal, Rurl }) {
      let url = config.companyUrl + 'login'
      axios.post(url, {
        domain: UserDomain,
        password: UserPass
      }).then(function (response) {
        var json = response.data
        if (json.error === 0)
          context.commit('setUser', { 'UserDomain': UserDomain, 'UserLegal': json.author, 'UserName': json.name, 'UserSign': json.sign, 'IsLocal': IsLocal, 'Rurl': Rurl })
        else
          swal({
            title: json.error + ':' + json.content,
            icon: 'error'
          })
      }).catch(function (error) {
        swal({
          title: '系统错误',
          icon: 'error'
        })
        console.log(error)
      })
    }
  }
}
