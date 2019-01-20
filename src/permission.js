import router from "./router/index"
import store from './store/index'
import {getToken,getName,setToken,setName} from '@/utils/auth'
const whiteList = ['/login','/trade/buy']

router.beforeEach((to,from,next)=>{
  //白名单包含正常跳转

  if(whiteList.indexOf(to.path) !== -1){
    next()
  }else{
    if(getToken()){
      next()
    }else{
      next({path:'/login'})
    }
  }
})
