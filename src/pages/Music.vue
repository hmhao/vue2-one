<template>
  <scroller :onRefresh="refresh" :onInfinite="infinite" ref="scroller">
    <div class="article-box">
      <template v-for="data in list">
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
  </scroller>
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
      isActivated: false,
      scrollPos: {
        left: 0,
        top: 0
      },
      showLoading: true,
      list: []
    }
  },
  created () {
    this.getData()
    this.$root.$on('gotoTop', this.gotoTop)
  },
  activated () {
    this.isActivated = true
    this.$nextTick(() => {
      this.$refs.scroller.resize()
      this.$refs.scroller.scrollTo(this.scrollPos.left, this.scrollPos.top, false)
    })
  },
  deactivated () {
    this.isActivated = false
    this.scrollPos = this.$refs.scroller.getPosition()
  },
  methods: {
    getData (index = 0, refresh = false) {// 从后台获取数据
      // 使用vue-resource去请求后台接口
      return this.$http.get(`/musicData?index=${index}`).then(response => {
        let data = response.body.data
        if (data instanceof Array) {
          if (refresh) {
            let id = parseInt(this.list[0].content_id)
            this.list.unshift.apply(this.list, data.filter(function (item, i) {
              return parseInt(item.content_id) > id
            }))
          } else {
            this.list.push.apply(this.list, data)
          }
        }
        this.showLoading = false
      }, error => {
        console.log(error)
      })
    },
    toDetail (id) {
      this.$router.push(`/musicDetail?id=${id}`)
    },
    gotoTop () {
      this.isActivated && this.$refs.scroller.scrollTo(0, 0, true)
    },
    refresh (done) {
      this.getData(0, true).then(function () {
        console.log('music refresh')
        done(true)
      })
    },
    infinite (done) {
      if (!this.list.length || !this.isActivated) return done(true)
      let lastItem = this.list[this.list.length - 1]
      this.getData(lastItem.id, false).then(function () {
        console.log('music infinite')
        done(true)
      })
    }
  }
}
</script>

<style>
</style>
