import { defineStore } from 'pinia'
import md5 from 'md5'
import { UserLogin, LoginParams, UserLogout } from '@/api/user'

interface State {
  username: string
  userId: number
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
  persist: true,
  state: (): State => {
    return {
      username: '',
      userId: 0
    }
  },
  actions: {
    login(data: LoginParams) {
      const { username, password } = data
      return UserLogin({
        username: username.toString().trim(),
        password: md5(password)
      }).then(res => {
        const { id, username } = res.data
        this.userId = id
        this.username = username
      })
    },

    logout() {
      return UserLogout().then(res => {
        this.userId = 0
        this.username = ''
      })
    }
  }
})
