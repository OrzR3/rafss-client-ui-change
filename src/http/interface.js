import axios from './axios'

/*
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */
export const verifyFile = (data) => {
  return axios({
    url: '/student/CaVerify/verify',
    method: 'post',
    data
  })
}

export const randomImage = (randTime) => {
  return axios({
    url: '/sys/getCheckCode2/' + randTime,
    method: 'get'
  })
}

export const loginByUsername = (username, password, captcha, checkKey) => {
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

export const logout = () => {
  return axios({
    url: '/sys/logout',
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios({
    url: '/sys/permission/getUserPermissionByToken',
    method: 'get',
    params: { token }
  })
}

export const validateLogin = (userInfo) => {
  return axios({
    url: '/cas/client/validateLogin',
    method: 'get',
    params: userInfo
  })
}

export const postPhoneEmsCode = (keyCode, params) => {
  return axios({
    url: '/sys/user/postPhoneEmsCode/' + keyCode,
    method: 'get',
    params,
  })
}
export const sendEmailCode = (keyCode,params) => {
  return axios({
    url: '/sys/user/sendEmailCode/'+ keyCode,
    method: 'get',
    params,
  })
}
/**
 * 登录
 */
export const login = (data) => {
  return axios({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export const register = (data) => {
  return axios({
    url: '/sys/user/register',
    method: 'post',
    data
  })
}

export const getUser = () => {
  return axios({
    url: '/user',
    method: 'get'
  })
}

export const getMenu = data => {
  return axios({
    url: '/menu',
    method: 'post',
    data
  })
}

//post
export const postAction = (url, parameter) => {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

//post method= {post | put}
export const httpAction = (url, parameter, method) => {
  return axios({
    url: url,
    contentType: "application/json; charset=utf-8",
    dateType: "json",
    method: method,
    data: parameter
  })
}

//post method= {post | put}
export const httpActionByQuery = (url, query, parameter, method) => {
  return axios({
    url: url,
    method: method,
    params: query,
    data: parameter
  })
}

//put
export const putAction = (url, parameter) => {
  return axios({
    url: url,
    method: 'put',
    data: parameter
  })
}

//get
export const getAction = (url, parameter) => {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
/**
 * 获取字典
 * @param {*} data
 */
export function getDictItems(data) {
  return axios({
    url: 'sys/dict/getDictItems/'+ data,
    method: "get"
  });
}
//deleteAction
export const deleteAction = (url, parameter) => {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}
// 默认全部导出
export default {
  verifyFile,
  randomImage,
  postPhoneEmsCode,
  sendEmailCode,
  loginByUsername,
  logout,
  getUserInfo,
  validateLogin,
  login,
  register,
  getUser,
  getMenu,
  postAction,
  httpAction,
  httpActionByQuery,
  putAction,
  getAction,
  getDictItems,
  deleteAction
}
