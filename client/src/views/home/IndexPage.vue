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
import { watch } from 'vue'
import { debounce } from 'lodash'
import { Modal } from 'ant-design-vue'

import { useUserStore } from '@/store/user'
import { useSettingStore } from '@/store/setting'
import DesktopBackground from './components/DesktopBackground.vue'
import DesktopIcon from './components/DesktopIcon.vue'
import SearchEngines from './components/SearchEngines.vue'
import DesktopWidget from './components/DesktopWidget.vue'
import TaskBar from './components/TaskBar.vue'

const userStore = useUserStore()
const settingStore = useSettingStore()
const { iconShow, searchShow } = storeToRefs(settingStore)
const { userId } = storeToRefs(userStore)

watch(
  settingStore.$state,
  (newVal, oldValue) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldValue)) {
      updateStore(newVal)
    }
  },
  { deep: true }
)

watch(
  userId,
  async id => {
    if (id) {
      const res = await settingStore.getSetting(false)
      if (JSON.stringify(res) !== JSON.stringify(settingStore.$state)) {
        Modal.confirm({
          title: '数据同步',
          content: '本地配置和云端配置不一致，确认使用云端配置，取消则同步本地配置到云端',
          centered: true,
          onOk() {
            settingStore.$state = res
          },
          onCancel() {
            settingStore.updateSetting(settingStore.$state)
          }
        })
      }
    }
  },
  {
    immediate: true
  }
)

const updateStore = debounce(data => {
  settingStore.updateSetting(data)
}, 200)
</script>

<style lang="less" scoped>
@import './index.less';
</style>
