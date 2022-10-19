<template>
  <div class="widget">
    <WeatherWidget v-if="weatherShow" class="widget-item" />
    <TodoList v-if="todoShow" class="widget-item" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
import WeatherWidget from '@/components/weather/WeatherWidget.vue'
import TodoList from '@/components/todo/TodoList.vue'

const settingStore = useSettingStore()
const { weatherShow, todoShow } = storeToRefs(settingStore)
</script>

<style lang="less" scoped>
.widget {
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: 270px;

  &-item {
    margin-bottom: 16px;
  }
}
</style>
