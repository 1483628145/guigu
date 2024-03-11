
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
export function updateRole(id) {
  return request({
    url: '/sys/role/{id}',
    method: 'put',
    data: id
  })
}

// 分配权限

// 删除角色

// 新增角色

// 分页查询角色列表

// 角色详情

