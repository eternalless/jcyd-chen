import auth from '../../auth'
import {getUserInfo} from "../../api/index";
const user = {
  state: {
    id:0,
    name: '',
    account: '',
    token: auth.getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      auth.setToken(token)
    },
    SET_USER: (state,user) => {
      state.id = user.id
      state.name = user.name
      state.account = user.account
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          commit('SET_USER', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        auth.removeToken()
        resolve()
      })
    }
  }
}

export default user
