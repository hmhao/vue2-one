<template>
  <div class="article-box">
    <template v-for="data in musicData">
      <div class="article-content" :data-id="data.content_id" @click="toDetail(data.content_id)">
        <p class="article-tag">- {{data.category | categoryName}} -</p>
        <h3 class="article-title">{{data.title}}</h3>
        <span class="article-author">文 / {{data.author.user_name}}</span>
        <div class="music-img-box"><img class="music-img" :src="data.img_url"></div>
        <span class="music-author">{{data.music_name}} · {{data.audio_author}} | {{data.audio_album}}</span>
        <p class="article-short">{{data.forward}}</p>
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
  name: 'music',
  components: {
    Loading
  },
  data () {
    return {
      showLoading: true,
      musicData: []
    }
  },
  created () {
    this.getDatas()
  },
  methods: {
    getDatas (index = 0) {// 从后台获取数据
      // 使用vue-resource去请求后台接口
      this.$http.get(`/musicData?index=${index}`).then(response => {
        this.musicData.push.apply(this.musicData, response.body.data)
        this.showLoading = false
      }, error => {
        console.log(error)
      })
    },
    toDetail (id) {
      this.$router.push(`/musicDetail?id=${id}`)
    }
  }
}
</script>

<style>
</style>
