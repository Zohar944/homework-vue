// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs

Vue.use(ElementUI)
Vue.config.productionTip = false

if (location.href.indexOf('http://localhost:80') !== -1) { // 本地时
  axios.defaults.baseURL = '/api'
} else if (location.href.indexOf('https') !== -1) {  // https协议时
  axios.defaults.baseURL = 'https://101.200.219.156'
} else { // http协议时
  axios.defaults.baseURL = 'http://101.200.219.156'
}

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
