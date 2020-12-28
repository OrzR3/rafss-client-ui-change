import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
  state: {
    //存放的键值对就是所要管理的状态
    name: 'helloVueX'
  },
  getters: {
    nameInfo(state) {
      return "姓名:" + state.name
    },
    fullInfo(state, getters) {
      return getters.nameInfo + '年龄:' + state.age
    }
  },
  mutations: {
    //es6语法，等同edit:funcion(){...}
    edit(state, payload) {
      state.name = 'jack'
      console.log(payload) // 15或{age:15,sex:'男'}
    }
  },
  actions: {
    aEdit(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('edit', payload)
          resolve()
        }, 2000)
      })
    }
  }
})

export default store
