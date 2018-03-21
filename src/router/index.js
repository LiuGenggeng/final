import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import admin from '../components/admin/function_page'
import addStuff from '../components/admin/addStuff'

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
    },
    {
      path: '/addStuff',
      name: 'addStuff',
      component: addStuff
    }
  ]
})
