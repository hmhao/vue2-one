<template>
  <div class="top-search">
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
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    toSearch () {
      let keyword = this.keyword
      this.$router.push(`/search?keyword=${keyword}`)
    }
  }
}
</script>

<style>
</style>
