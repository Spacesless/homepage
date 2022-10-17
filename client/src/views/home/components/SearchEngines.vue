<template>
  <div class="search" :class="{ 'search--active': isFocus }">
    <a-dropdown :trigger="['contextmenu']">
      <a-input-group class="search-input" compact>
        <a-input
          v-model:value="keyword"
          allow-clear
          class="search-keyword"
          size="large"
          @keyup.enter="handleSearch"
          @focus="isFocus = true"
          @blur="isFocus = false"
        />
        <a-select v-model:value="engine" class="search-engine" size="large" @change="changeEngine">
          <a-select-option v-for="item in engineOptions" :key="item.value">{{ item.label }}</a-select-option>
        </a-select>
      </a-input-group>

      <template #overlay>
        <a-menu>
          <a-menu-item key="1">设置</a-menu-item>
          <a-menu-item key="2">关闭</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSettingStore } from '@/store/setting'

const settingStore = useSettingStore()

const engineOptions = ref([
  {
    value: 'baidu',
    label: '百度',
    url: 'https://www.baidu.com/s?wd='
  },
  {
    value: 'bing',
    label: '必应',
    url: 'https://cn.bing.com/search?q='
  },
  {
    value: 'google',
    label: '谷歌'
  },
  {
    value: 'bilibili',
    label: 'Bilibili',
    url: 'https://search.bilibili.com/all?keyword='
  },
  {
    value: 'toutiao',
    label: '头条',
    url: 'https://so.toutiao.com/search?dvpf=pc&keyword='
  }
])

const engine = ref<string>(settingStore.searchEngine)
const keyword = ref<string>('')
const isFocus = ref<boolean>(false)

const searchUrl = computed(() => {
  const findEngine = engineOptions.value.find(item => item.value === engine.value)
  return findEngine ? findEngine.url + keyword.value : ''
})

const handleSearch = () => {
  searchUrl.value && window.open(searchUrl.value)
}

const changeEngine = (val: string) => {
  settingStore.searchEngine = val
}
</script>

<style lang="less" scoped>
.search {
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 100%;
  transition: background 0.3s;
  pointer-events: none;

  &--active {
    background: rgba(0, 0, 0, 0.65);
    pointer-events: auto;
  }

  &-input {
    position: absolute;
    top: 15%;
    left: 32%;
    width: 36%;
    pointer-events: auto;
  }

  @engine-width: 90px;

  &-engine {
    width: @engine-width;
  }

  &-keyword {
    width: calc(100% - @engine-width);
  }
}
</style>
