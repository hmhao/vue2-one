<template>
  <div class="detail">
    <div class="movie-top-bg" :style="detail.topImg"></div>
    <h1 class="detail-title">{{detail.title}}</h1>
    <h2 class="detail-subtitle">{{detail.subtitle}}</h2>
    <span class="movie-author">{{detail.author}}</span>
    <div class="detail-article" v-html="detail.article"></div>
    <i class="detail-editor">{{editor[0]}}</i>
    <i class="detail-editor">{{editor[1]}}</i>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/loading.vue'
export default {
  name: 'movie-detail',
  components: {
    Loading
  },
  data () {
    return {
      detail: {},
      editor: [],
      showLoading: true
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      let id = this.$route.query.id
      this.$http.get(`/movieDetail?id=${id}`).then(response => {
        this.detail = response.body.detail
        this.editor = this.detail.editor
        this.showLoading = false
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
