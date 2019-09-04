import Vue from 'vue'
import Router from 'vue-router'
import dzbl from '@/pages/dzbl'
import login from '@/pages/login'
// import medicalrecord from '@/pages/chart_dzbl'
import platform from '@/pages/chart_platform'
import oneCard from '@/pages/chart_ykt'
import secplat from '@/pages/chart_secplat'
import datacenter from'@/pages/datacenter'
import debugging from'@/pages/debugging'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dzbl',
      name: 'dzbl',
      component: dzbl
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    // {
    //   path: '/medicalrecord',
    //   name: 'medicalrecord',
    //   component: medicalrecord
    // },
    {
      path: '/onecard',
      name: 'onecard',
      component: oneCard
    },
    {
      path: '/platform',
      name: 'platform',
      component: platform
    },
    {
      path: '/secplat',
      name: 'secplat',
      component: secplat
    },
    {
      path: '/datacenter',
      name: 'datacenter',
      component: datacenter
    },
    {
      path: '/debugging',
      name: 'debugging',
      component: debugging
    },
  ]
})
