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
      background: '',
      desktopIcon: [],
      iconShow: true,
      searchEngine: 'baidu',
      searchShow: true,
      engineList: [],
      weatherShow: true,
      todoShow: true
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
