<template>
  <a-modal v-model:visible="visible" @cancel="handleClose">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in albumList" :key="item.key" :tab="item.name"></a-tab-pane>
    </a-tabs>
    <ul>
      <li v-for="item in pictureList" :key="item.url" @click="setBackground(item.url)">
        <img :src="item.url" :alt="item.name" />
        <p>{{ item.name }}}</p>
      </li>
    </ul>
    <p>自定义壁纸</p>
    <a-input-group compact>
      <a-input v-model:value="customUrl" style="width: calc(100% - 200px)" />
      <a-button type="primary" @click="setBackground(customUrl)">确定</a-button>
    </a-input-group>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '@/plugins/axios'
import { useConfigStore } from '@/store/config'

const bing = {
  key: 'bing',
  name: '必应'
}

const configStore = useConfigStore()

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const visible = ref<boolean>(props.modelVisible)
const loading = ref<boolean>(false)
const albumList = reactive<any>([])
const listLoading = ref<boolean>(false)
const listQuery = reactive({
  page: 1,
  pageSize: 10
})
const total = ref(0)
const pictureList = ref<any>([])
const activeKey = ref<string>('bing')
const customUrl = ref<string>('')

const handleClose = () => {
  emit('update:modelVisible', false)
}

const fetchAblumList = () => {
  GetWallpaper('wallpaper/album').then(res => {
    const data = (res?.data || []).map((item: any) => {
      return {
        key: item.album_id,
        name: item.album_name
      }
    })
    albumList.value = [bing, ...data]
  })
}

const fetchBingList = async () => {
  listLoading.value = true
  await GetWallpaper('bing/list', listQuery)
    .then((res: any) => {
      const { count, data } = res.data
      total.value = count
      data.forEach((item: any) => {
        item.thumb = `https://cn.bing.com${item.urlbase}_400x240.jpg`
      })
      pictureList.value = data
    })
    .catch(() => {})
  listLoading.value = false
}

const fetchWallpaperList = async () => {
  listLoading.value = true
  await GetWallpaper('wallpaper/list', listQuery)
    .then((res: any) => {
      const { count, data } = res.data
      total.value = count
      data.forEach((item: any) => {
        const urlSplit = item.url.split('.')
        urlSplit.splice(-1, 0, 'md')
        const thumb = urlSplit.join('.')
        item.thumb = thumb
      })
      pictureList.value = data
    })
    .catch(() => {})
  listLoading.value = false
}

const GetWallpaper = (url: string, params?: object) => {
  loading.value = true
  return axios({
    url: 'https://api.timelessq.com/' + url,
    method: 'get',
    params
  }).catch(() => {
    loading.value = false
  })
}

/**
 * 设置壁纸
 * @param url 壁纸图片地址
 */
const setBackground = (url: string) => {
  configStore.setBackground(url)
}
</script>
