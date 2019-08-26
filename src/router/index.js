import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import dzbl from '@/pages/dzbl'
import login from '@/pages/login'
import chartDzbl from '@/pages/chart_dzbl'
import platform from '@/pages/chart_platform'
import chartYKT from '@/pages/chart_ykt'
import secplat from '@/pages/chart_secplat'
import datacenter from'@/pages/datacenter'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'dzbl',
      component: dzbl
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/dzblc',
      name: 'chartDzbl',
      component: chartDzbl
    },
    {
      path: '/ykt',
      name: 'chartYKT',
      component: chartYKT
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
    }
  ]
})
