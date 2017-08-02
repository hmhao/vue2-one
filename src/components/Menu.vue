<template>
  <div class="side-menu">
    <router-link v-for="link in links" :to="link.path" :key="link.path" class="link-to">
      {{link.label}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      links: [{
        path: '/picture',
        label: '图文'
      }, {
        path: '/article',
        label: '阅读'
      }, {
        path: '/music',
        label: '音乐'
      }, {
        path: '/movie',
        label: '影视'
      }, {
        path: '/about',
        label: '关于'
      }]
    }
  }
}
</script>

<style>
</style>