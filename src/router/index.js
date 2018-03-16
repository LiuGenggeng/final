import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import admin from '../components/admin/function_page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
