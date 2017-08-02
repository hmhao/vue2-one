<template>
  <div class="detail">
    <h1 class="detail-title">{{detail.title}}</h1>
    <span class="detail-line"></span>
    <span class="detail-author">{{detail.author}}</span>
    <div class="detail-article" v-html="detail.question"></div>
    <span class="question-line"></span>
    <span class="detail-author">{{detail.answers}}</span>
    <div class="detail-article" v-html="detail.article"></div>
    <i class="detail-editor">{{detail.editor}}</i>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/loading.vue'
export default {
  name: 'question-detail',
  components: {
    Loading
  },
  data () {
    return {
      detail: {},
      showLoading: true
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      let id = this.$route.query.id
      this.$http.get(`/questionDetail?id=${id}`).then(response => {
        this.detail = response.body.detail
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