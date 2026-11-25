// 该文件是路由文件
import { createRouter, createWebHistory } from 'vue-router'
// 引入需要一个一个展示的组件
import HomeView from '../views/HomeView.vue'

// 创建路由器
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', //路径
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue') // 路由懒加载
    },
    {
      path: '/mycreatevue',
      name: 'mycreatevue',
      component: () => import('../cards/mycreate/MyCreateVue.vue') // vue学习
    }
  ]
})

// 暴露出router
export default router
