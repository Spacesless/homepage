import * as VueRouter from "vue-router";
import IndexPage from "../views/home/IndexPage.vue";
import AdminLogin from "../views/admin/login/index.vue";

const routes: VueRouter.RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  { path: "/admin/login", component: AdminLogin },
];

// 路由
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
