import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import getters from './getters'
// import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import user from '@/store/modules/user'


Vue.use(Vuex)

const state = {
  currentThreadID: null,
  threads: {
  },
  messages: {
  }
}

export default new Vuex.Store({
  modules:{
    user
  },
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState({
      // storage: window.sessionStorage,
      storage: window.localStorage,
  })]
 /*  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : [] */
})

