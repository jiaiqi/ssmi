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
      path: '/',
      redirect:'/login'
    },
    {
      path: '/dzbl',
      name: 'dzbl',
      component: dzbl,
      beforeEnter: (to, from, next) => {
        // ...
        let isLogin = sessionStorage.getItem("isLogin")
        if(isLogin){
          next()
        }else{
          next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter:(to, from, next) => {
        sessionStorage.clear()
        next()
      }
    },
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
