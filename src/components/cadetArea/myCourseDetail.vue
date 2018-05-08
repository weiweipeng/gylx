/*
我的课程详情
*/

<template>
    <div id="myCourseDetail" v-cloak>
      <loadings :isHide="hide" v-if="isClear"></loadings>
        <!--头图-->
      <img class="img-top" :src="imgUrl" alt="">
      <div class="text-state">
        <img class="icon-notice" src="../../assets/images/course/icon-notice@2x.png" alt="">
        状态：{{stateMsg}}
      </div>
      <div class="line"></div>
      <form v-if="type == 1">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>教学地点</label>
            <input type="text" v-model="data1.Company" readonly>
          </div>
          <!--当教学点地址集合大于一的时候，显示右箭头，以提示用户此项可以选择-->
          <div class="mui-input-row ">
            <label>教学点地址</label>
            <!--<div class="doclick select" id="teaching_addressid" ><span id="teaching_addressidText">{{data.Address}}</span></div>-->
            <input type="text" v-model="data1.TeachingPlace" readonly>
          </div>

          <div class="mui-input-row">
            <label>课程<span class="col-yellow">*</span></label>
            <input type="text" v-model="data1.Title" readonly>
          </div>
          <div class="mui-input-row">
            <label>授课时间</label>
            <input type="text" v-model="data1.TeachingTime" readonly>
          </div>
          <div class="mui-input-row">
            <label>预约人姓名</label>
            <input type="text" id="applicant_name" autocomplete="off" class="mui-input-clear" v-model="data1.UserName" readonly>
          </div>
          <div class="mui-input-row">
            <label>预约人手机</label>
            <input type="text" id="applicant_mobile" class="mui-input-clear" v-model="data1.Phone" maxlength="11" readonly>
          </div>
        </div>
        <button type="button"  class="mui-btn  mui-col-xs-11 btn-submit"  @tap="jump">
          查看课程详情
        </button>
      </form>
      <form v-if="type == 2">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>课程</label>
            <input type="text" id="course_name" v-model="data2.Title"   readonly>
          </div>
          <div class="mui-input-row idcard">
            <label>单位名称</label>
            <input type="text" id="company_name" v-model="data2.WorkUnit" readonly>
          </div>
          <div class="mui-input-row">
            <label>意向日期</label>
            <input type="text" v-model="data2.TeachingDate"  readonly>
          </div>
          <div class="mui-input-row">
            <label>意向时间</label>
            <input type="text" v-model="data2.TeachingTime" readonly>
          </div>
          <div class="mui-input-row">
            <label>上课地点</label>
            <input type="text" id="teaching_location" v-model="data2.TeachingPlace"  readonly>
          </div>
          <div class="mui-input-row">
            <label>手机号码</label>
            <input type="text" id="mobile" maxlength="11" v-model="data2.Phone" readonly>
          </div>
          <div class="mui-input-row">
            <label>人数</label>
            <input type="number" id="join_count" v-model="data2.number"  readonly>
          </div>
          <div class="mui-input-row">
            <label>企业所在区</label>
            <input type="text" v-model="data2.Area" readonly>
          </div>
          <div class="mui-input-row ">
            <label>单位联系人</label>
            <input cid="contacts_name" type="text" v-model="data2.ContactsName" readonly>
          </div>
          <div class="mui-input-row">
            <label>本课程受众组成</label>
            <input type="text" id="course_component"  v-model="data2.AudienceCourse" readonly>

          </div>
          <div class="mui-input-row ">
            <label>意向内容提示</label>
            <input class="mui-navigate-right " id="intentional_content" type="text" v-model="data2.IntentContent" readonly>

          </div>
          <div class="mui-input-row">
            <label>附加服务</label>
            <input class="mui-navigate-right " id="additional_services" type="text" v-model="data2.ServiceNeeds" readonly>
          </div>
        </div>
        <button type="button"  class="mui-btn  mui-col-xs-11 btn-submit"  @tap="jump">
          查看课程详情
        </button>
      </form>
    </div>
</template>

