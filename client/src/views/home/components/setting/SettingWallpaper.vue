<template>
  <a-modal v-model:visible="visible" title="壁纸设置" :centered="true" width="76%" :footer="null" @cancel="handleClose">
    <a-tabs v-model:activeKey="activeKey" type="card" @change="fetchList">
      <a-tab-pane v-for="item in albumList" :key="item.key" :tab="item.name"></a-tab-pane>
    </a-tabs>
    <a-row class="wallpaper">
      <a-col
        v-for="item in pictureList"
        :key="item.thumb"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
        class="wallpaper-item"
        @click="setBackground(item.url)"
      >
        <img :src="item.thumb" class="wallpaper-item__thumb" :alt="item.title" />
        <p class="wallpaper-item__title">{{ item.title }}</p>
      </a-col>
    </a-row>

    <a-pagination v-model:current="listQuery.page" v-model:pageSize="listQuery.pageSize" :total="total" />

    <a-divider orientation="left" orientation-margin="16px">自定义壁纸</a-divider>
    <a-input-group compact>
      <a-input v-model:value="customUrl" style="width: calc(100% - 64px)" placeholder="请输入图片地址" />
      <a-button type="primary" @click="setBackground(customUrl)">确定</a-button>
    </a-input-group>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import axios from '@/plugins/axios'
import { useSettingStore } from '@/store/setting'

interface Album {
  key: string
  name: string
}

interface QueryParam {
  page: number
  pageSize: number
  album?: string
}

const bing: Album = {
  key: 'bing',
  name: '必应'
}

const settingStore = useSettingStore()

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const loading = ref<boolean>(false)
const albumList = ref<Array<Album>>([])
const listLoading = ref<boolean>(false)
const listQuery = reactive<QueryParam>({
  page: 1,
  pageSize: 18
})
const total = ref(0)
const pictureList = ref<any>([])
const activeKey = ref<string>('bing')
const customUrl = ref<string>('')

const visible = computed(() => props.modelVisible)

watch(visible, isShow => {
  if (isShow) {
    if (!albumList.value.length) {
      fetchAblumList()
    }
    if (!pictureList.value.length) {
      fetchList()
    }
  }
})

watch(listQuery, () => {
  fetchList()
})

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

const fetchList = () => {
  if (activeKey.value === 'bing') {
    fetchBingList()
  } else {
    const findAblum = albumList.value.find(item => item.key === activeKey.value)
    listQuery.album = findAblum?.name || ''
    fetchWallpaperList()
  }
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
    withCredentials: false,
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
  settingStore.background = url
}
</script>

<style lang="less" scoped>
.wallpaper {
  &-item {
    cursor: pointer;

    &__thumb {
      width: 100%;
      height: 130px;
      object-fit: cover;
    }
  }
}
</style>
