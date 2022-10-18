import { defineStore } from 'pinia'
import { UserLogin, LoginParams, UserLogout } from '@/api/user'

interface State {
  username: string
  userId: number
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      username: '',
      userId: 0
    }
  },
  actions: {
    login(data: LoginParams) {
      return UserLogin(data)
        .then(res => {})
        .catch(() => {})
    },

    logout() {
      return UserLogout()
        .then(res => {})
        .catch(() => {})
    }
  }
})
