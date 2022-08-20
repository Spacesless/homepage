<template>
  <a-dropdown :trigger="['contextmenu']">
    <div
      class="background"
      :style="'background-image: url(' + configStore.background + ')'"
    ></div>

    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="wallpaper">壁纸设置</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

  <SettingWallpaper v-model="modelVisible" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useConfigStore } from "@/store/config";
import type { MenuProps } from "ant-design-vue";
import SettingWallpaper from "./setting/SettingWallpaper.vue";

const modelVisible = ref<boolean>(false);

const configStore = useConfigStore();

const handleMenuClick: MenuProps["onClick"] = (e) => {
  switch (e.key) {
    case "wallpaper":
      return settingWallpaper();
  }
};

const settingWallpaper = () => {
  modelVisible.value = true;
};
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
