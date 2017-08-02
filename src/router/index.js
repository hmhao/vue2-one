import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/pages/Home'
import Picture from '@/pages/Picture'
import PictureDetail from '@/pages/PictureDetail'
import ArticleDetail from '@/pages/ArticleDetail'
import QuestionDetail from '@/pages/QuestionDetail'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/picture',
    component: Picture
  }, {
    path: '/pictureDetail',
    component: PictureDetail
  }, {
    path: '/articleDetail',
    component: ArticleDetail
  }, {
    path: '/questionDetail',
    component: QuestionDetail
  }]
})
