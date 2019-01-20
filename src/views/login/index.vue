<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="container">
        <div class="login-form">
          <h1>欢迎登录</h1>
          <div class="input-wrapper">
            <input type="text" placeholder="请输入邮箱" v-model="loginForm.userName">
          </div>
          <div class="input-wrapper">
            <input type="password" placeholder="请输入密码" v-model="loginForm.passWord">
          </div>
          <el-button class="login_btn" type="primary" @click="login">登录</el-button>
        </div>   
        <div class="login-img">
          <img src="" alt="">
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  data(){
    return {
      loginForm:{
        userName:'252258766@qq.com',
        passWord:'123qaz'
      }
    }
  },
  methods:{
    login(){
      this.$store.dispatch('handleLogin',this.loginForm).then((res)=>{
        this.$router.push({path:'/'})
      })
    }
  }
}
</script>
<style lang="less">

</style>
