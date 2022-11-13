import { createRouter, createWebHistory } from 'vue-router'
import Map from '../components/Map.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Map',
    //   component: Map
    // },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/data',
      name: 'Data',
      component: () => import('../components/Data.vue')
    }
  ]
})

export default router
