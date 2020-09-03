import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '@/views/About.vue'
import Category from '@/views/Category.vue'
import Subcategory from '@/views/Subcategory.vue'
import Provider from '@/views/Provider.vue'
import Terms from '@/views/Terms.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: false
    }
  },
  // ID is placeholder for identifier for now
  {
    path: '/category/:categoryID',
    name: 'Category',
    component: Category,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/category/:categoryID/subcategory/:subcategoryID',
    name: 'Subcategory',
    component: Subcategory,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/provider/:providerID',
    name: 'Provider',
    component: Provider,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/terms-of-service',
    name: 'Terms',
    component: Terms,
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
