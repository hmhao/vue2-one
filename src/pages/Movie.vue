<template>
  <div class="article-box">
    <template v-for="data in movieData">
      <div class="article-content" :data-id="data.content_id" @click="toDetail(data.content_id)">
        <p class="article-tag">- {{data.category | categoryName}} -</p>
        <h3 class="article-title">{{data.title}}</h3>
        <span class="article-author">文 / {{data.author.user_name}}</span>
        <div class="movie-img"><img :src="data.img_url"></div>
        <p class="article-short">{{data.forward}}</p>
        <p class="movie-subtitle">--关于《{{data.subtitle}}》</p>
        <span class="article-date">{{data.post_date | date('yyyy/M/d')}}</span>
      </div>
    </template>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
// 引入loading组件,在数据加载时显示,它的显示隐藏由showLoading的值决定
import Loading from '@/components/loading.vue'
export default {
  name: 'movie',
  components: {
    Loading
  },
  data () {
    return {
      showLoading: true,
      movieData: []
    }
  },
  created () {
    this.getDatas()
  },
  methods: {
    getDatas (index = 0) {// 从后台获取数据
      // 使用vue-resource去请求后台接口
      this.$http.get(`/movieData?index=${index}`).then(response => {
        this.movieData.push.apply(this.movieData, response.body.data)
        this.showLoading = false
      }, error => {
        console.log(error)
      })
    },
    toDetail (id) {
      this.$router.push(`/movieDetail?id=${id}`)
    }
  }
}
</script>

<style>
</style>
