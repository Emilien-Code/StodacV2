import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produit/:id',
    name: 'produitTemplate',
    component: () => import('../views/Produit.vue')
  },
  {
    path: '/commande/',
    name: 'Commande',
    component: () => import('../views/RecapCommande.vue')
  },
  {
    path: '/add/',
    name: 'add',
    component: () => import('../views/addItem.vue')
  },
  {
    path:'/login/',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path:'/achat/',
    name: 'achat',
    component: () => import('../views/PayementCommande.vue')
  },
  //{
  //  path: '/admin/',
  //  name: 'admin',
  //  component: () => import('../views/admin.vue')
  //}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
