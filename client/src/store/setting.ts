import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { GetSetting, CreateSetting, UpdateSetting } from '@/api/setting'
import { useUserStore } from './user'

const userStore = useUserStore()

export interface Icon {
  name: string
  url: string
}

interface State {
  background: string
  desktopIcon: Array<Icon>
  iconShow: boolean
  searchEngine: string
  searchShow: boolean
  weatherShow: boolean
  todoShow: boolean
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useSettingStore = defineStore('setting', {
  persist: true,
  state: (): State => {
    return {
      background: 'http://img.timelessq.com/images/2021/11/18/28e8f42625ab99cf3.jpg',
      desktopIcon: [
        { name: '哔哩哔哩', url: 'https://www.bilibili.com' },
        { name: '腾讯视频', url: 'https://v.qq.com' },
        { name: '网易云音乐', url: 'https://music.163.com' }
      ],
      iconShow: true,
      searchEngine: 'baidu',
      searchShow: true,
      weatherShow: false,
      todoShow: false
    }
  },
  actions: {
    getSetting(isForce: boolean = true) {
      if (!userStore.userId) {
        return Promise.resolve()
      }

      return GetSetting().then(res => {
        const data = res.data || {}

        if (isForce) {
          this.$state = data
        }

        return data
      })
    },
    storeSetting() {
      CreateSetting(this.$state).catch(() => {
        message.error({
          key: 'fail',
          content: '云端存储配置失败'
        })
      })
    },
    updateSetting(setting: object) {
      console.log(setting)
      if (!userStore.userId) {
        return
      }
      UpdateSetting(userStore.userId, setting).catch(() => {
        message.error({
          key: 'fail',
          content: '云端存储配置失败'
        })
      })
    }
  }
})
