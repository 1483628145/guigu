// 用户store模块

import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    // 同步到本地存储
    setToken(token)
  },

  // 退出登录 删除token
  removeToken(state) {
    // 删除vuex的token
    state.token = null
    // 清掉本地用户信息
    state.userInfo = {}
    // 删除本地token
    removeToken()
  },

  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }

}

const actions = {

  // 登录
  async login(context, LoginForm) {
    // 调用登录接口
    // const token = '12345'
    const token = await login(LoginForm)
    // element消息提示
    const message = '登录成功'
    Message({ type: 'success', message })
    // 返回一个 token 提交到mutation
    context.commit('setToken', token)
  },

  // 退出登录
  logout(context) {
    context.commit('removeToken')
  },

  // 获取用户数据
  async getUserInfo(context) {
    // 调用用户信息
    const userInfo = await getUserInfo()
    context.commit('setUserInfo', userInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

