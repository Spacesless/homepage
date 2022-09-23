<template>
  <div v-if="iconShow" id="desktop" class="desktop">
    <div v-for="item in iconList" :key="item.url" class="desktop-item" @dblclick="gotoUrl(item.url)">
      <a-dropdown :trigger="['contextmenu']">
        <div>
          <img class="desktop-item__icon" :src="getIconUrl(item.url)" :alt="item.name" />
          <p class="desktop-item__name">{{ item.name }}</p>
        </div>

        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="gotoUrl(item.url)">打开</a-menu-item>
            <a-menu-item key="2" @click="settingIcon">编辑</a-menu-item>
            <a-menu-item key="3" @click="handleDelete(item)">删除</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'ant-design-vue'
import Sortable from 'sortablejs'
import { useSettingStore, Icon } from '@/store/setting'

const settingStore = useSettingStore()
const iconShow = settingStore.iconShow

const iconList = ref(settingStore.desktopIcon)
const modelVisible = ref<boolean>(false)

onMounted(() => {
  const el = document.getElementById('desktop')
  if (el) {
    const sortableInstance = new Sortable(el, {
      onEnd: ({ oldIndex, newIndex }) => {
        const targetIcon = iconList.value.splice(oldIndex || -1, 1)[0]
        settingStore.desktopIcon.splice(newIndex || -1, 0, targetIcon)
      }
    })
  }
})

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
    width: 100px;
    margin-top: 24px;
    margin-bottom: 8px;
    padding: 0 8px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    cursor: pointer;
    pointer-events: auto;

    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }

    &__name {
      overflow: hidden;
      color: #ffffff;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-shadow: 0 1px 4px #000000;
    }

    &:hover {
      color: @primary-color;
    }
  }
}
</style>
