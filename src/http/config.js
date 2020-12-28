import { getToken } from "@/utils/auth";
export default {
  method: 'get',
  // 基础url前缀
  // baseURL: 'http://localhost:8080/',
  baseURL: window._CONFIG['BASE_API'] ,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Access-Token': getToken()
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
