<template>
  <div class="mui-content" id="personalform">
    <loadings :isHide="hide" v-if="isClear"></loadings>
    <form id="form-book">
      <div class="top" >
        必填
      </div>
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>教学地点</label>
          <div class="doclick select" id="teaching_pointid" ><span id="teaching_pointidText">{{data.TeachingPointCompany}}</span></div>
        </div>
        <!--当教学点地址集合大于一的时候，显示右箭头，以提示用户此项可以选择-->
        <div class="mui-input-row " v-bind:class="{'con-select':data.TeachingAddress.length>1}">
          <label>教学点地址</label>
          <!--<div class="doclick select" id="teaching_addressid" ><span id="teaching_addressidText">{{data.Address}}</span></div>-->
          <select id="TeachingAddress" v-model="selectV" v-bind:disabled="isSelect">
            <option v-for="item in data.TeachingAddress" v-bind:value="item.Address" v-text="item.Address" ></option>
          </select>
        </div>

        <div class="mui-input-row">
          <label>课程<span class="col-yellow">*</span></label>
          <div class="doclick select" id="course_name" ><span id="course_nameText">{{data.CourseTitle}}</span></div>
        </div>
        <div class="mui-input-row">
          <label>授课时间</label>
          <div class="doclick select" id="course_time" ><span id="course_timeText">{{data.CourseTeachingTime}}</span></div>
        </div>
        <div class="mui-input-row">
          <label>预约人姓名</label>
          <input type="text" id="applicant_name" autocomplete="off" class="mui-input-clear" v-model="applicant_name" @keyup="doCheck" placeholder="请填写姓名" >
        </div>
        <div class="mui-input-row">
          <label>预约人手机</label>
          <input type="text" id="applicant_mobile" class="mui-input-clear" v-model="applicant_mobile" maxlength="11" @keyup="doCheck" placeholder="请填写11位手机号码">
        </div>
        <div class="tips col-yellow" >*(每个人每个时间段只能报所有教学点的一门课程)</div>
        <button type="button" id="btn_submit" class="mui-btn mui-col-xs-12" @click="doSubmit" v-bind:disabled="!check">
          提交
        </button>
      </div>
    </form>
    <base-mask  v-if="maskShow"></base-mask>
    <!--提交成功弹窗-->
    <div id="con-success" v-if="isSubmitSuccess">
      <img class="icon-close" @tap.stop="isSubmitSuccess=false,maskShow=false" src="../../assets/images/form/icon-close-g@2x.png" alt="" />
      <img class="icon-success" src="../../assets/images/form/success@2x.png" alt="">
      <h4 class="title-ss">提交成功</h4>
      <p class="text-ss">
        您的预约已收到，我们会尽快给予您回复 <br>
        谢谢!
      </p>
    </div>
    <!--绑定弹窗-->
    <div id="con-bind" v-show="isBind">
     <h4 class="title-bind">绑定申工社账号</h4>
      <img class="icon-close" @click="isBind=false,maskShow = false" src="../../assets/images/form/icon-close-g@2x.png" alt="">
      <img class="logo" src="../../assets/images/form/logo@2x.png" alt="">
      <form id="form-bind" class="mui-input-group">
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear" placeholder="申工社账号" v-model="sgsdata.name">
        </div>
        <div class="mui-input-row">
          <input type="password" class="mui-input-password" placeholder="密码" v-model="sgsdata.pwd">
        </div>
        <div class="tips-bind" v-text="tipsBind"></div>
        <button type="button" id="btn-bind" class="mui-btn" @tap="doBind">一键绑定</button>
        <a class="link" href="#">
          没有账号？  前去下载申工社注册
        </a>
      </form>
    </div>
    <!--绑定成功弹窗-->
    <div id="con-bs" v-if="isBindSuccess">
      <img class="icon-c-w" @tap="isBindSuccess = false,maskShow=false" src="../../assets/images/form/icon-close-w@2x.png" alt="">
      <img class="pop-success" src="../../assets/images/form/pop-success@2x.png" alt="">
      <button type="button" id="btn-goto" class="mui-btn" @tap="isBindSuccess = false,maskShow=false,applicant_name='',applicant_mobile=''">去约课</button>
    </div>
  </div>
</template>

