import router from './router'
import { getToken } from '@/utils/cookies'

let whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  // 已登录
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
   
  }
})

router.afterEach(() => {
})