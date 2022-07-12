import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "*",
    redirect: "/",
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Reports.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
