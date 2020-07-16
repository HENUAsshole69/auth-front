import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userObj:null
  },
  mutations: {
    login(state,token){
      state.token = token
    },
    logout(state){
      state.token = null
    },
    loadUser(state,obj){
      state.userObj = obj
    }
  },
  actions: {
  },
  modules: {
  }
})
