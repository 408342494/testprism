/*
 * @Author: lyy
 * @Date: 2020-07-13 20:16:01
 * @LastEditTime: 2020-07-14 10:33:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wukong-vue-boilerplate/src/main.js
 */ 
import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
