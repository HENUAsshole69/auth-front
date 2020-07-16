import Vue from 'vue'
import Vuex from 'vuex'
import {UserClient} from "@/client/UserClient";

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
    loadUser(state,user){
      state.userObj = user
    }
  },
  actions: {
      async getUserObj(context){
        context.commit('loadUser',await UserClient.getUser())
      }
  },
  modules: {
  }
})
