<template>
  <a-dropdown :trigger="['contextmenu']">
    <div ref="el">
      <slot />
    </div>

    <template #overlay>
      <a-menu>
        <a-menu-item key="refresh">设置</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)

const { x, y } = useDraggable(el)
console.log(x, y)
</script>
