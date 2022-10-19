<template>
  <a-modal v-model:visible="visible" title="搜索引擎" :centered="true" @cancel="handleClose">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const visible = computed(() => props.modelVisible)

const handleClose = () => {
  emit('update:modelVisible', false)
}
</script>
