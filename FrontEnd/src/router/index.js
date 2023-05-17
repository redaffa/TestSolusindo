import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from "../views/RegisterPage.vue"
import LoginPage from "../views/LoginPage.vue"
import ViewData from "../views/ViewData.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/login',
      component: LoginPage
    },{
      path: "/",
      component: ViewData
    }
  ]
})

export default router
