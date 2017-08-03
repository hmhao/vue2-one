<template>
  <scroller :onRefresh="refresh" :onInfinite="infinite">
    <div class="article-box">
      <template v-for="data in list">
        <div class="article-content" :data-id="data.content_id" @click="toDetail(data.content_id)">
          <p class="article-tag">- {{data.category | categoryName}} -</p>
          <h3 class="article-title">{{data.title}}</h3>
          <span class="article-author">文 / {{data.author.user_name}}</span>
          <div class="article-img"><img :src="data.img_url"></div>
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
  name: 'article',
  components: {
    Loading
  },
  data () {
    return {
      isActivated: true,
      showLoading: true,
      list: []
    }
  },
  created () {
    this.getData()
  },
  activated () {
    this.isActivated = true
  },
  deactivated () {
    this.isActivated = false
  },
  methods: {
    getData (index = 0, refresh = false) {// 从后台获取数据
      // 使用vue-resource去请求后台接口
      return this.$http.get(`/articleData?index=${index}`).then(response => {
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
      this.$router.push(`/articleDetail?id=${id}`)
    },
    refresh (done) {
      this.getData(0, true).then(function () {
        console.log('article refresh')
        done(true)
      })
    },
    infinite (done) {
      if (!this.list.length || !this.isActivated) return done(true)
      let lastItem = this.list[this.list.length - 1]
      this.getData(lastItem.id, false).then(function () {
        console.log('article infinite')
        done(true)
      })
    }
  }
}
</script>

<style>
</style>
