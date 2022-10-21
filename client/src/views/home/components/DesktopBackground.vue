<template>
  <a-dropdown :trigger="['contextmenu']">
    <div class="background" :style="'background-image: url(' + settingStore.background + ')'"></div>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="refresh">
          <reload-outlined class="menu-item__icon" />
          <span>刷新</span>
        </a-menu-item>

        <a-menu-divider />

        <a-menu-item key="toggle-icon">
          <eye-invisible-outlined class="menu-item__icon" />
          <span>{{ iconShow ? '隐藏' : '显示' }}图标</span>
        </a-menu-item>
        <a-menu-item key="icon">
          <setting-outlined class="menu-item__icon" />
          <span>图标设置</span>
        </a-menu-item>

        <a-menu-divider />

        <a-menu-item key="wallpaper">
          <picture-outlined class="menu-item__icon" />
          <span>壁纸设置</span>
        </a-menu-item>
        <a-menu-item key="widget">
          <appstore-outlined class="menu-item__icon" />
          <span>桌面小部件</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <!-- 图标设置 -->
  <AddIcon v-model:modelVisible="iconVisible" />
  <!-- 壁纸设置 -->
  <SettingWallpaper v-model:modelVisible="wallpaperVisible" />
  <!-- 桌面小组件 -->
  <SettingWidget v-model:modelVisible="widgetVisible" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSettingStore } from '@/store/setting'
import type { MenuProps } from 'ant-design-vue'
import AddIcon from './setting/AddIcon.vue'
import SettingWallpaper from './setting/SettingWallpaper.vue'
import SettingWidget from './setting/SettingWidget.vue'

const settingStore = useSettingStore()

const iconVisible = ref<boolean>(false)
const wallpaperVisible = ref<boolean>(false)
const widgetVisible = ref<boolean>(false)

const iconShow = computed(() => settingStore.iconShow)

const handleMenuClick: MenuProps['onClick'] = e => {
  switch (e.key) {
    case 'refresh':
      settingStore.getSetting()
      settingStore.iconShow = false
      setTimeout(() => {
        settingStore.iconShow = true
      }, 0)
      break
    case 'icon':
      iconVisible.value = true
      break
    case 'toggle-icon':
      settingStore.iconShow = !settingStore.iconShow
      break
    case 'wallpaper':
      wallpaperVisible.value = true
      break
    case 'widget':
      widgetVisible.value = true
      break
  }
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
