import router from '../router'
import type { RouteLocationNormalized } from 'vue-router'
import getPageTitle from '@/utils/get-page-title'

interface Route extends RouteLocationNormalized {
  meta: {
    title?: string
  }
}

router.beforeEach((to: Route) => {
  // set page title
  document.title = getPageTitle(to.meta.title)
})
