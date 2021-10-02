import { login } from '@/api/login'
import { addUser } from '@/api/user'
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
          commit('setToken', res.data.token)
          commit('setUserInfo', res.data)
          resolve(res.data)
          
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    // eslint-disable-next-line no-unused-vars
    register ( { commit }, loginForm) {
      return new Promise((resolve, reject) => {
        addUser(loginForm).then(res => {
          resolve(res)
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
