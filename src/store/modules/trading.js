import vue from 'vue'
import axios from 'axios'
import { getOtcTradeCoin,getIssueOrderAll } from'@/api/api.js'
import {setCoinName,setCoinType,getCoinName,getCoinType} from '@/utils/auth'

const state = {
  allCoin:[],//币种信息
  orderList:[],//table数组
  pageNum:1,//显示第几页
  payModeId:'',
  total:''
}

const getters = {
  
}

const mutations = {
  getBuyList(state,params){
    let pageNum = params.pageNum||state.pageNum
    let coinType = params.coinType||getCoinType()
    let coinName = params.coinName||getCoinName()
    state.payModeId = params.payModeId
    let priceGt = params.price
    setCoinType(coinType)
    setCoinName(coinName)
    if(coinType == 'buy' || coinType == 'sell'){
      if(coinType == 'buy'){
        var bidOrAsk = 2
      }else if(coinType == 'sell'){
        var bidOrAsk = 1
      }
    }
    let param = {
      pageNum:pageNum,
      pageSize:1,
      coinName:coinName,
      bidOrAsk:bidOrAsk,
      payModeId:state.payModeId,
      priceGt:priceGt
    }  
    getIssueOrderAll(param).then((res)=>{
      if(res.message == 'success'){
        state.orderList = res.datas.list
        state.total = res.datas.total
      }
    })
  }
}

const actions = {
  //获取交易币种
  getAllCoin({commit}){
    return new Promise((resolve,reject)=>{
      getOtcTradeCoin().then((res)=>{
        state.allCoin = res.datas
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })  
  },
  //获取所有委托单
  getBuyList({commit},params){
    commit('getBuyList',params)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}