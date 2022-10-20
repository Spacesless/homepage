import { defineStore } from 'pinia'
import { GetSetting, CreateSetting, UpdateSetting } from '@/api/setting'

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
  engineList: Array<Icon>
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
      engineList: [],
      weatherShow: false,
      todoShow: false
    }
  },
  actions: {
    getSetting() {
      GetSetting().then(res => {
        console.log(res.data)
      })
    },
    storeSetting() {
      CreateSetting(this.$state).then(res => {
        console.log(res.data)
      })
    },
    updateSetting(setting: object) {
      UpdateSetting(setting).then(res => {
        console.log(res.data)
      })
    }
  }
})
