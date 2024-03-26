import request from '@/utils/request'

export function getPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'put'
  })
}
