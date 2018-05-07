import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import admin from '../components/admin/function_page'
import addStuff from '../components/admin/addStuff'
import stuffManage from '../components/admin/stuffManage'
import loginRecord from '../components/admin/loginRecord'
import stuffFunction from '../components/stuff/stuff_function'
import applyPassword from '../components/stuff/applyPassword'
import changePassword from '../components/stuff/changePassword'
import roleManage from '../components/admin/roleManage'
import accessManage from '../components/admin/accessManage'
import outer from '../components/outer/outer'
import addRole from '../components/admin/addRole'
import addAccess from '../components/admin/addAccess'
import { access } from 'fs';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'rootPath',
      component: Login
    },
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
    },
    {
      path: '/stuffManage',
      name: 'stuffManage',
      component: stuffManage
    },
    {
      path: '/addRole',
      name: 'addRole',
      component: addRole
    },
    {
      path: '/addAccess',
      name: 'addAccess',
      component: addAccess
    },
    {
      path: '/roleManage',
      name: 'roleManage',
      component: roleManage
    },
    {
      path: '/accessManage',
      name: 'accessManage',
      component: accessManage
    },
    {
      path: '/loginRecord',
      name: 'loginRecord',
      component: loginRecord
    },
    {
      path: '/stuff',
      name: 'stuffFunction',
      component: stuffFunction
    },
    {
      path: '/applyPassword',
      name: 'applyPassword',
      component: applyPassword
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    },
    {
      path: '/outer',
      name: 'outer',
      component: outer
    }
  ]
})
