/* eslint-disable no-debugger */
import router from './router'
// import store from './store'
// import { Loading } from 'element-ui'
import { getToken } from '@/utils/cookies'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    const arr = ['/login', '/register']
    if (arr.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
   
  }
})

router.afterEach(() => {
})