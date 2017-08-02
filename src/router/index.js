import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/pages/Home'
import PictureDetail from '@/pages/PictureDetail'
import DrticleDetail from '@/pages/ArticleDetail'
import QuestionDetail from '@/pages/QuestionDetail'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/PictureDetail',
    component: PictureDetail
  }, {
    path: '/DrticleDetail',
    component: DrticleDetail
  }, {
    path: '/QuestionDetail',
    component: QuestionDetail
  }]
})
