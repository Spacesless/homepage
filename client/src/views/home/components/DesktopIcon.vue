<template>
  <div v-if="iconShow" id="desktop" class="desktop">
    <div v-for="(item, index) in iconList" :key="index" class="desktop-item" @dblclick="gotoUrl(item.url)">
      <a-dropdown :trigger="['contextmenu']">
        <div>
          <a-image
            class="desktop-item__icon"
            :width="50"
            :height="50"
            :src="getIconUrl(item.url)"
            :fallback="getFallback(item.name)"
            :preview="false"
            :alt="item.name"
          />
          <p class="desktop-item__name">{{ item.name }}</p>
        </div>

        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="gotoUrl(item.url)">打开</a-menu-item>
            <a-menu-item key="2" @click="settingIcon(index)">编辑</a-menu-item>
            <a-menu-item key="3" @click="handleDelete(item)">删除</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <SettingIcon v-model:modelVisible="settingVisible" :edit-index="editIndex" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Modal } from 'ant-design-vue'
import Sortable from 'sortablejs'
import { useSettingStore, Icon } from '@/store/setting'
import SettingIcon from './setting/SettingIcon.vue'

const settingStore = useSettingStore()

const iconList = ref(settingStore.desktopIcon)
const settingVisible = ref<boolean>(false)
const editIndex = ref<number>()

const iconShow = computed(() => settingStore.iconShow)

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
  const name = url.replace(/http(s)?:|\//g, '').replace(/\./g, '.')
  return `assets/img/icon/${name}.png`
}

const iconColors: Array<string> = [
  '#f5222d',
  '#fa541c',
  '#fa8c16',
  '#13c2c2',
  '#1890ff',
  '#2f54eb',
  '#722ed1',
  '#eb2f96'
]
const colorLen = iconColors.length
const getFallback = (name: string): string => {
  const canvasEl = document.createElement('canvas')
  const ctx = canvasEl.getContext('2d')

  canvasEl.width = 50
  canvasEl.height = 50

  const r = 10
  const x = 0
  const y = 0
  const w = 50
  const h = 50

  if (ctx) {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.fill()
    ctx.closePath()

    ctx.font = '28px normal Microsoft yahei'
    ctx.fillStyle = iconColors[name.charCodeAt(0) % colorLen]
    ctx.textAlign = 'center'
    const str = name.substring(0, 1)
    ctx.fillText(str, 24, 35)
  }

  return canvasEl.toDataURL()
}

const settingIcon = (index: number) => {
  editIndex.value = index
  settingVisible.value = true
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
  top: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  width: 100%;
  pointer-events: none;

  &-item {
    width: 92px;
    margin: 8px;
    padding: 12px 0 8px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    pointer-events: auto;

    &__name {
      padding-top: 8px;
      overflow: hidden;
      color: #ffffff;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-shadow: 0 1px 4px #000000;
    }

    &:hover {
      background-color: rgba(#ffffff, 0.2);
    }
  }
}
</style>
