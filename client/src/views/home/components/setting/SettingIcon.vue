<template>
  <a-modal v-model:visible="visible" @cancel="handleClose">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const visible = ref<boolean>(props.modelVisible)

const handleClose = () => {
  emit('update:modelVisible', false)
}
</script>
