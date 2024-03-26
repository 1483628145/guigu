import request from '@/utils/request'

// 获取员工列表
export function getEmployInfo(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}

// 导出 员工excel
export function exportExcel() {
  return request({
    url: '/sys/user/export',
    method: 'get',
    responseType: 'blob'
  })
}

// 下载excel模板
export function downExcel() {
  return request({
    url: '/sys/user/import/template',
    method: 'get',
    responseType: 'blob'
  })
}

// 上传excel
export function uploadExcel() {
  return request({
    url: '/sys/user/import',
    method: 'post'
  })
}

// 新增员工
export function addEmploy(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 获取员工信息
export function getUserInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

// 删除员工
export function removeUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 修改员工信息
export function updateUserInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'put'
  })
}
