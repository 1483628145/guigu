import request from '@/utils/request'

// 获取组织列表
export function getDepartInfo(data) {
  return request({
    url: '/company/department',
    method: 'get',
    data
  })
}
