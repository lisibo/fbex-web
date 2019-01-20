import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './modules/user'
import trading from './modules/trading'

import getters from './getters'
export default new Vuex.Store({
  modules:{
    user,
    trading
  },
  getters
})