<script setup lang="ts">
import DesktopBackground from './components/DesktopBackground.vue'
import DesktopIcon from './components/DesktopIcon.vue'
import SearchEngines from './components/SearchEngines.vue'
import DesktopWidget from './components/DesktopWidget.vue'
import TaskBar from './components/TaskBar.vue'
</script>

<template>
  <div class="home">
    <DesktopBackground />
    <DesktopIcon />
    <SearchEngines />
    <DesktopWidget />
    <TaskBar />
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>
