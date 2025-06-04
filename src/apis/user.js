import request from '@/utils/request'

export const userLoginServive = (loginData) => {
  return request({
    url: '/login',
    method: 'post',
    data: loginData,
  })
}

export const userRegisterService = (registerData) => {
  return request({
    url: '/register',
    method: 'post',
    data: registerData,
  })
}

export const userLogoutService = () => {
  return request({
    url: '/logout',
    method: 'post',
  })
}
