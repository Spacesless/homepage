<template>
  <a-modal v-model:visible="visible" @cancel="handleClose">
    <a-input-group compact>
      <a-input v-model:value="name" />
      <a-input v-model:value="website" />
      <a-button type="primary" @click="handleCreate">添加</a-button>
    </a-input-group>

    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.name">
        <ul>
          <li v-for="child in item.data" :key="child.url" @click="selectIcon">
            <img :src="getIconUrl(child.url)" :alt="child.name" />
            <p>{{ child.name }}}</p>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import iconList from '@/assets/json/icon'

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const visible = ref<boolean>(props.modelVisible)
const name = ref<string>('')
const website = ref<string>('')
const activeKey = ref<string>('')
const tabList = ref(iconList)

const handleClose = () => {
  emit('update:modelVisible', false)
}

const handleCreate = () => {}

const selectIcon = () => {}

/**
 * 获取图标地址
 */
const getIconUrl = (url: string): string => {
  const name = url.replace(/http(s)?:|\//g, '').replace(/\./g, '-')
  return `assets/img/icon/${name}.png`
}
</script>