<script>
  import loadings from '../base/loading/loading.vue'
    export default {
        name: 'myCourseDetail',
        data () {
            return {
                "stateMsg":"申请已提交，课程预约受理中",
              "imgUrl":"",
              "inputData":[
                {
                    "type":"课程",
                    "val":"拉丁舞的初级入门课程"
                },{
                    "type":"单位名称",
                  "val":"上海建朗信息科技有限公司"
                }
              ],
              "aid":"",
              "type":"",
              "cid":"",
              "data1":"",
              "data2":"",
              "hide":false,
              "isClear":true
            }
        },
      components:{
        loadings
      },
        methods:{
        	jump(){
        		this.$router.push('/classdetail?id='+this.cid+'&type='+this.type)
        	},
          getdata:function () {
            const that = this;
            const params = {
                "CourseType":that.type,
              "AppointmentId":that.aid
            }
            that.$http.post(that.$httpUrl.getMyAppointDetail,params).then(function (res) {
                console.log(res);
                const code = res.data.code;
              if(!that.hide){
                that.hide = true;
                setTimeout(function () {
                  that.isClear = false;
                },1000)
              }
              if(code == 200){
                if(that.type == 1){
                  that.data1 = res.data.data;
                }else if(that.type == 2){
                  that.data2 = res.data.data;
                }
                switch (res.data.data.Status){
                  case 0:
                    that.stateMsg = "受理中";
                    break
                  case 1:
                    that.stateMsg = "已取消";
                    break
                  case 2:
                    that.stateMsg = "受理成功";
                    break
                  case 3:
                    that.stateMsg = "未受理";
                    break
                  case 5:
                    that.stateMsg = "已反馈";
                    break
                }
                that.imgUrl = res.data.data.FileUrl;
              }else if(code != 306){
                  mui.alert("请求失败");
              }

            },function (err) {

            })
          }
        },
      created(){

      },
      activated(){
        this.hide=false;
        this.isClear=true;
        this.aid = this.$route.query.aid;//预约id
        this.type = this.$route.query.type;//课程类型；1为个人，2为企业
        this.cid = this.$route.query.cid;//课程ID
        this.getdata();
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  [v-cloak]{
    display: none;
  }
  #myCourseDetail{

  }
  .img-top{
    display: block;
    width: 100%;
    height: 175px;
  }
.text-state{
  display: flex;
  align-items: center;
  color: rgb(255,182,0);
  font-size: 15px;
  padding: 13px 0 15px 20px;
}
  .icon-notice{
    width: 16px;
    height: 18px;
    margin-right: 10px;
  }
  .line{
    background-color: rgb(247,247,247);
    height: 10px;
  }
  .text-top{
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 20px;
    font-size: 12px;
    background-color: rgb(244,244,244);
  }
  .mui-input-row{
    height: 50px;
  }
  label{
    text-align: left ;
    height: 100%;
    line-height: 50px;
    padding: 0 0 0 20px ;
    color: rgb(153,153,153);
  }
  label,input{
    font-size: 15px;
  }
  input{
    padding-top: 17.5px;
    padding-left: 15px!important;
    color: rgb(43,43,43);
  }
  .btn-submit{
    height: 40px;
    color: #ffffff;
    border-color: rgb(255,204,0);
    background-color: rgb(255,204,0);
    display: block;
	margin:28px auto;
  }
</style>
<style>

  html,body{
    background-color: #ffffff;
  }
</style>
<!--<style scoped>-->
  <!--.mui-input-group .mui-input-row:after{-->
    <!--/*====大写p是为了让px2rem加载器忽略这个这个属性，保证小屏幕下下划线的可见的====*/-->
    <!--min-height: 1Px;-->
  <!--}-->
  <!--#personalform{-->
    <!--text-align: left;-->
  <!--}-->
  <!--#form-book{-->
    <!--font-size: 12px;-->
    <!--margin-bottom: 10px;-->
    <!--background-color: #F2F2F2;-->
  <!--}-->
  <!--.top{-->
    <!--height: 30px;-->
    <!--line-height: 30px;-->
    <!--padding-left: 20px;-->
    <!--color: rgb(47,47,47);-->
    <!--background-color: rgb(247,247,247);-->
  <!--}-->
  <!--.mui-input-group .mui-input-row{-->
    <!--height: auto!important;-->
  <!--}-->
  <!--.mui-table-view:after{-->
    <!--height: 0!important;-->
  <!--}-->
  <!--#TeachingAddress{-->
    <!--position: relative;-->
  <!--}-->
  <!--.con-select:before{-->
    <!--font-family: Muiicons;-->
    <!--font-size: inherit;-->
    <!--line-height: 1;-->
    <!--content: '\E583';-->
    <!--height: 15px;-->
    <!--width: 15px;-->
    <!--position: absolute;-->
    <!--right: 10px;-->
    <!--top:50%;-->
    <!--display: block;-->
    <!-- -webkit-transform: translateY(-50%);-->
    <!--transform: translateY(-50%);-->
    <!--text-decoration: none;-->
    <!--color: #bbb;-->
    <!-- -webkit-font-smoothing: antialiased;-->
    <!--z-index: 1;-->
  <!--}-->
  <!--/*.mui-table-view-cell{*/-->
  <!--/*padding-left: 0;*/-->
  <!--/*}*/-->
  <!--.mui-input-group .mui-input-row,input,select{-->
    <!--min-height: 50px;-->
    <!--font-size: 14px;-->

  <!--}-->
  <!--.mui-input-row label,input{-->
    <!--padding-top: 18px;-->
    <!--padding-bottom: 18px;-->
  <!--}-->
  <!--label{-->
    <!--color: rgb(153,153,153);-->
    <!--padding-left: 20px;-->
  <!--}-->
  <!--input{-->
    <!--color: rgb(51,51,51);-->
  <!--}-->
  <!--.select{-->
    <!--line-height: 14px;-->
    <!--padding: 18px 15px;-->
    <!--color: rgb(51,51,51);-->
  <!--}-->
  <!--.mui-input-group .mui-input-row:after:last-child{-->
    <!--left: 0;-->
  <!--}-->
  <!--.col-yellow{-->
    <!--color: rgb(245, 224, 0);-->
  <!--}-->
  <!--.tips{-->
    <!--padding-left: 20px;-->
    <!--margin-top: 15px;-->

  <!--}-->
  <!--button{-->
    <!--height: 40px;-->
    <!--border-radius: 5px;-->
    <!--margin-top: 65px;-->

    <!--border-color: rgb(255,204,0);-->
    <!--background-color: rgb(255,204,0);-->
    <!--color: #ffffff;-->
  <!--}-->
  <!--button:disabled{-->
    <!--border-color: rgb(255,229,141);-->
    <!--background-color: rgb(255,229,141);-->
    <!--opacity: 1;-->
  <!--}-->
  <!--#btn_submit{-->
    <!--width: 97%;-->
    <!--margin-left: 1.5%;-->
  <!--}-->
  <!--.mui-input-group:after{-->
    <!--background-color: inherit;-->
  <!--}-->
<!--</style>-->
