import Vue from 'vue'
import Router from 'vue-router'
import dzbl from '@/pages/dzbl'
import login from '@/pages/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/dzbl'
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
    }
  ]
})
