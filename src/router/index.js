import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/pages/Home'
import Picture from '@/pages/Picture'
import Article from '@/pages/Article'
import Music from '@/pages/Music'
import PictureDetail from '@/pages/PictureDetail'
import ArticleDetail from '@/pages/ArticleDetail'
import MusicDetail from '@/pages/MusicDetail'
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
    path: '/article',
    component: Article
  }, {
    path: '/music',
    component: Music
  }, {
    path: '/pictureDetail',
    component: PictureDetail
  }, {
    path: '/articleDetail',
    component: ArticleDetail
  }, {
    path: '/musicDetail',
    component: MusicDetail
  }, {
    path: '/questionDetail',
    component: QuestionDetail
  }]
})
