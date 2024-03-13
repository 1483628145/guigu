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
