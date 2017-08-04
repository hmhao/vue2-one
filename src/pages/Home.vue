<template>
  <scroller :onRefresh="refresh" :height="'110%'" ref="scroller">
    <div class="home-box">
      <div class="home-bg" :style="homeDesc.bgImg" @click="toDetail(homeDesc.id,$event)">
        <div class="home-bgcolor">
          <div class="home-desc">
            <h4 class="home-day">{{homeDesc.day}}</h4>
            <p class="home-month">{{homeDesc.month}}</p>
            <p class="home-text-short">{{homeDesc.textShort}}</p>
            <span class="home-down"><i class="down"></i></span>
          </div>
        </div>
      </div>
      <div class="home-content" ref="$content">
        <div class="home-article">
          <router-link class="home-tag" to="/article">阅读|</router-link>
          <h1 class="home-title">{{homeArticle.artTitle}}</h1>
          <span class="home-article-author">{{homeArticle.artAuthor}}</span>
            <div v-if="homeArticle.artShortImg" class="home-article-img"><img :src="homeArticle.artShortImg"></div>
            <p v-else>{{homeArticle.artShort}}</p>
            <router-link class="home-read-more" :to="{path: 'articleDetail', query: {id: homeArticle.id}}">阅读全文</router-link>
        </div>
        <div class="home-question">
          <router-link class="home-tag" to="/question">问答|</router-link>
          <h1 class="home-title">{{homeQuestion.quesTitle}}</h1>
          <p>{{homeQuestion.quesShort}}</p>
          <router-link class="home-read-more" :to="{path: 'questionDetail', query: {id: homeQuestion.id}}">阅读全文</router-link>
        </div>
        <div class="home-more">
          <router-link class="to-more" to="/picture">更多内容</router-link>
        </div>
      </div>
      <Loading v-show="showLoading"></Loading>
    </div>
  </scroller>
</template>

<script>
// 引入loading组件,在数据加载时显示,它的显示隐藏由showLoading的值决定
import Loading from '@/components/loading.vue'
export default {
  name: 'home',
  components: {
    Loading
  },
  data () {
    return {
      showLoading: true,
      homeDesc: {},
      homeArticle: {},
      homeQuestion: {}
    }
  },
  created () {
    this.getDatas()
    this.$root.$on('gotoTop', this.gotoTop)
  },
  methods: {
    getDatas () {// 从后台获取数据
      // 使用vue-resource去请求后台接口
      return this.$http.get('/homeData').then(response => {
        let data = response.body
        this.homeDesc = data.homeDesc
        this.homeArticle = data.homeArticle
        this.homeQuestion = data.homeQuestion
        this.showLoading = false
      }, error => {
        console.log(error)
      })
    },
    toDetail (id, $event) {
      if ($event.target.className != 'down') {
        this.$router.push(`/pictureDetail?id=${id}`)
      } else {
        this.$refs.scroller.scrollTo(0, this.$refs.$content.offsetTop - 10, true)
      }
    },
    gotoTop () {
      this.$refs.scroller.scrollTo(0, 0, true)
    },
    refresh (done) {
      this.getDatas().then(function () {
        console.log('home refresh')
        done(true)
      })
    }
  }
}
</script>

<style>
</style>
