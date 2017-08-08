<template>
  <header class="header clearfix" @click.stop="dblclick">
    <i class="menu" @click.stop="$emit('menu')"></i>
    <h3 class="title">ONE</h3>
    <i class="search" @click.stop="$emit('search')"></i>
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
    }
  },
  methods: {
    dblclick () {
      let now = Date.now()
      let tapTime = this.$el.tapTime || now
      if (now !== tapTime && now - tapTime <= 300) {
        this.$root.$emit('gotoTop')
      }
      this.$el.tapTime = now
    }
  }
}
</script>

<style>
</style>
