<template>
  <div class="top-search" v-show="show">
    <div class="top-search-mask" @click.stop="$emit('cancel')"></div>
    <input type="text" placeholder="输入作者或标题关键字"
           v-model="keyword"
           @keyup.enter="toSearch"
           ref="input" />
    <i class="search" @click="toSearch"></i>
    <router-view name="search"></router-view>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      keyword: ''
    }
  },
  props: {
    show: false
  },
  methods: {
    toSearch () {
      let keyword = this.keyword || ''
      this.$router.push(`/search?keyword=${keyword}`)
    }
  },
  watch: {
    show (value) {
      if (value) {
        this.keyword = this.$route.query.keyword || ''
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  }
}
</script>

<style>
</style>
