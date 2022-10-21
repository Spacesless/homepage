import axios from 'axios'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

const csrftoken = Cookies.get('csrfToken')

// 自定义 axios 实例
const myAxios = axios.create({
  baseURL: '/api',
  headers: {
    'x-csrf-token': csrftoken || ''
  }
})

myAxios.defaults.withCredentials = true

// 添加请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    if (response.data.success) {
      // 对响应数据做点什么
      return response.data
    }

    return Promise.reject(response.data)
  },
  function (error) {
    const errorString = error.toString()
    console.log(errorString) // for debug

    const { data } = error.response || {}

    let errorEsg = data?.msg

    if (errorString.includes('timeout')) {
      errorEsg = '请求超时，请稍后重试'
    } else if (errorString.includes('Network Error')) {
      errorEsg = '网络错误，请稍后重试'
    }

    errorEsg &&
      message.error({
        key: 'fail',
        content: errorEsg
      })

    // 对响应错误做点什么
    return Promise.reject(data || error)
  }
)

export default myAxios