<script>
//  import '../../../static/css/mui.picker.css'
//引入蒙版
import baseMask from '../base/mask'
import loadings from '../base/loading/loading.vue'
  import axios from  'axios'
    export default {
        name: 'personalform',
        data () {
            return {
                "cid":"",
                "check":false,
              "isSelect":false,
              "selectV":"",
              "applicant_name":"",
              "applicant_mobile":"",
                data:{
                  "TeachingPointCompany":"",
                  "TeachingAddress":[{"Address":""}],
                  "CourseTitle":"",
                  "CourseTeachingTime":"",
                },
              sgsdata:{
                  "name":"",
                "pwd":""
              },
              "isBind":false,
              "isBindSuccess":false,
              "isSubmitSuccess":false,
              "maskShow":false,
              "tipsBind":"",
              "hide":false,
              "isClear":true
            }
        },
      methods:{
      			 getdata:function (){
								const that = this;
								const params={
                  "course_id":that.cid
                }
			          this.$http.post(that.$httpUrl.getPersonalCourseDetail,params).then((response) => {
			          	console.log(response);
               if(!that.hide){
                 that.hide = true;
                 setTimeout(function () {
                   that.isClear = false;
                 },1000)
               }
			              that.data = response.data.data
                    that.selectV = that.data.TeachingAddress[0].Address;
			          	  if(that.data.isLogin == "0"){
			          	      that.isBind = true;
			          	      that.maskShow = true;
                    }
			           }, (err) => {
			              console.log('服务器请求错误');
			            }
			          )

			        },
            doCheck:function () {
              if(this.applicant_name != ''&& this.applicant_mobile  && this.data.TeachingPointCompany!= '' && this.data.TeachingAddress != '' && this.data.CourseTitle != '' && this.data.CourseTeachingTime != ''  ){
                  this.check = true;
              }else {
                  this.check = false;
              }
              return;
            },
            checkPhone:function (num) {
                const a = /^1\d{10}$/;
                if(num.length != 11 || !a.test(num)) {
                  mui.toast("请输入正确的手机号哦！");
                  return false;
                }
                return true;
            },
          doSubmit:function () {
      			     const that = this;
      			     if(!that.checkPhone(that.applicant_mobile)){
      			         return
                 }
      			     console.log("校验通过");
      			     that.check = false;//禁用按钮防止用户重复点击
      			 const url =  '/api/api/doPersonalAppointment';
      			 const params = {
               "course_id":that.cid,
               "address":that.selectV,
               "name":that.applicant_name,
               "mobile":that.applicant_mobile
             }
             console.log(params);
            axios.post(that.$httpUrl.doPersonalAppointment,params).then(function (response) {
              console.log(response);
              const  code = response.data.code;
              if(code == 314){
                  mui.confirm("您还没有绑定申工社账号，无法进行预约","提示",["去绑定","取消"],function (e) {
                    console.group("点击确认框的返回");
                    console.log(e);
                    console.groupEnd();
                    if(e.index == 0){
                        //去绑定
                      that.isBind = true;
                      that.maskShow = true;
                    }
                  })
              }else if(code == 500){
                  that.isSubmitSuccess = true;
                  that.maskShow = true;
                that.isSelect = true;
              }else if(code==301){
                  mui.alert("您已预约过该课程，请不要重复预约");
              }
            }).catch(function (error) {
              console.log(error);
            })
          },
        doBind:function () {
            const that = this;
            if(that.sgsdata.name == "" || that.sgsdata.pwd ==""){
                console.log("绑定校验不通过");
                that.tipsBind = "*输入的账号或密码有误，请重新输入";
              return
            }
          that.tipsBind = "";
          const url = "/api/api/doMemberBindOpenid";
          const params = {
              "name":that.sgsdata.name,
            "pwd":that.sgsdata.pwd
          }
          that.$http.post(url,params).then((response)=>{
              console.group("用户绑定接口的回调");
              console.log(response);
              const  code = response.data.code;
              if(code==500){
                  that.isBind = false;
                  that.isBindSuccess = true;
              }else {
                mui.alert(response.data.message);
              }

              console.groupEnd();
          },(response)=>{

          })

        }
      },
      activated(){
        this.hide=false;
        this.isClear=true;
        this.cid=this.$route.query.cid;
        this.getdata();
      },
      components:{
        baseMask,
        loadings
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mui-input-group .mui-input-row:after{
    /*====大写p是为了让px2rem加载器忽略这个这个属性，保证小屏幕下下划线的可见的====*/
    min-height: 1Px;
  }
#personalform{
  text-align: left;
}
#form-book{
  font-size: 12px;
  margin-bottom: 10px;
  background-color: #F2F2F2;
}
  .top{
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    color: rgb(47,47,47);
    background-color: rgb(247,247,247);
  }
