
import request from '@/utils/request'

// 获取角色列表
export function getRoleInfo(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 修改角色信息
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 分配权限
export function updatePermission(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'delete',
    data
  })
}

// 新增角色

// 分页查询角色列表

// 角色详情

