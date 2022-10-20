<template>
  <div class="search" :class="{ 'search--active': isFocus }">
    <AppWidget :close-key="WidgetShow.search" :is-show-config="true">
      <a-input-group class="search-input" compact>
        <a-input
          ref="inputRef"
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
    </AppWidget>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useSettingStore } from '@/store/setting'
import AppWidget from '@/components/AppWidget.vue'
import { WidgetShow } from '@/types/enums'

const settingStore = useSettingStore()

const engineOptions = ref([
  {
    value: 'baidu',
    label: '百度一下',
    url: 'https://www.baidu.com/s?wd='
  },
  {
    value: 'bing',
    label: '必应搜索',
    url: 'https://cn.bing.com/search?q='
  },
  {
    value: 'google',
    label: '谷歌搜索',
    url: 'https://www.google.com/search?q='
  },
  {
    value: 'bilibili',
    label: '哔哩哔哩',
    url: 'https://search.bilibili.com/all?keyword='
  },
  {
    value: 'toutiao',
    label: '头条搜索',
    url: 'https://so.toutiao.com/search?dvpf=pc&keyword='
  }
])

const engine = ref<string>(settingStore.searchEngine)
const keyword = ref<string>('')
const isFocus = ref<boolean>(false)
const inputRef = ref()

const searchUrl = computed(() => {
  const findEngine = engineOptions.value.find(item => item.value === engine.value)
  return findEngine ? findEngine.url + keyword.value : ''
})

onMounted(() => {
  inputRef.value.focus()
  nextTick(() => {
    isFocus.value = false
  })
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
    box-shadow: 0 6px 16px 8px rgba(0, 0, 0, 0.16), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
      0 12px 48px 16px rgba(0, 0, 0, 0.03);
    pointer-events: auto;
  }

  @engine-width: 108px;

  &-engine {
    width: @engine-width;
  }

  &-keyword {
    width: calc(100% - @engine-width);
  }
}
</style>
