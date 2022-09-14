<template>
  <a-dropdown :trigger="['contextmenu']">
    <div class="background" :style="'background-image: url(' + settingStore.background + ')'"></div>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="icon">添加图标</a-menu-item>
        <a-menu-item key="wallpaper">壁纸设置</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <AddIcon v-model:modelVisible="iconVisible" />
  <!-- 壁纸设置 -->
  <SettingWallpaper v-model:modelVisible="wallpaperVisible" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingStore } from '@/store/setting'
import type { MenuProps } from 'ant-design-vue'
import SettingWallpaper from './setting/SettingWallpaper.vue'
import AddIcon from './setting/AddIcon.vue'

const iconVisible = ref<boolean>(false)
const wallpaperVisible = ref<boolean>(false)

const settingStore = useSettingStore()

const handleMenuClick: MenuProps['onClick'] = e => {
  switch (e.key) {
    case 'icon':
      return addIcon()
    case 'wallpaper':
      return settingWallpaper()
  }
}

const addIcon = () => {
  iconVisible.value = true
}

const settingWallpaper = () => {
  wallpaperVisible.value = true
}
</script>

<style lang="less" scoped>
.background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
