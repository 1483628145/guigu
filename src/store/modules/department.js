// 组织架构模块

import { getDepartInfo } from '@/api/department'
import { TranListToTree } from '@/utils'

const state = {
  departmentInfo: []
}

const mutations = {
  // 保存组织结构信息
  setDepartInfo(state, departmentInfo) {
    state.departmentInfo = TranListToTree(departmentInfo, 0)
  }

}

const actions = {
  // 获取组织信息
  async getDepartInfo(context) {
    const departmentInfo = await getDepartInfo()
    context.commit('setDepartInfo', departmentInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
