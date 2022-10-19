<template>
  <div class="home">
    <DesktopBackground />
    <DesktopIcon v-if="iconShow" />
    <SearchEngines v-if="searchShow" />
    <DesktopWidget />
    <TaskBar />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
import DesktopBackground from './components/DesktopBackground.vue'
import DesktopIcon from './components/DesktopIcon.vue'
import SearchEngines from './components/SearchEngines.vue'
import DesktopWidget from './components/DesktopWidget.vue'
import TaskBar from './components/TaskBar.vue'

const settingStore = useSettingStore()
const { iconShow, searchShow } = storeToRefs(settingStore)
</script>

<style lang="less" scoped>
@import './index.less';
</style>
