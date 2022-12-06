import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import QueryAll from '@/components/QueryAll'
import Register from '@/components/Register'
import Login from '@/components/Login'
import AddCar from'@/components/addCar'
import QueryByVim from'@/components/QueryByVim'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/addCar',
      name: 'AddCar',
      component: AddCar
    },
    {
      path: '/querybyvim',
      name:'QueryByVim',
      component:QueryByVim
    },
    
    {
      path: '/queryAll',
      name: 'QueryAll',
      component: QueryAll
    } 
  ]
})
