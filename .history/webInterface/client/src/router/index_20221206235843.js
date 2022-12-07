import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'

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
      path: '/addCar',
      name: 'AddCar',
      component: AddCar
    },
    {
      path: '/querybyvim',
      name:'QueryByVim',
      component:QueryByVim
    }
  ]
})
