// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueInit from '@/assets/dev_config/vue_init'
import VueUtil from '@/assets/dev_config/vue_util'
import VueResource from 'vue-resource' // 导入VueResource
import "element-ui/lib/theme-chalk/index.css";
import elementUI from 'element-ui';
import VCharts from 'v-charts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import moment from 'moment'
Vue.prototype.moment = moment
Vue.use(VueAwesomeSwiper)
Vue.use(VCharts)
Vue.use(VueResource)
Vue.use(elementUI)
VueInit()
VueUtil()
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.http = axios // 挂载axios到vue.proto对象上原型属性
axios.interceptors.request.use(function (config) {
  config.timeout = 8000
  // 在发送请求之前做些什么
  let bx_auth_ticket = sessionStorage.getItem("bx_auth_ticket");
  let cert_auth_ticket = sessionStorage.getItem("cert_auth_ticket")
  if (bx_auth_ticket) {
    config.headers["bx_auth_ticket"] = bx_auth_ticket;
  }
  if (cert_auth_ticket) {
    config.headers["cert_auth_ticket"] = cert_auth_ticket;
  }
  // alert("aaa"+bx_auth_ticket+'---'+cert_auth_ticket)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
axios.interceptors.response.use(response => {
  if (response.data.state == "FAILURE") {
    if (response.data.resultCode == '0011') {
      if (sessionStorage.getItem("need_login_flag") != "need_login") {
        sessionStorage.setItem("need_login_flag", "need_login");
        sessionStorage.setItem("isLogin", "false")
      }
    } else if (response.data.resultCode == '0000') {
      if (sessionStorage.getItem("need_login_flag") != "need_login") {
        alert(response.data.resultMessage);
      }
    } else {
      if (sessionStorage.getItem("need_login_flag") != "need_login") {
        alert(response.data.resultMessage);
      }
    }
  } else if (response.data.state == "SUCCESS") {
    sessionStorage.setItem("isLogin", "true")
    if (response.data.response) {
      let resp = response.data.response[0]
      let bx_auth_ticket = response.data.response[0].response.bx_auth_ticket
      sessionStorage.setItem("bx_auth_ticket", bx_auth_ticket)
      let current_login_user = resp.response.login_user_info;
      sessionStorage.setItem("current_login_user", JSON.stringify(current_login_user))
      top.user = current_login_user;
    }
  }
  return response;
})
// Vue.http.options.xhr = { withCredentials: true }// vueresource请求跨域
// Vue.http.interceptors.push((request, next) => {
//   request.credentials = true
//   next()
// })


/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
