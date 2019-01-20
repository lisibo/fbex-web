<template>
  <div class="validate-wrapper">
    <div class="container">
      <div class="title" v-if="isShow">
        <span>身份认证</span>
      </div>
      <div class="title" v-if="isShow1">
        <span>证件上传</span>
      </div>
      <div class="validate_content" v-if="isAssess">
        <div class="identity-wrapper" v-if="isShow">

          <div class="form-wrapper">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="选择地区">
                <el-radio v-model="radio" label="1" @change="selectRegin">>中国大陆地区</el-radio>
                <el-radio v-model="radio" label="2" @change="selectRegin">>其他国家及地区</el-radio>
              </el-form-item>
              <el-form-item label="姓氏">
                <el-input v-model="form.surname" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="名字">
                <el-input v-model="form.name" maxlength="40"></el-input>
              </el-form-item>
              <el-form-item label="证件号码" v-if="!show">
                <el-input v-model="form.number" maxlength="18"></el-input>
              </el-form-item>

              <el-form-item label="国籍" v-if="show">
                <el-select v-model="form.country" placeholder="请选择" @change="selectCountry">
                  <!-- <el-option label="中国" value="1"></el-option> -->
                  <el-option label="新加坡" value="2"></el-option>
                  <el-option label="美国" value="3"></el-option>
                  <el-option label="印度" value="4"></el-option>
                  <el-option label="德国" value="5"></el-option>
                  <el-option label="韩国" value="6"></el-option>
                  <el-option label="日本" value="7"></el-option>
                  <el-option label="巴西" value="8"></el-option>
                  <el-option label="越南" value="9"></el-option>
                  <el-option label="巴基斯坦" value="10"></el-option>
                  <el-option label="其他" value="11"></el-option>
                </el-select>
              </el-form-item>   
              <el-form-item label="护照ID" v-if="show">
                <el-input v-model="form.passportId" maxlength="20" @keyup.native="proving"></el-input>
              </el-form-item>
              <el-button type="primary" class="btn" @click="next">下一步</el-button>
            </el-form>
          </div>

          <div class="taps">
            <p>注：实名认证分为两步</p>
            <p>第一步：身份认证，请保持您使用本人的真实身份进行验证,我们会保护您的个人信息安全</p>
            <p>第二步：证件上传，请准备身份证正反面照片以及手持身份证正面照和个人签字照</p>
          </div>
        </div>
      
      <div class="upload-wrapper" v-if="isShow1">
        <div class="mark">注：请确保照片的内容完整并清晰可见，支持jpg，JPEG，png图片格式。</div>
        <div class="identity-wrapper" v-if="showImg">
          <div class="content">
            <div class="content-item">
              <div class="default-wrapper">
                <el-upload
                    class="avatar-uploader"
                    action="/user/oss/upload"
                    :show-file-list="false"
                    :on-success="handleSuccess1"
                    :before-upload="() => {}"
                  >
                    <img v-if="imgUrl1" :src="imgUrl1" class="avatar">
                    <i v-else class="el-icon-plus"></i>
                    <span>身份证正面</span>
                  </el-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import {audit} from '@/api/api'
export default {
  data(){
    return {
      isShow:false,
      isShow1:true,
      isAssess:true,
      radio:'1',
      reginVal:1,// 1中国地区，2非中国
      countryType:'',// 国籍id
      show:false,
      form:{
        surname:'',
        name:'',
        number:'',
        country:'',
        passportId:''
      },
      realName:'',
      type:0,

      showImg:true,
      imgUrl1:''
    } 
  },
  created(){
    // console.log(this.reginVal)
  },
  methods:{
    //选择地区
    selectRegin(val){
      this.reginVal = val
      if(val == 1){
        this.form.surname = ''
        this.form.name = ''
        this.show = false
      }else{
        this.form.surname = ''
        this.form.name = ''
        this.show = true
      }
    },
    //选择国籍
    selectCountry(val){
      this.countryType = val
    },
    //护照全数字
    proving(){
      this.form.passportId = this.form.passportId.replace(/[^\d]/g,'') 
    },
    next(){
      var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(this.form.surname == ''){
        this.$message({
          message:'姓氏不能为空',
          type:'warning'
        })
        return;
      }
      if(this.form.name == ''){
        this.$message({
          message:'名字不能为空',
          type:'warning'
        })
        return;
      }
      if(this.form.number == '' && this.reginVal == 1){
        this.$message({
          message:'身份证号不能为空',
          type:'warning'
        })
        return;
      }
      if (!regIdNo.test(this.form.number) && this.reginVal == 1) {
        this.$message({
          message: "身份证号填写有误",
          type: "warning"
        });
        return;
      }
      if (this.countryType == 0 && this.reginVal == 2) {
        this.$message({
          message: "请选择国籍",
          type: "warning"
        });
        return;
      }
      if (this.form.passportId == ""&&this.reginVal == 2) {
        this.$message({
          message: "护照不能为空",
          type: "warning"
        });
        return;
      }
      this.realName = this.form.surname + this.form.name
      if(this.reginVal == 1){
        this.countryType = 1
        this.type = 1
      }else{
        this.type = 2
      }
      if(this.reginVal == 1){
        if(this.realName&&this.countryType&&this.form.number&&this.type){
          let params = {
            user_real_name:this.realName,
            country_id:this.countryType,
            document_id:this.form.number,
            document_type:this.type
          }
          audit(params).then(res=>{
            if(res.message == '成功'){
              this.$message({
                message:'提交成功',
                type:'success'
              })
              this.isShow = false
              this.isShow1 = true
            }
          })
        }
      }else{
        if(this.realName&&this.countryType &&this.form.passportId &&this.type){
          audit({
            user_real_name:this.realName,
            country_id:this.countryType,
            document_id: this.form.passportId,
            document_type: this.type
          }).then(res=>{
            if(res.message == '成功'){
              this.$message({
                message:'提交成功',
                type:'success'
              })
              this.isShow = false
              this.isShow1 = true
            } 
          })
        }
      }
    },
    handleSuccess1(file) {
      console.log(file)
      this.imgUrl1 = file.datas;
    },
  }
}
</script>
<style lang="less" scoped>

</style>
