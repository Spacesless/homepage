<template>
  <a-modal v-model:visible="visible" title="桌面小组件" :centered="true" :footer="null" @cancel="handleClose">
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="桌面图标">
        <a-switch v-model:checked="iconShow" />
      </a-form-item>
      <a-form-item label="搜索引擎">
        <a-switch v-model:checked="searchShow" />
      </a-form-item>
      <a-form-item label="天气预报">
        <a-switch v-model:checked="weatherShow" />
      </a-form-item>
      <a-form-item label="TodoList">
        <a-switch v-model:checked="todoShow" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'

const settingStore = useSettingStore()

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const { iconShow, searchShow, weatherShow, todoShow } = storeToRefs(settingStore)

const visible = computed(() => props.modelVisible)

const handleClose = () => {
  emit('update:modelVisible', false)
}
</script>
