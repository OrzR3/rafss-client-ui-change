import axios from './axios'

export function listMail(query) {
  return axios({
    url: '/reservation/reservation/list',
    method: 'get',
    params: query
  })
}

export function createMail(data) {
  return axios({
    url: '/reservation/reservation/add',
    method: 'post',
    data
  })
}

export function readMail(id) {
  return axios({
    url: '/reservation/reservation/queryById',
    method: 'get',
    id
  })
}

export function updateMail(data) {
  return axios({
    url: '/reservation/reservation/edit',
    method: 'put',
    data
  })
}

export function deleteMail(id) {
  return axios({
    url: '/reservation/reservation/delete',
    method: 'delete',
    params: { id }
  })
}

export function getCdnrList(gategory) {
  return axios({
    url: '/reservation/reservation/getCdnrList',
    method: 'get',
    params: { gategory }
  })
}

export function getLymdList() {
  return axios({
    url: '/reservation/reservation/getLymdList',
    method: 'get'
  })
}

export function getCb(data) {
  return axios({
    url: '/reservation/reservation/addCb',
    method: 'post',
    data
  })
}
export function addPj(data) {
  return axios({
    url: '/reservation/reservation/addPj',
    method: 'post',
    data
  })
}
export function getUrgeData(gategory) {
  return axios({
    url: '/reservation/reservation/getUrgeData',
    method: 'get',
    params: { gategory }
  })
}

export function getPjData(reservationId) {
  return axios({
    url: '/reservation/reservation/getPjData',
    method: 'get',
    params: { reservationId }
  })
}
export function getSchoolList() {
  return axios({
    url: '/reservation/reservation/getSchoolData',
    method: 'get'
  })
}

export function getsheng() {
  return axios({
    url: '/reservation/reservation/getShengData',
    method: 'get'
  })
}

export function getcity(id) {
  return axios({
    url: '/reservation/reservation/getShiData',
    method: 'get',
    params: { id }
  })
}

export function getarea(id) {
  return axios({
    url: '/reservation/reservation/getQuData',
    method: 'get',
    params: { id }
  })
}

export function getYyxz(query) {
  return axios({
    url: '/yyxz/yyxz/getYyxzList',
    method: 'get',
    params: query
  })
}