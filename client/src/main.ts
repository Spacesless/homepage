import { createApp } from 'vue'
import 'ant-design-vue/es/message/style/css'
import router from './router'
import App from './App.vue'
import './middleware/router-guard'
import './styles/index.less'

import pinia from './store'

const app = createApp(App)

// 路由
app.use(router)
// 状态管理
app.use(pinia)

app.mount('#app')
