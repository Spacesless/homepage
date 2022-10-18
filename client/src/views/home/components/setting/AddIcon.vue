<template>
  <a-modal v-model:visible="visible" title="图标设置" :centered="true" width="76%" :footer="null" @cancel="handleClose">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.name">
        <ul class="icon-list">
          <li
            v-for="child in item.data"
            :key="child.url"
            class="icon-item"
            :class="getIconActive(child.url)"
            @click="selectIcon(child)"
          >
            <img :src="getIconUrl(child.url)" class="icon-item__picture" :alt="child.name" />
            <p class="icon-item__name">{{ child.name }}</p>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
    <a-divider orientation="left" orientation-margin="16px">自定义图标</a-divider>
    <a-form :model="formState" layout="inline" @finish="handleCreate">
      <a-input-group compact>
        <a-form-item name="name" style="width: 30%" :rules="[{ required: true, message: '请输入网站名称' }]">
          <a-input v-model:value="formState.name" placeholder="请输入网站名称" />
        </a-form-item>
        <a-form-item
          name="url"
          style="width: calc(70% - 100px)"
          :rules="[
            { required: true, message: '请输入网址' },
            { type: 'url', message: '请输入正确的网址' }
          ]"
        >
          <a-input v-model:value="formState.url" placeholder="请输入网址" />
        </a-form-item>
        <a-button type="primary" style="width: 100px" html-type="submit">添加</a-button>
      </a-input-group>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useSettingStore, Icon } from '@/store/setting'
import iconList from '@/assets/json/icon'

interface FormState {
  name: string
  url: string
}

const settingStore = useSettingStore()

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const activeKey = ref<string>(iconList[0].key)
const tabList = ref(iconList)
const formState = reactive<FormState>({
  name: '',
  url: ''
})

const visible = computed(() => props.modelVisible)
const desktopIconUrls = computed(() => settingStore.desktopIcon.map(item => item.url))

watch(visible, isShow => {
  if (isShow) {
  }
})

const handleClose = () => {
  emit('update:modelVisible', false)
}

const handleCreate = () => {
  settingStore.desktopIcon.push({
    name: formState.name,
    url: formState.url
  })
}

const getIconActive = (url: string): string => {
  const isActive = desktopIconUrls.value.includes(url)
  return isActive ? 'icon-item--active' : ''
}

const selectIcon = (icon: Icon) => {
  const findIcon = settingStore.desktopIcon.findIndex(item => item.url === icon.url)
  if (findIcon === -1) {
    settingStore.desktopIcon.push(icon)
  } else {
    settingStore.desktopIcon.splice(findIcon, 1)
  }
}

/**
 * 获取图标地址
 */
const getIconUrl = (url: string): string => {
  const name = url.replace(/http(s)?:|\//g, '').replace(/\./g, '.')
  return `assets/img/icon/${name}.png`
}
</script>

<style lang="less" scoped>
.icon {
  &-list {
    display: flex;
    flex-wrap: wrap;
  }

  &-item {
    width: 112px;
    margin-right: 16px;
    padding: 16px;
    text-align: center;
    cursor: pointer;

    &__picture {
      width: 64px;
      margin-bottom: 8px;
    }

    &--active {
      background: rgba(@primary-color, 0.1);
    }
  }
}
</style>
