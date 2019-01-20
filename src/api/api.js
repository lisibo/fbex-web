import request from '@/utils/request'

let user = '/user'
let legal = '/legal'
//登录
export const getLogin = params => {
  return request.get(`${user}/user/login`,params)
}
//获取交易币种
export const getOtcTradeCoin = params => {
  return request.get(`${legal}/issue/getOtcTradeCoin`, params)
}
//获取全部委托单
export const getIssueOrderAll = params => {
  return request.get(`${legal}/issue/getIssueOrderAll`, params)
}
//实名认证
export const audit = params => {
  return request.get(`${user}/user/audit`,params)
}