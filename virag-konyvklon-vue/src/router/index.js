import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FlowersView from '../views/FlowersView.vue'
import FlowerDetailView from '../views/FlowerDetailView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/viragok', name: 'flowers', component: FlowersView },
    { path: '/viragok/:id', name: 'flower-detail', component: FlowerDetailView, props: true },
    { path: '/kosar', name: 'cart', component: CartView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
