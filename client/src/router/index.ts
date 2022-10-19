import * as VueRouter from 'vue-router'

const routes: VueRouter.RouteRecordRaw[] = [
  { path: '/', component: () => import('@/views/home/IndexPage.vue') },
  {
    path: '/register',
    component: () => import('@/views/user/UserRegister.vue'),
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/forgot',
    component: () => import('@/views/user/UserForgot.vue'),
    meta: {
      title: '找回密码'
    }
  }
]

// 路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router
