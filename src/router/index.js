import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// const Home = () => import('@/views/home')
import Login from '@/views/login/Index'
import Home from '@/views/home/Index'
import ReviewProgress from '@/views/home/ReviewProgress'
import BookingManagement from '@/views/home/BookingManagement'

import LoginLayout from '@/views/login/Layout'
import HomeLayout from '@/views/home/Layout'
import Test from '@/views/home/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      component: HomeLayout,
      meta: {
        title: '首页',
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/',
          component: Home,
          name: 'home',
          meta: {
            title: '首页',
          },
        },
        {
          path: '/test',
          component: Test,
          name: 'test',
          meta: {
            title: '测试',
          },
        },
        {
          path: '/review-progress',
          component: ReviewProgress,
          name: 'review-progress',
          meta: {
            title: '审核进度查看',
          },
        },
        {
          path: 'booking-management',
          component: BookingManagement,
          name: 'booking-management',
          meta: {
            title: '预约管理',
          },
        }
      ]
    },
    {
      path: '/login',
      component: LoginLayout,
      meta: {
        title: '登录',
      },
      children: [
        {
          path: '/login',
          component: Login,
          name: 'login',
        },
      ]
    },
  ]
})
