<template>
  <div id="app">
    <appHeader @menu="isMenuShow = true"></appHeader>
    <appMenu ref="menu" @click="isMenuShow = false"></appMenu>
    <div class="main" @click="isMenuShow = false">
      <keep-alive include="home">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/Header.vue'
import appMenu from '@/components/Menu.vue'
export default {
  name: 'app',
  data () {
    return {
      animation: null,
      isMenuShow: false,
      menuOriginalPosition: 0
    }
  },
  mounted () {
    let menu = this.$refs.menu.$el
    this.menuOriginalPosition = menu.offsetLeft
  },
  methods: {
    moveTo (speed, position) {
      let menu = this.$refs.menu.$el
      menu.style.left = menu.offsetLeft + speed + 'px'
      if (Math.abs(Math.abs(menu.offsetLeft) - Math.abs(position)) > 10) {
        this.animation = window.requestAnimationFrame(this.moveTo.bind(this, speed, position))
      } else {
        menu.style.left = position + 'px'
        window.cancelAnimationFrame(this.animation)
      }
    }
  },
  watch: {
    isMenuShow (value) {
      console.log('isMenuShow', value)
      window.cancelAnimationFrame(this.animation)
      let speed, position
      if (value) {
        speed = 10
        position = 0
      } else {
        speed = -10
        position = this.menuOriginalPosition
      }
      this.animation = window.requestAnimationFrame(this.moveTo.bind(this, speed, position))
    },
    $route (to, from) {
      this.isMenuShow = false
    }
  },
  components: {
    appHeader,
    appMenu
  }
}
</script>

<style>
</style>
