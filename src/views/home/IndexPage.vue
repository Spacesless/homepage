<script setup lang="ts">
import Background from '/components/Background.vue'
import DesktopIcon from "./components/DesktopIcon.vue";
import Search from "./components/Search.vue";
</script>

<template>
  <div class="home">
    <Background />
    <DesktopIcon />
    <Search />
  </div>
</template>

<style lang="less" scoped>
@import "./index.less";
</style>
