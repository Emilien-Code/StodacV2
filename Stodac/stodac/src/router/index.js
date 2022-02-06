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
    path:'/payement/',
    name: 'payement',
    component: () => import('../views/PayementCommande.vue')
  },
  {
    path:'/finiCommande/',
    name: 'finiCommande',
    component: () => import('../views/Merci.vue')
  },
  {
    path:'/facture/:numfacture',
    name: 'facture',
    params: true,
    component: () => import('../views/Facture.vue')
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
