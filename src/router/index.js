import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/HomeView.vue'
// import ImageGallery from '@/views/imageGallery/ImageView.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/imageGallery',
    name: 'ImageGallery',
    component: () => import('@/views/imageGallery/ImageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router