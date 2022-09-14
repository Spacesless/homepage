<template>
  <div class="desktop">
    <div v-for="item in iconList" :key="item.url" class="desktop-item" @dblclick="gotoUrl(item.url)">
      <a-dropdown :trigger="['contextmenu']">
        <div>
          <img class="desktop-item__icon" :src="getIconUrl(item.url)" :alt="item.name" />
          <p class="desktop-item__name">{{ item.name }}</p>
        </div>

        <template #overlay>
          <a-menu>
            <a-menu-item key="1">打开</a-menu-item>
            <a-menu-item key="2" @click="settingIcon">编辑</a-menu-item>
            <a-menu-item key="3" @click="handleDelete(item)">删除</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { useSettingStore, Icon } from '@/store/setting'

const settingStore = useSettingStore()

const iconList = ref(settingStore.desktopIcon)
const modelVisible = ref<boolean>(false)

/**
 * 获取图标地址
 */
const getIconUrl = (url: string): string => {
  const name = url.replace(/http(s)?:|\//g, '').replace(/\./g, '-')
  return `assets/img/icon/${name}.png`
}

const settingIcon = () => {
  modelVisible.value = true
}

const handleDelete = (record: Icon) => {
  Modal.confirm({
    title: '提示',
    content: '此操作会删除该图标，是否继续？',
    centered: true,
    onOk: () => {
      const findIndex = settingStore.desktopIcon.findIndex(item => item.url === record.url)
      settingStore.desktopIcon.splice(findIndex, 1)
    }
  })
}

const gotoUrl = (link: string, self: boolean = false) => {
  if (!link.startsWith('http://') && !link.startsWith('https://')) {
    link = 'http://' + link
  }
  if (self) {
    window.location.href = link
  } else {
    window.open(link)
  }
}
</script>

<style lang="less" scoped>
.desktop {
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &-item {
    width: 90px;
    padding: 16px 5px 0;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    cursor: pointer;
    pointer-events: auto;

    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: 4px;
    }

    &__name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:hover {
      color: @primary-color;
    }
  }
}
</style>
