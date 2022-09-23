import { defineStore } from 'pinia'

export interface Icon {
  name: string
  url: string
}

interface State {
  background: string
  desktopIcon: Array<Icon>
  iconShow: boolean
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useSettingStore = defineStore('setting', {
  persist: true,
  state: (): State => {
    return {
      background: '',
      desktopIcon: [],
      iconShow: true
    }
  },
  actions: {
    getSetting() {},
    setBackground(value: string) {
      this.background = value
    }
  }
})
