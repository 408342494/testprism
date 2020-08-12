import Vue from 'vue'
import Router from 'vue-router'
import mIndex from '@/m/index'
import test from '@/m/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: mIndex
    },
    {
      path: '/test',
      component: test
    }
  ]
})
