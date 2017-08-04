// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueScroller from 'vue-scroller'
import App from './App'
import filters from './filters'
import router from './router'
import '@/assets/css/common.css'
import '@/assets/css/media50px.min.css'

Vue.use(VueResource)
Vue.use(VueScroller)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
