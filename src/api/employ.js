import request from '@/utils/request'

// 获取员工列表
export function getEmployInfo(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}

// 导出 excel
export function exportExcel() {
  return request({
    url: '/sys/user/export',
    // method: 'get',
    responseType: 'blob'
  })
}
