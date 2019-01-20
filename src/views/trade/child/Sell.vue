<template>
  <div class="sell-wrapper">
    <el-form :inline="true">
      <el-form-item label="地区">
        <el-select v-model="formInline.region" placeholder="中国">
          <!-- <el-option label="中国" value="0"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="法币币种">
        <el-select v-model="formInline.type" placeholder="人民币">
          <!-- <el-option label="人民币" value="0"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select v-model="formInline.pay" placeholder="全部" @change="selectMode">
          <el-option label="全部" value="0"></el-option>
          <el-option label="支付宝" value="1"></el-option>
          <el-option label="微信" value="2"></el-option>  
          <el-option label="银行卡" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="formInline.amount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="reset_buy">重置</el-button>
        <el-button size="mini" type="primary" @click="search_buy">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  -->
    <el-table :data="orderList" style="width: 100%">
      <el-table-column label="买家">
        <template slot-scope="scope">
          <span>{{scope.row.user_name}}</span>
          <i class="rank">LV1</i>
        </template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">
          <i class="unit">CNY</i>
          <span>￥{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="amount"></el-table-column>
      <el-table-column label="限额">
        <template slot-scope="scope">
          <i class="limit">CNY</i>
          <span>￥{{scope.row.price*scope.row.min_amount}} -- {{scope.row.price*scope.row.max_amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区">
        <template slot-scope="scope">
          <span>中国</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope" prop="pay_mode_id">
          <i class="icon-big-Pay icon" v-if="scope.row.pay_mode_id.indexOf('1')!=-1"></i>
          <i class="icon-z-weixin icon" v-if="scope.row.pay_mode_id.indexOf('2')!=-1"></i>
          <i class="icon-yinxingqia icon" v-if="scope.row.pay_mode_id.indexOf('3')!=-1"></i> 
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="txt-b" @click="sell(scope.$index, scope.row)">出售</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev,pager,next" 
      v-show="total>0" :page-size="1" :total="total||0"
      :current-page.sync="pageIndex"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {getCoinName,getCoinType} from '@/utils/auth'
export default {
  data(){
    return {
      formInline:{
        region:'',
        type:'',
        pay:'',
        amount:''
      },
      pay_mode_id:null,
      pageNum:1,
      pageIndex:1,
    }
  },
  watch:{
    $route(newVal,oldVal){
      if(newVal!=oldVal){
        this.formInline = {
          region:'',
          type:'',
          pay:'',
          amount:''
        }
      }
    }
  },
  computed:{
    ...mapState('trading',['orderList','total','payModeId'])
  },
  methods:{
    //获取支付方式id
    selectMode(val){
      if(val == '0'){
        val = null
      }
      this.pay_mode_id = val
    },
    //重置
    reset_buy(){
      this.pay_mode_id = null
      this.formInline = {
        region:'',
        type:'',
        pay:'',
        amount:''
      }
      this.$store.dispatch('trading/getBuyList',{
        coinType:getCoinType(),
        coinName:getCoinName(),
        price:null
      })
    },
    //查询
    search_buy(){
      this.pageIndex = 1
      this.$store.dispatch('trading/getBuyList',{
        payModeId:this.pay_mode_id,
        price:this.formInline.amount
      })
    },
    //分页
    handleCurrentChange(val){  
      this.pageNum = val
      this.$store.dispatch('trading/getBuyList',{
        pageNum:this.pageNum,
        payModeId:this.payModeId
      })
    },
    sell(){

    }
  }
}
</script>
<style lang="less">

</style>