.mui-input-group .mui-input-row{
 height: auto!important;
}
.mui-table-view:after{
  height: 0!important;
}
#TeachingAddress{
  position: relative;
}
.con-select:before{
  font-family: Muiicons;
  font-size: inherit;
  line-height: 1;
  content: '\E583';
  height: 15px;
  width: 15px;
  position: absolute;
  right: 10px;
  top:50%;
  display: block;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  text-decoration: none;
  color: #bbb;
  -webkit-font-smoothing: antialiased;
  z-index: 1;
}
/*.mui-table-view-cell{*/
  /*padding-left: 0;*/
/*}*/
.mui-input-group .mui-input-row,input,select{
  min-height: 50px;
  font-size: 14px;

}
.mui-input-row label,input{
  padding-top: 18px;
  padding-bottom: 18px;
}
label{
  color: rgb(153,153,153);
  padding-left: 20px;
}
input{
  color: rgb(51,51,51);
}
 .select{
   line-height: 14px;
   padding: 18px 15px;
   color: rgb(51,51,51);
 }
.mui-input-group .mui-input-row:after:last-child{
  left: 0;
}
.col-yellow{
  color: rgb(245, 224, 0);
}
  .tips{
    padding-left: 20px;
    margin-top: 15px;

  }
  button{
    height: 40px;
    border-radius: 5px;
    margin-top: 65px;

    border-color: rgb(255,204,0);
    background-color: rgb(255,204,0);
    color: #ffffff;
  }
button:disabled{
  border-color: rgb(255,229,141);
  background-color: rgb(255,229,141);
  opacity: 1;
}
#btn_submit{
	width: 97%;
	margin-left: 1.5%;
}
.mui-input-group:after{
  background-color: inherit;
}
</style>
<style scoped>
  html{
    height: 100%;
    background-color: #ffffff;
  }
  #con-bind{
    position: fixed;
    top:23px;
    left: 50%;
    width: 340px;
    height: 440px;
    margin-left: -170px;
    border-radius: 10px;
    background-color: #ffffff;
    z-index: 10;
  }
  .title-bind{
    margin-top: 40px;
    font-size: 18px;
    text-align: center;
  }
  .icon-close{
    position: absolute;
    top:14px;
    right: 19px;
    width: 20.5px;
    height: 20.5px;
  }
  .logo{
    position: absolute;
    top:90px;
    left: 50%;
    margin-left: -33.75px;
    width: 67.5px;
    height: 69px;
  }
  #form-bind{
    position: absolute;
    top:200px;
    left: 15px;
    right: 15px;
    text-align: center;
  }
  #form-bind:before{
    height: 0;
  }
  .tips-bind{
    font-size: 12px;
    padding-left: 15px;
    margin-top: 10px;
    color: red;
    text-align: left;
  }
  #btn-bind{
    margin-top: 15px;
    height: 40px;
    border-radius: 40px;
    width: 100%;
  }
  .link{
    font-size: 12px;
    color: rgb(255,204,0);
    display: inline-block;
    margin-top: 20px;
  }
</style>
<style scoped>
  #con-success{
    position: fixed;
    top:100px;
    left: 50%;
    margin-left: -151.5px;
    width: 303px;
    height: 278px;
    background-color: #ffffff;
    border-radius: 5px;
    z-index: 11;
  }
  .icon-success{
    position: absolute;
    top:55px;
    left: 50%;
    margin-left: -48.5px;
    width: 97px;
    height: 97px;
  }
  .title-ss{
    position: absolute;
    top:180px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 20px;
    color: rgb(51,51,51);
  }
  .text-ss{
    position: absolute;
    top:215px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 15px;
  }
  #con-bs{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
  }
  .icon-c-w{
    position: absolute;
    top:35px;
    right: 20px;
    width: 20px;
    height: 20px;
  }
  .pop-success{
    width: 256.5px;
    height: 321.5px;
    position: absolute;
    top:35px;
    left: 50%;
    margin-left: -128.25px;
  }
  #btn-goto{
    width: 180px;
    height: 32px;
    position: absolute;
    top:306px;
    left: 50%;
    margin-left: -90px;
    margin-top: 0;
    border-radius: 32px;
  }
</style>
<style>
  html{
    height: 100%;
    background-color: #ffffff;
  }
</style>
