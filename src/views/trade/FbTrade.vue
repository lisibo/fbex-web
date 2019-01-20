<template>
  <div class="container">
    <div class="trade-wrapper">
      <div class="item">
        <h5 :class="{active:isActive}">购买</h5>
        <div class="tabs">
          <span v-for="(item,index) in allCoin" :key="index"
          @click="tabs(item,index,'buy')"
          :class="{active:currentIndex == index}"
          >
            {{item.coin_name}} 
          </span>
        </div>
      </div>
      <div class="item">
        <h5 :class="{active:isActive1}">出售</h5>
        <div class="tabs">
          <span v-for="(item,index) in allCoin" :key="index"
          @click="tabs(item,index,'sell')"
          :class="{active:currentIndex1 == index}"
          >
            {{item.coin_name}}
          </span>
        </div>
      </div>
      <div class="item" v-if="token">
        <h5 :class="{active:isActive2}">我的订单</h5>
        <div class="tabs">
          <span v-for="(item,index) in orderList" :key="index"
          @click="tabs(item,index,'order')"
          :class="{active:currentIndex2 == index}"> 
            {{item.name}}
          </span>
        </div>
      </div>
      <div class="btn-wrapper">
        <div class="btn-b" @click="publish">发布委托</div>
      </div>
    </div>
    <div class="content">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import { getToken,getCoinType,setCoinType,removeCoinType,getCoinName,removeCoinName,
getIndex_buy,setIndex_buy,removeIndex_buy,
getIndex_sell,setIndex_sell,removeIndex_sell} from "@/utils/auth";

export default {
  data(){
    return {
      token:'',
      isActive:true,
      isActive1:false,
      isActive2:false,
      currentIndex:getIndex_buy()||0,
      currentIndex1:getIndex_sell()||-1,
      currentIndex2:-1,
      orderList:[
        {name:"未完成",index:0},
        {name:"已完成",index:1},
        {name:"已取消",index:2}
      ],
      isRouterAlive:true,
      coinType:getCoinType()||'buy',//买或卖
      // pageNum:1,
    }
  },
  created(){
    //初始化用户信息
    this.$store.dispatch('getUserInfo')
    //初始化交易币种
    this.$store.dispatch('trading/getAllCoin').then((res)=>{
      //Pomise回调 初始化委托单
      this.$store.dispatch('trading/getBuyList',{
        // pageNum:this.pageNum,//每次刷新初始化第一页
        coinType:this.coinType,
        coinName:getCoinName()||res.datas[0].coin_name
      }) 
    })
    if(getIndex_sell()){
      this.currentIndex = -1
    }
  },
  updated(){
    this.token = getToken()
  },
  computed:{
    ...mapState('trading',['allCoin'])
  },
  methods:{
    //币种切换
    tabs(item,index,data){
      this.$router.push({path:data,query:{index:index}})
      if(data == 'buy'||data == 'sell'){
        let coinName = item.coin_name
        this.coinType = data
        setCoinType(data)
        this.$store.dispatch('trading/getBuyList',{
          // pageNum:this.pageNum,//每次点击初始化第一页
          coinType:data,
          coinName:coinName
        }) 
        if(data == 'buy'){
          this.isActive = true
          this.isActive1 = false
          this.isActive2 = false
          this.currentIndex = index
          this.currentIndex1 = -1
          this.currentIndex2 = -1
          setIndex_buy(index)
          removeIndex_sell()
        }else if(data == 'sell'){
          this.isActive = false
          this.isActive1 = true
          this.isActive2 = false
          this.currentIndex = -1
          this.currentIndex1 = index
          this.currentIndex2 = -1
          setIndex_sell(index)
          removeIndex_buy()
        }
      }else{
        this.isActive = false
        this.isActive1 = false
        this.isActive2 = true
        this.currentIndex = -1
        this.currentIndex1 = -1
        this.currentIndex2 = index
        removeCoinType()
        removeCoinName()
        removeIndex_buy()
        removeIndex_sell()
      }
    },
    //发布委托
    publish(){
      this.$router.push('/order_buy')
    }
  }
}
</script>
<style lang="less">
.container {
  background: #292f37;
  padding: 30px;
  min-height: 620px;
}
.trade-wrapper {
  display: flex;
  // position: relative;
  // border-bottom: 1px solid #3b4148;
  // padding-bottom: 40px;
  // .btn-wrapper {
  //   position: absolute;
  //   right: 0;
  //   top: -8px;
  // }
  .item {
    display: flex;
    h5,.tabs{
      line-height: 30px;
    }
    h5{
      font-size: 16px;
      color: #fff;
      &.active {
        color: #2286ff;
      }
    }
    .tabs {
      font-size: 12px;
      span {
        &.active {
          color: #2286ff;
        }
        cursor: pointer;
        border-radius: 2px;
        margin-right: 5px;
        color: #fff;
        padding: 5px 23px;
        background: rgba(255, 255, 255, 0.08);
      }
    }
  }
}
</style>
