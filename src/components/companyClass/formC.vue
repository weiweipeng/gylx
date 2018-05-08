<template>

    <div id="companyform" class="mui-content">
      <loadings :isHide="hide" v-if="isClear"></loadings>
      <form >
        <div class="text-top" >
          必填
        </div>
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>课程</label>
            <input type="text" id="course_name"  placeholder="请输入课程" v-model="CourseName" readonly>
          </div>
          <div class="mui-input-row idcard">
            <label>单位名称</label>
            <input type="text" id="company_name"  placeholder="请填写单位名称" v-model="WorkUnit" >
          </div>
          <div class="mui-input-row">
            <label>意向日期</label>
           <input type="text"  placeholder="请选择" id="show_date" @click="seldate('show_date')" v-model="IntentionDate" required/>
			<span class="rigthlogo mui-icon mui-icon-arrowright"></span>
          </div>
          <div class="mui-input-row">
            <label>意向时间</label>
            <input type="text" id="intention_hour"  placeholder="每堂课为一个半小时" @click="seldate1('intention_hour')" v-model="IntentionTime" required>
            <span class="rigthlogo mui-icon mui-icon-arrowright"></span>
          </div>
          <div class="mui-input-row">
            <label>上课地点</label>
            <input type="text" id="teaching_location"  placeholder="请填写具体地址" v-model="ClassLocation">
          </div>
          <div class="mui-input-row">
            <label>手机号码</label>
            <input type="text" id="mobile" maxlength="11" placeholder="请填写手机号" v-model="Phone">
          </div>
          <div class="mui-input-row">
            <label>人数</label>
            <input type="number" id="join_count"  placeholder="人数须在30人以上" v-model="Number1">
          </div>
          <div class="mui-input-row">
            <label>企业所在区</label>
            <div class="doclick select mui-navigate-right" v-bind:class="{'col-43':!doContrast(Area,'请选择')}" id="Area" @click="doSelect" v-text="Area"></div>
          </div>
          <div class="mui-input-row ">
            <label>单位联系人</label>
            <input class="mui-navigate-right "id="contacts_name" type="text" placeholder="请填写单位联系人名字" v-model="ContactsName">
          </div>
        </div>
        <div class="text-top">
          选填
        </div>
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>本课程受众组成</label>
            <input type="text" id="course_component"  placeholder="可选填" v-model="AudienceCourse">

          </div>
          <div class="mui-input-row ">
            <label>意向内容提示</label>
            <input class="mui-navigate-right " id="intentional_content" type="text" placeholder="可选填" v-model="IntentContent">

          </div>
          <div class="mui-input-row">
            <label>附加服务</label>
            <input class="mui-navigate-right " id="additional_services" type="text" placeholder="可选填" v-model="ServiceNeeds">
          </div>

        </div>
        <button type="button" id="btn-submit" class="mui-btn  mui-col-xs-11"  @tap="postData">
         		 提交
        </button>
      </form>
    </div>
</template>

