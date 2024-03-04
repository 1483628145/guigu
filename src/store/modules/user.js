// 用户store模块

import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()
}

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    // 同步到本地存储
    setToken(token)
  },

  // 删除token
  removeToken(state) {
    // 删除vuex的token
    state.token = null
    // 删除本地token
    removeToken()
  }

}

const actions = {
  // 登录
  async login(context, LoginForm) {
    // 调用登录接口
    // const token = '12345'
    const token = await login(LoginForm)
    // 返回一个 token 提交到mutation
    context.commit('setToken', token)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

