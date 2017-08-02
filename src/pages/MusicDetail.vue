<template>
  <div class="detail">
    <div id="detail-music-head"  v-html="detail.img"></div>
    <div class="detail-music-info" v-html="detail.musicInfo"></div>
    <h1 class="detail-music-title">{{detail.title}}</h1>
    <span class="detail-music-author">{{detail.author}}</span>
    <div v-html="detail.article"></div>
    <i class="detail-editor">{{editor[0]}}</i>
    <i class="detail-editor">{{editor[1]}}</i>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/loading.vue'
export default {
  name: 'music-detail',
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
      this.$http.get(`/musicDetail?id=${id}`).then(response => {
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
