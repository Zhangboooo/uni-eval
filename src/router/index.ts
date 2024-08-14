import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/uni'
    },
    {
      path: '/uni',
      name: 'Uni',
      component: () => import('@/views/uni/Uni.vue')
    }
  ]
})

export default router
