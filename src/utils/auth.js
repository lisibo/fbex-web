import Cookies from 'js-cookie'
//token
export function getToken(){
  return Cookies.get("token")
}
export function setToken(token){
  return Cookies.set('token',token)
}
export function removeToken(){
  return Cookies.remove("token")
}
//用户名
export function getName(){
  return Cookies.get("name")
}
export function setName(name){
  return Cookies.set("name",name)
}
//币种类型
export function getCoinType(){
  return Cookies.get("coinType")
}
export function setCoinType(coinType){
  return Cookies.set("coinType",coinType)
}
export function removeCoinType(){
  return Cookies.remove("coinType")
}
//币种名称
export function getCoinName(){
  return Cookies.get("coinName")
}
export function setCoinName(coinName){
  return Cookies.set("coinName",coinName)
}
export function removeCoinName(){
  return Cookies.remove("coinName")
}
//索引(buy)
export function getIndex_buy(){
  return Cookies.get("coinIndex_buy")
}
export function setIndex_buy(coinIndex){
  return Cookies.set("coinIndex_buy",coinIndex)
}
export function removeIndex_buy(){
  return Cookies.remove("coinIndex_buy")
}
//索引(sell)
export function getIndex_sell(){
  return Cookies.get("coinIndex_sell")
}
export function setIndex_sell(coinIndex){
  return Cookies.set("coinIndex_sell",coinIndex)
}
export function removeIndex_sell(){
  return Cookies.remove("coinIndex_sell")
}

// export function getInfo(){
//   return Cookies.get("coinInfo")
// }
// export function setInfo(coinType,coinIndex,coinName){
//   return Cookies.set("coinInfo",{
//     coinType:coinType,
//     coinIndex:coinIndex,
//     coinName:coinName
//   })
// }
// export function removeInfo(){
//   return Cookies.remove("coinInfo")
// }




