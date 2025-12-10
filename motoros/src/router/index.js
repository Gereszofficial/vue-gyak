import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import MotorList from '../views/MotorList.vue'
import MotorDetails from '../views/MotorDetails.vue'
import AdminMotors from '../views/AdminMotors.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/motors', component: MotorList },
  { path: '/motors/:id', component: MotorDetails, props: true },
  { path: '/admin/motors', component: AdminMotors }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
