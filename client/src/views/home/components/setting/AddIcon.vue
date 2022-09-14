<template>
  <a-modal v-model:visible="visible" title="添加图标" :centered="true" width="76%" :footer="null" @cancel="handleClose">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.name">
        <ul class="icon-list">
          <li v-for="child in item.data" :key="child.url" class="icon-item" @click="selectIcon(child)">
            <img :src="getIconUrl(child.url)" class="icon-item__picture" :alt="child.name" />
            <p class="icon-item__name">{{ child.name }}</p>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
    <a-divider orientation="left" orientation-margin="16px">自定义图标</a-divider>
    <a-input-group compact>
      <a-input v-model:value="name" style="width: 30%" />
      <a-input v-model:value="website" style="width: calc(70% - 64px)" />
      <a-button type="primary" @click="handleCreate">添加</a-button>
    </a-input-group>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSettingStore, Icon } from '@/store/setting'
import iconList from '@/assets/json/icon'

const settingStore = useSettingStore()

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const name = ref<string>('')
const website = ref<string>('')
const activeKey = ref<string>(iconList[0].key)
const tabList = ref(iconList)

const visible = computed(() => props.modelVisible)

watch(visible, isShow => {
  if (isShow) {
  }
})

const handleClose = () => {
  emit('update:modelVisible', false)
}

const handleCreate = () => {}

const selectIcon = (icon: Icon) => {
  const findIcon = settingStore.desktopIcon.find(item => item.url === icon.url)
  if (!findIcon) {
    settingStore.desktopIcon.push(icon)
  }
}

/**
 * 获取图标地址
 */
const getIconUrl = (url: string): string => {
  const name = url.replace(/http(s)?:|\//g, '').replace(/\./g, '-')
  return `assets/img/icon/${name}.png`
}
</script>

<style lang="less" scoped>
.icon {
  &-list {
    display: flex;
  }

  &-item {
    padding: 16px;
    text-align: center;
    cursor: pointer;

    &__picture {
      width: 64px;
      margin-bottom: 8px;
    }
  }
}
</style>
