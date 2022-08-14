// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import wx from 'weixin-js-sdk'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// const defaultSettings = require('../src/config/index')
// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
// filters
import './filters'
// moment
import moment from 'moment'
import AMap from 'vue-amap'
import openId from './views/loading/openId'
import vueEsign from 'vue-esign'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

Vue.prototype.$openId = openId

Vue.prototype.$cdn = $cdn
Vue.prototype.$axios = axios
Vue.prototype.$$router = router
Vue.config.productionTip = false
Vue.prototype.$wx = wx
Vue.prototype.$moment = moment
Vue.use(AMap)
Vue.use(vueEsign)
Vue.use(QrcodeStream)
Vue.use(QrcodeDropZone)
Vue.use(QrcodeCapture)

AMap.initAMapApiLoader({
  // 高德key
  key: '358cf6eeec9e6c7a1cd008a58a0c54d6',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})


router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   console.log(to)
  //   document.title = `${defaultSettings.title}-${to.meta.title}`
  // } else {
  //   document.title = `${defaultSettings.title}`
  // }
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) { // 判断本地是否存在access_token
      next()
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  } else {
    next()
  }
  /* 如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  // if (to.fullPath === '/login') {
  //   if (localStorage.getItem('token')) {
  //     console.log('有token')
  //     next({
  //       path: from.fullPath
  //     })
  //   } else {
  //     next()
  //   }
  // }
})
var vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
export default vue
