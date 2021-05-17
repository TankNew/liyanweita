import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    //{
    //  path: '/control',
    //  name: 'Control',
    //  component: Control,
    //  meta: { auth: true },
    //  children: [
    //    {
    //      path: 'home',
    //      component: Home
    //    },
    //    {
    //      path: 'kefumanage',
    //      component: KefuManage
    //    }
    //    ,
    //    {
    //      path: 'visitormanage',
    //      component: VisitorManage
    //    }
    //    ,
    //    {
    //      path: 'company-manage',
    //      component: CompanyManage
    //    }
    //  ]
    //},
    //{
    //  path: '/',
    //  redirect: '/Hello'
    //},
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
