// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import filters from './filters'
import router from './router'
import '@/assets/css/common.css'
import '@/assets/css/media50px.min.css'
import VueScroller from 'vue-scroller'

Vue.use(VueScroller)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
