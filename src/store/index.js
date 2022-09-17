import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:JSON.parse(localStorage.getItem("user")),//存储当前用户信息
    token:localStorage.getItem("token"),//存储token字符串
  },
  getters: {
  },
  mutations: {
    /**
     * 清空用户状态
     */
    clearUserState(state){
      state.user=undefined
      state.token=undefined
      localStorage.clear()
    },
    /**
     * 当登录成功后将会得到用户信息与token字符串，调用loginOk可以将这些信息存入state
     * @param {*} state
     * @param {*} payload
     */
    saveUserState(state,payload){
      state.user=payload.user;
      state.token=payload.token;
      // 存入localstorage
      localStorage.setItem("token",payload.token)
      localStorage.setItem("user",JSON.stringify(payload.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