<script>
  import loadings from '../base/loading/loading.vue'
    export default {
        name: 'companyform',
        data () {
            return {
                "CourseName":"",
              "CourseId":"",
              "WorkUnit":"",
              "IntentionDate":"",
              "IntentionTime":"",
              "ClassLocation":"",
              "Phone":"",
              "Number1":"",
              "Area":"请选择",
              "ContactsName":"",
              "ServiceNeeds":"",
              "AudienceCourse":"",
              "IntentContent":"",
              "hide":false,
              "isClear":true
            }
        },
      components:{
        loadings
      },
      methods:{
      		postData:function(){
      		    const that = this;

      			   const formData = {
                 "CourseId":that.CourseId,
                 "WorkUnit":that.WorkUnit,
                 "IntentionDate":that.IntentionDate,
                 "IntentionTime":that.IntentionTime,
                 "ClassLocation":that.ClassLocation,
                 "Phone":that.Phone,
                 "Number":that.Number1,
                 "Area":that.Area,
                 "ContactsName":that.ContactsName,
                 "ServiceNeeds":that.ServiceNeeds,
                 "AudienceCourse":that.AudienceCourse,
                 "IntentContent":that.IntentContent
               }
               console.group("校验前的参数：");
      			   console.log(formData);
      			   console.groupEnd();
                if(formData.CourseId!=""&&formData.WorkUnit!=""&&formData.IntentionDate!=""&&formData.IntentionTime!=""&&formData.ClassLocation!=""&&formData.Phone!=""&&formData.Number!=""&&formData.Area!=""&&formData.Area!="请选择"&&formData.ContactsName!=""){
                    if(!that.checkPhone(formData.Phone)){
                        console.log("手机号验证不通过");
                        return;
                    }else if(parseInt(formData.Number)<30){
                        mui.alert("人数必须在30人以上");
                        console.log("人数不足");
                        return;
                    }
                }else {
                  mui.alert("请填写所有的必填项");
                  return;
                }
               console.group("马上要提交的参数:");
      			   console.log(formData);
      			   console.groupEnd();
      			   this.$http.post(that.$httpUrl.CousrseEnroll, formData).then((response) => {
		              // success callback
		              console.log(response)
                 const code = response.data.code;
		              let msg = ""
		              switch (code){
                    case 500:
                        msg = "预约成功";
                        break;
                    case 300:
                        msg = "预约失败，请检查您填写的内容是否有误";
                        break;
                    case 514:
                        msg = "预约失败";
                        break
                  }
                  mui.alert(msg);
		          }, (error) => {
		              // error callback
		              console.log(error)
		          });
      		},
        check:function (d) {

        },
        checkPhone:function (num) {
          const a = /^1\d{10}$/;
          if(num.length != 11 || !a.test(num)) {
            mui.toast("请输入正确的手机号哦！");
            return false;
          }
          return true;
        },
      		seldate:function(id){
      			document.activeElement.blur();
				mui.init();
				var that =this;
				var dtPicker = new mui.DtPicker({"type": "date"})
				dtPicker.show(function(res){
					that._data.IntentionDate=res.value;
				});

			},
			seldate1:function(id){
				document.activeElement.blur();
				console.log(id)
				var that =this;
				mui.init();
				var dtPicker = new mui.DtPicker({"type": "time"});
					dtPicker.show(function(res){
					that._data.IntentionTime=res.value;
				});
			},
            doSelect:function () {
            	document.activeElement.blur();
              var that = this;
              var districtpocker = new mui.PopPicker();
              districtpocker.setData([{
                value: '0',
                text: '黄浦区'
              }, {
                value: '1',
                text: '徐汇区'
              }, {
                value: '2',
                text: '长宁区'
              }, {
                value: '3',
                text: '静安区'
              }, {
                value: '4',
                text: '普陀区'
              }, {
                value: '5',
                text: '虹口区'
              }, {
                value: '6',
                text: '杨浦区'
              }, {
                value: '7',
                text: '闵行区'
              }, {
                value: '8',
                text: '宝山区'
              }, {
                value: '9',
                text: '嘉定区'
              }, {
                value: '10',
                text: '浦东新区'
              }, {
                value: '11',
                text: '金山区'
              },{
                value: '12',
                text: '松江区'
              },
                {
                  value: '13',
                  text: '青浦区'
                }, {
                  value: '14',
                  text: '奉贤区'
                }, {
                  value: '15',
                  text: '崇明区'
                } ]);
              districtpocker.show(function(selectItems) {
               that.Area = selectItems[0].text;

              })
            },
            doContrast:function (a,b) {//对传入参数进行比较
                if(a == b){
                    return true;
                }
                return false;
            }
      },
      activated(){
        const that = this;
        that.hide=false;
        that.isClear=true;
        that.CourseId=that.$route.query.cid;
        that.$http.post(that.$httpUrl.getCourseInformationTitle,{"CourseId":that.CourseId}).then((res)=>{
          console.log(res);
        if(!that.hide){
          that.hide = true;
          setTimeout(function () {
            that.isClear = false;
          },1000)
        }
          const code = res.data.code;
          if(code == 200){
            that.CourseName = res.data.data;
          }else {
              mui.alert("很抱歉，服务繁忙");
          }

        },(err)=>{
          console.log(err);
        })
      },
      mounted(){

      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #btn-submit{
    height: 40px;
    display: block;
    margin: 28px auto;
    color: #ffffff;
    border-color: rgb(255,204,0);
    background-color: rgb(255,204,0);

  }
  form{
    padding-bottom: 5px;
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
    height: 50px!important;
  }
  label{
    text-align: left ;
    height: 100%;
    line-height: 50px!important;
    padding: 0 0 0 20px ;
    color: rgb(153,153,153);
    padding: 0!important;
    padding-left: 15px!important;
  }
  input{
  	   height: 100%!important;
  	   padding-top: 0!important;
  	   padding-bottom: 0!important;
  	   color: rgb(43,43,43);
  }
  label,input{
    font-size: 15px;

  }
  .select{
    line-height: 50px!important;
    font-size: 15px;
    color: rgb(204,204,204);
    text-align: left;
    margin-left: 35%;
    /*padding-left: 15px;*/
  }
  input::-webkit-input-placeholder
  {
    color: rgb(204,204,204);
  }

  input[type="date"]:before {
    color:  rgb(204,204,204);
    content: attr(placeholder);
  }

  input[type="date"].full:before {
    color: black;
    content: ""!important;
  }

  input[type="time"]:before {
    color:  rgb(204,204,204);
    content: attr(placeholder);
  }

  input[type="time"].full:before {
    color: black;
    content: ""!important;
  }
  .col-43{
    color: rgb(43,43,43)!important;
  }
  .rigthlogo{
  	display: block;
  	width:15px;
  	height: 15px;
  	font-size: 15px;
  	color: #bbb;
  	position: absolute;
  	right: 18px;
  	top: 16px;
  }
</style>
<style scoped>
  body{
    background-color: #ffffff!important;
  }
  .mui-content{
    background-color: #ffffff!important;
  }

</style>
