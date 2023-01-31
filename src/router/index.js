import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import AppLayout from '../views/AppLayout.vue'

const routes = [
  {
    path: '/',
    name: 'AppLayout',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'ProductsView',
        component: ProductsView
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
