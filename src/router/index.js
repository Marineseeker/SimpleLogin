import { createRouter, createWebHistory } from 'vue-router'

import loginpage from '../views/LoginPage.vue'
import registerpage from '../views/RegisterPage.vue'
import mainlayout from '@/views/Layout/MainLayout.vue'
import userhome from '@/views/Layout/UserHome.vue'
import frontpage from '@/views/Layout/FrontPage.vue'
import traincenter from '@/views/Layout/TrainCenter.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: loginpage },
  { path: '/register', component: registerpage },
  {
    path: '/mainlayout',
    component: mainlayout,
    children: [
      { path: '', redirect: 'frontpage' },
      { path: '/frontpage', component: frontpage },
      { path: '/traincenter', component: traincenter },
      { path: '/userhome', component: userhome },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router