<template>
  <div id="app">
    <v-header></v-header>
    <div class="wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <v-footer></v-footer>
  </div>  
</template>
<script>
import VHeader from '@/components/header/Header'
import VFooter from '@/components/footer/Footer'
export default {
  components:{
    VHeader,
    VFooter
  }
}
</script>
<style lang="less">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
