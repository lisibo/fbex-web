// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/reset.css'
// import '@/assets/css/common.css'
import '@/assets/css/common.less'
import '@/assets/css/iconfont.css'
Vue.use(ElementUi)

// import '@/styles/reset.css'
import '@/permission'
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
