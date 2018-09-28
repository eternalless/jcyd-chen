// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axiosPlugin from "./axios";
import * as filters from '@/filters' // 全局filter
import store from './store'

import Layout from './components/Layout.vue'
Vue.component(Layout.name, Layout)

Vue.use(axiosPlugin)
Vue.use(ElementUI)
Vue.use(VueRouter)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})
window.$router = router;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
