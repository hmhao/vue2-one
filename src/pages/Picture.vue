<template>
  <div class="picture-box">
    <template v-for="data in pictureData">
      <div class="picture-content" :data-id="data.id" @click="articlesToDetail(data.id)">
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
</template>

<script>
// 引入loading组件,在数据加载时显示,它的显示隐藏由showLoading的值决定
import Loading from "@/components/loading.vue"
export default {
  name: 'picture',
  components: {
    Loading
  },
  data () {
    return {
      showLoading: true,
      pictureData: []
    }
  },
  created () {
    this.getDatas()
  },
  methods: {
    getDatas (index = 0) {// 从后台获取数据
      // 使用vue-resource去请求后台接口
      this.$http.get(`/pictureData?index=${index}`).then(response => {
        console.log(response.body.data)
        this.pictureData.push.apply(this.pictureData, response.body.data)
        this.showLoading = false
      }, error => {
        console.log(error)
      })
    },
    articlesToDetail (id) {
      this.$router.push(`/pictureDetail?id=${id}`)
    }
  }
}
</script>

<style>
</style>
