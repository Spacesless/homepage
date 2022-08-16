<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '@/plugins/axios';

const bing = {
  key: 'bing',
  name: '必应'
}

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
const pictureList = ref([])

const handleClose = () => {
  emit('update:modelVisible', false)
}

const fetchAblumList = () => {
  GetWallpaper('wallpaper/album').then((res) => {
    const data = (res?.data || []).map((item: any) => {
      return {
        key: item.album_id,
        name: item.album_name
      }
    })
    albumList.value = [
      bing,
      ...data
    ]
  })
}

const fetchBingList = async() => {
  listLoading.value = true
  await GetWallpaper('bing/list', listQuery).then((res: any) => {
    const { count, data } = res.data
    total.value = count
    data.forEach((item: any) => {
      item.thumb = `https://cn.bing.com${item.urlbase}_400x240.jpg`
    })
    pictureList.value = data
  }).catch(() => {})
  listLoading.value = false
}

const fetchWallpaperList = async() => {
  listLoading.value = true
  await GetWallpaper('wallpaper/list', listQuery).then((res: any) => {
    const { count, data } = res.data
    total.value = count
    data.forEach((item: any) => {
      const urlSplit = item.url.split('.')
      urlSplit.splice(-1, 0, 'md')
      const thumb = urlSplit.join('.')
      item.thumb = thumb
    })
    pictureList.value = data
  }).catch(() => {})
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
</script>

<template>
  <a-modal v-model:visible="visible" @cancel="handleClose">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>