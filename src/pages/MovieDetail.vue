<template>
  <scroller ref="scroller">
    <div class="detail">
      <div class="movie-top-bg" :style="detail.topImg"></div>
      <h1 class="detail-title">{{detail.title}}</h1>
      <h2 class="detail-subtitle">{{detail.subtitle}}</h2>
      <span class="movie-author">{{detail.author}}</span>
      <div v-html="detail.article"></div>
      <i class="detail-editor">{{editor[0]}}</i>
      <i class="detail-editor">{{editor[1]}}</i>
      <Loading v-show="showLoading"></Loading>
    </div>
  </scroller>
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
    this.$root.$on('gotoTop', this.gotoTop)
  },
  destroyed () {
    this.$root.$off('gotoTop', this.gotoTop)
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
    },
    gotoTop () {
      this.$refs.scroller.scrollTo(0, 0, true)
    }
  }
}
</script>

<style>
</style>
