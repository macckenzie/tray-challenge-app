import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SellerView from "@/views/SellerView.vue";
import SaleView from "@/views/SaleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sellers',
      name: 'Vendedores',
      component: SellerView,
    },
    {
      path: '/sales',
      name: 'Vendas',
      component: SaleView,
    }
  ],
})

export default router
