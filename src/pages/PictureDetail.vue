<template>
  <div class="picture-detail">
    <img :src="detail['img']">
    <div class="picture-author" v-html="detail.author"></div>
    <div class="picture-day">{{detail.day}}</div>
    <div class="picture-month">{{detail.month}}</div>
    <span class="picture-line"></span>
    <p class="picture-article">{{detail.article}}</p>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/loading.vue'
export default {
  name: 'picture-detail',
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
      this.$http.get(`/pictureDetail?id=${id}`).then(response => {
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