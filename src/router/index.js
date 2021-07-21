import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/*webpackChunkName:"name"*/'@/views/home'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import(/*webpackChunkName:"name"*/'@/views/login'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})