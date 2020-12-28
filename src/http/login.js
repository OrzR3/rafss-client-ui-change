import axios from './axios'

export function loginByUsername(username, password, captcha, checkKey) {
  const data = {
    username,
    password,
    captcha,
    checkKey
  }
  // console.log(data)
  return axios({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function loginByPhone(phone, emsCode, emsKey) {
  const data = {
    phone,
    emsCode,
    emsKey
  }
  // console.log(data)
  return axios({
    url: '/sys/emsLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return axios({
    url: '/sys/logout',
    method: 'post'
  })
}
/* 注册的接口 */
export const register = (data) => {
  return axios({
    url: '/sys/user/register',
    method: 'post',
    data
  })
}

/* 唯一校验 */
export const checkNewOnly = (data) => {
  return axios({
    url: '/sys/user/checkNewOnly',
    method: 'get',
    params: data
  })
}

export function getUserInfo(token) {
  return axios({
    url: '/sys/permission/getUserPermissionByToken',
    method: 'get',
    params: { token }
  })
}

export function validateLogin(userInfo) {
  return axios({
    url: '/cas/client/validateLogin',
    method: 'get',
    params: userInfo
  })
}

