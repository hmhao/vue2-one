<template>
  <div id="app">
    <appHeader @menu="isMenuShow = true" @search="isSearchShow = true"></appHeader>
    <appMenu @click.native="isMenuShow = false" ref="menu"></appMenu>
    <appSearch :show="isSearchShow" @cancel="isSearchShow = false"></appSearch>
    <div class="main">
      <keep-alive :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/Header.vue'
import appMenu from '@/components/Menu.vue'
import appSearch from '@/components/Search.vue'
export default {
  name: 'app',
  components: {
    appHeader,
    appMenu,
    appSearch
  },
  data () {
    return {
      animation: null,
      isMenuShow: false,
      isSearchShow: false,
      menuOriginalPosition: 0,
      keepAlive: ['home', 'picture', 'article', 'music', 'movie']
    }
  },
  created () {
    this.isSearchShow = !!this.$route.path.match(/\/search/g)
  },
  mounted () {
    let menu = this.$refs.menu.$el
    this.menuOriginalPosition = menu.offsetLeft
  },
  methods: {
    moveTo (speed, position) {
      let menu = this.$refs.menu.$el
      menu.style.left = menu.offsetLeft + speed + 'px'
      if (Math.abs(Math.abs(menu.offsetLeft) - Math.abs(position)) > 30) {
        this.animation = window.requestAnimationFrame(this.moveTo.bind(this, speed, position))
      } else {
        menu.style.left = position + 'px'
        window.cancelAnimationFrame(this.animation)
      }
    }
  },
  watch: {
    isMenuShow (value) {
      window.cancelAnimationFrame(this.animation)
      let speed, position
      if (value) {
        speed = 30
        position = 0
      } else {
        speed = -30
        position = this.menuOriginalPosition
      }
      this.animation = window.requestAnimationFrame(this.moveTo.bind(this, speed, position))
    },
    $route (to, from) {
      this.isMenuShow = false
      this.isSearchShow = !!this.$route.path.match(/\/search/g)
    }
  }
}
</script>

<style>
</style>
