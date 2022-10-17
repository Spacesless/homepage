<template>
  <div class="widget">
    <WeatherWidget class="widget-item" />
    <TodoList class="widget-item" />
  </div>
</template>

<script lang="ts" setup>
import WeatherWidget from '@/components/weather/WeatherWidget.vue'
import TodoList from '@/components/todo/TodoList.vue'
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
