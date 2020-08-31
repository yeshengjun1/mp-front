import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/acl/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

//获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

export function getMenu() {
  return request({
    url: '/admin/acl/index/menu',
    method: 'get'
  })
}
