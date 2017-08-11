<template>
  <div class="search-box">
    <ul class="search-tabs">
      <li v-for="tab in tabs"
          :class="{'active': type === tab.type}"
          @click.stop="changeType(tab.type)">
        {{tab.label}}
      </li>
    </ul>
    <div class="search-list" v-show="list.length">
      <scroller style="top: 1.4rem;" :onRefresh="refresh" :onInfinite="infinite" ref="scroller">
        <div class="search-list-item"
             v-for="item in list"
             @click="toDetail(item.id)">
          <p class="date">{{item.date}}</p>
          <p class="info">
            <img class="img" v-show="item.img" :src="item.img" />
            <span class="title" v-show="item.title" >{{item.title}}</span>
            <span class="author">{{item.author}}</span>
          </p>
          <p class="content-short" v-html="item.content" />
        </div>
      </scroller>
    </div>
    <div class="search-none" v-if="!showLoading && !list.length">
      <img alt="没有搜索结果" src="../../static/images/search-none.png" class="ONEJS-IMAGE-TRIGGER">
      <p class="search-none-tip">
        没有任何与“<span class="search-none-keyword">{{keyword}}</span>”有关的记录
      </p>
      <p><router-link to="/article" class="link-to">浏览更多精彩内容</router-link></p>
    </div>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/loading.vue'
const defaultType = 'picture'
export default {
  name: 'search-list',
  components: {
    Loading
  },
  data () {
    return {
      showLoading: true,
      keyword: '',
      type: defaultType,
      tabs: [{
        type: 'picture',
        label: '图文'
      }, {
        type: 'article',
        label: '阅读'
      }, {
        type: 'music',
        label: '音乐'
      }, {
        type: 'movie',
        label: '电影'
      }, {
        type: 'question',
        label: '问答'
      }],
      list: [],
      page: 1,
      haveNext: false
    }
  },
  created () {
    this.type = this.$route.query.type || defaultType
    this.keyword = this.$route.query.keyword
    this.page = this.$route.query.page || 1
    this.getData(this.page)
  },
  methods: {
    getData (index = 1, refresh = false) {// 从后台获取数据
      // 使用vue-resource去请求后台接口
      let keyword = this.keyword
      if (!keyword) return this.showLoading = false

      let type = this.type
      this.showLoading = true
      return this.$http.get(`/search?type=${type}&keyword=${keyword}&page=${index}`).then(response => {
        let data = response.body.data
        if (refresh) {
          this.list = data
        } else {
          this.list.push.apply(this.list, data)
        }
        this.haveNext = response.body.haveNext
        this.showLoading = false
      }, error => {
        console.log(error)
        this.showLoading = false
      })
    },
    toDetail (id) {
      let type = this.type
      this.$router.push(`/${type}Detail?id=${id}`)
    },
    changeType (type) {
      let keyword = this.keyword
      this.$router.push(`/search?type=${type}&keyword=${keyword}`)
    },
    refresh (done) {
      this.getData(this.page = 1, true).then(function () {
        console.log('search refresh')
        done(true)
      })
    },
    infinite (done) {
      if (!this.list.length || !this.haveNext) return done(true)
      this.page++
      this.getData(this.page, false).then(function () {
        console.log('search infinite')
        done(true)
      })
    }
  },
  watch: {
    $route (to, from) {
      if (this.$route.path.match(/\/search/g)) {
        this.type = this.$route.query.type || defaultType
        this.keyword = this.$route.query.keyword
        this.$refs.scroller.scrollTo(0, 0, true)
        this.getData(1, true)
      }
    }
  }
}
</script>

<style>
</style>
