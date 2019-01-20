import {getLogin} from '@/api/api.js'
import {getToken,setToken,removeToken,getName,setName,removeCoinType,removeCoinName,removeIndex_buy,removeIndex_sell} from '@/utils/auth'

const user = {
  state: {
    token : getToken(),
    name : getName(), 
    validate_user:''
  },
  mutations: {
    SET_NAME(state,name){
      state.name = name
    },
    SET_TOKEN(state,token){
      state.token = token
    }
  },
  actions: {
    //登录
    handleLogin({commit},userInfo){
      let userName = userInfo.userName.trim();
      let passWord = userInfo.passWord.trim();
      return new Promise((resolve,reject)=>{
        let param = {
          userName : userName,
          passWord : passWord
        }
        getLogin(param).then((response)=>{
          if(response.message == "成功"){
            const token = response.datas
            commit("SET_NAME",userName)
            commit("SET_TOKEN",token)
            setName(userName)
            setToken(token)
          }  
          resolve(response)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //退出
    FedLogOut({commit}){
      return new Promise((resolve,reject)=>{
        commit('SET_NAME', '');
        commit('SET_TOKEN', '');
        removeToken()
        removeCoinType()
        removeCoinName()
        removeIndex_buy()
        removeIndex_sell()
        resolve()
      }).catch((err)=>{
        reject(err)
      })
    },
    //获取用户信息
    getUserInfo({commit}){
      console.log('获取用户信息')
    }
  }
}
export default user;