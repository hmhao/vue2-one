<template>
  <header class="header clearfix">
    <i class="menu" @click="$emit('menu')"></i>
    <h3 class="title">ONE</h3>
    <i class="search"></i>
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
