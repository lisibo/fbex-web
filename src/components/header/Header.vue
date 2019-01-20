<template>
  <div class="header-wrapper">
    <div class="header-left">
      <div class="logo">
        <img src="../../assets/images/fbex-logo.png" alt="">
      </div>
      <div class="nav">
        <router-link to="/trade" tag="div">法币交易</router-link>
      </div>
      <div class="nav">
        <router-link to="" tag="div">发布委托</router-link>
      </div>
    </div>
    <div class="header-right">
      <div class="item" v-if="token">{{name}}</div>
      <div class="item" v-if="!token"><router-link to="/login" tag="div">注册</router-link></div>
      <div>|</div>
      <div class="item" v-if="!token"><router-link to="/login" tag="div">登录</router-link></div>
      <div class="item" v-if="token" @click="loginOut">退出</div>
      <div class="item">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            简体中文<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>简体中文</el-dropdown-item>
            <el-dropdown-item>Eglish</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {getToken,getName,setToken,setName,removeToken} from '@/utils/auth'
export default {
  data(){
    return {
      
    }
  },
  computed:{
    ...mapGetters(['name','token'])
  },
  methods:{
    loginOut(){
      this.$store.dispatch('FedLogOut').then(()=>{
        console.log('已退出')
        location.reload()
      })
      
    }
  }
}
</script>
<style lang="less">
.header-wrapper{
  height: 50px;
  background: #1B222A;
  padding: 0 23px;
  display: flex;
  font-size: 14px;
  color: #999EA4;
  .header-left{
    display: flex;
    flex: 1;
    align-items: center;
  }
}
.logo{
  width:80px;
  img{width: 100%}
}
.header-right{
  display: flex;
  align-items: center;
  font-size: 14px;
  .item{
    padding: 10px;
  }
}
.nav{
  div{padding: 0 22px}
}
.el-dropdown-link{
  color: #999EA4;
}
</style>
