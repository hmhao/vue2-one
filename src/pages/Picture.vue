<template>
  <scroller :onRefresh="refresh" :onInfinite="infinite">
    <div class="picture-box">
      <template v-for="data in list">
        <div class="picture-content" :data-id="data.id" @click="toDetail(data.id)">
          <p class="picture-date">{{data.date}}</p>
          <h3 class="picture-title">{{data.title}}</h3>
          <div class="picture-img"><img :src="data.img_url"></div>
          <span class="picture-img-author">{{data.picture_author}}</span>
          <p class="picture-short">{{data.content}}</p>
          <span class="picture-authors">{{data.text_authors}}</span>
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
  name: 'picture',
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
      return this.$http.get(`/pictureData?index=${index}`).then(response => {
        let data = response.body.data
        if (data instanceof Array) {
          if (refresh) {
            let id = parseInt(this.list[0].id)
            this.list.unshift.apply(this.list, data.filter(function (item, i) {
              return parseInt(item.id) > id
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
      this.$router.push(`/pictureDetail?id=${id}`)
    },
    refresh (done) {
      this.getData(0, true).then(function () {
        console.log('picture refresh')
        done(true)
      })
    },
    infinite (done) {
      if (!this.list.length || !this.isActivated) return done(true)
      let lastItem = this.list[this.list.length - 1]
      this.getData(lastItem.id, false).then(function () {
        console.log('picture infinite')
        done(true)
      })
    }
  }
}
</script>

<style>
</style>
