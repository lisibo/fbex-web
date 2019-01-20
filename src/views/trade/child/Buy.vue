<template>
  <div class="buy-wrapper">
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
    <el-table :data="orderList" style="width:100%">
      <el-table-column label="卖家">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
          <i class="rank">LV1</i>
        </template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">
          <i class="unit">CNY</i>
          <span>￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="数量"></el-table-column>
      <el-table-column label="限额">
        <template slot-scope="scope">
          <i class="limit">CNY</i>
          <span>￥{{scope.row.price*scope.row.min_amount}}--{{scope.row.price*scope.row.max_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区">
        <template slot-scope="scope">
          <span>中国</span>
        </template>
      </el-table-column>
      <el-table-column prop="pay_mode_id" label="支付方式">
        <template slot-scope="scope">
          <i class="icon-big-Pay icon" v-if="scope.row.pay_mode_id.indexOf('1')!=-1"></i>
          <i class="icon-z-weixin icon" v-if="scope.row.pay_mode_id.indexOf('2')!=-1"></i>
          <i class="icon-yinxingqia icon" v-if="scope.row.pay_mode_id.indexOf('3')!=-1"></i>  
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="txt-b" @click="buy(scope.$index, scope.row)">购买</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev,pager,next" 
      v-show="total>0" :page-size="1" :total="total||0"
      :current-page.sync="pageIndex"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 购买弹窗 -->
    <el-dialog title="购买" :visible.sync="buyContent" width="30%" center>
      <el-form ref="form" >
        <el-form-item label="交易币种">

        </el-form-item>
      </el-form>
    </el-dialog>
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
      price:'',
      pageNum:1,
      pageIndex:1,
      buyContent:false
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
    buy(index,item){
      console.log(index,item)
      this.buyContent = true
    }
  }
}
</script>
<style lang="less">
.icon{
 font-size: 18px;
}
.max{    position: absolute;cursor: pointer;
    right: 4px;font-size: 12px}
.buy-wrapper {
  margin-top: 24px;
}
.txt-b {
  cursor: pointer;
}
.demo-form-inline {
  border-bottom: 1px solid #3b4148;
  padding-bottom: 10px;
}
</style>
