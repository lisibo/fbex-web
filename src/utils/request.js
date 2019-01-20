import axios from 'axios'
import {getToken,getName,setToken,setName} from '@/utils/auth'

const service = axios.create({
  //  timeout: 5000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  }
})
//请求拦截
service.interceptors.request.use(config => {
  //  const token =JSON.parse(localStorage.getItem('token')) || {};
   const token = getToken() || {};
    if (token) {
      config.headers['USER-TOKEN'] = token;
    }
    return config
  }, err => {
    return Promise.reject(err)
  })
//响应拦截
  service.interceptors.response.use(res => {
    
    if(res.data.message=='no login'){
      setToken('');
      setName('');
    }
    return res.data
  }, ({
    response = {}
  }) => {
    return Promise.reject()
  })
export default {
  get(url, params = {}) {
    return service({
      method: 'get',
      url,
      params, // get 请求时带的参数
    })
  }
}