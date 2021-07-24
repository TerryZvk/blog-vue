import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'Home',
                    component: () => import(/*webpackChunkName:"name"*/'@/views/home'),
                    meta: {
                        title: '首页'
                    }

                }
            ],
        },
        {
            path: '/login',
            component: () => import(/*webpackChunkName:"name"*/'@/views/login'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/signup',
            component: () => import(/*webpackChunkName:"name"*/'@/views/login'),
            meta: {
                title: '注册'
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})