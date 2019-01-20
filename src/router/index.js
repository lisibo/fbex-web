import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes:[
    {
      path:'/',
      redirect:'/trade/buy'
    },
    {
      path:'/trade',
      redirect:'/trade/buy',
      name:'FbTrade',
      component:()=>import('@/views/trade/FbTrade'),
      children: [
        {
          path: '/trade/buy',
          component: () => import('@/views/trade/child/Buy')
        },
        {
          path: '/trade/sell',
          component: () => import('@/views/trade/child/Sell')
        },
        {
          path: '/trade/order',
          component: () => import('@/views/trade/child/Order')
        }       
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:()=>import('@/views/login')
    },
    {
      path:'/order_buy',
      component: () => import('@/views/entrust/OrderBuy')
    },
    {
      path:'/validate',
      component: ()=>import('@/views/mine/validate')
    }
  ]
})