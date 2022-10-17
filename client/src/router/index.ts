import * as VueRouter from 'vue-router'

const routes: VueRouter.RouteRecordRaw[] = [
  { path: '/', component: () => import('@/views/home/IndexPage.vue') },
  { path: '/register', component: () => import('@/views/user/UserRegister.vue') },
  { path: '/forgot', component: () => import('@/views/user/UserForgot.vue') }
]

// 路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

export default router
