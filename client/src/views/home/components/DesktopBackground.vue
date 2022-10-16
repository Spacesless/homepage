<template>
  <a-dropdown :trigger="['contextmenu']">
    <div class="background" :style="'background-image: url(' + settingStore.background + ')'"></div>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="refresh">
          <reload-outlined class="menu-item__icon" />
          <span>刷新</span>
        </a-menu-item>
        <a-menu-item key="icon">
          <setting-outlined class="menu-item__icon" />
          <span>图标设置</span>
        </a-menu-item>
        <a-menu-item key="toggle-icon">
          <eye-invisible-outlined class="menu-item__icon" />
          <span>{{ iconShow ? '隐藏' : '显示' }}图标</span>
        </a-menu-item>
        <a-menu-item key="wallpaper">
          <picture-outlined class="menu-item__icon" />
          <span>壁纸设置</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <AddIcon v-model:modelVisible="iconVisible" />
  <!-- 壁纸设置 -->
  <SettingWallpaper v-model:modelVisible="wallpaperVisible" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSettingStore } from '@/store/setting'
import type { MenuProps } from 'ant-design-vue'
import SettingWallpaper from './setting/SettingWallpaper.vue'
import AddIcon from './setting/AddIcon.vue'

const settingStore = useSettingStore()

const iconVisible = ref<boolean>(false)
const wallpaperVisible = ref<boolean>(false)

const iconShow = computed(() => settingStore.iconShow)

const handleMenuClick: MenuProps['onClick'] = e => {
  switch (e.key) {
    case 'icon':
      return addIcon()
    case 'toggle-icon':
      settingStore.iconShow = !settingStore.iconShow
      return
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
