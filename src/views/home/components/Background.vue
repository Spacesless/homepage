<script setup lang="ts">
import { useConfigStore } from '@/store/config'
import type { MenuProps } from 'ant-design-vue';

const configStore = useConfigStore()

const handleMenuClick: MenuProps['onClick'] = e => {
  switch(e.key) {
    case 'wallpaper':
      return settingWallpaper()
  }
}

const settingWallpaper = () => {

}
</script>

<template>
  <a-dropdown :trigger="['contextmenu']">
    <div class="background" :style="'background-image: url(' + configStore.background + ')'"></div>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="wallpaper">壁纸设置</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped>
.background{
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
