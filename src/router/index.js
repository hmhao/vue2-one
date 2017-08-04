import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Picture from '@/pages/Picture'
import Article from '@/pages/Article'
import Music from '@/pages/Music'
import Movie from '@/pages/Movie'
import About from '@/pages/About'
import PictureDetail from '@/pages/PictureDetail'
import ArticleDetail from '@/pages/ArticleDetail'
import MusicDetail from '@/pages/MusicDetail'
import MovieDetail from '@/pages/MovieDetail'
import QuestionDetail from '@/pages/QuestionDetail'

Vue.use(Router)

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
    path: '/movie',
    component: Movie
  }, {
    path: '/about',
    component: About
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
    path: '/movieDetail',
    component: MovieDetail
  }, {
    path: '/questionDetail',
    component: QuestionDetail
  }]
})
