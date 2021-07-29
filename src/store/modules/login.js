import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/cookies'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },

  mutations: {
    setToken: (state, token) => {
      state.token = token
      setToken(token)
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    login ({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm).then(res => {
          commit('setToken', res.data.auth_token)
          commit('setUserInfo', res.data.user)
          resolve(res.data)
          
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出系统
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('setToken', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
