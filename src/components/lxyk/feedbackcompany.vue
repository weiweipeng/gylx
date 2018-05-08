<template>
	<div class="form_company">
		 <loadings :isHide="hide" v-if="isClear"></loadings>
		<div class="row1">必填</div>
		<div class="form1_content">
			<div class="form1_row">
				<label>预约编号</label>
				<input type="number"  placeholder="请填写预约编号" v-model="inputtext.ReservationNumber" readonly/>
			</div>
			<div class="form1_row">
				<label>联系人</label>
				<input type="text"  placeholder="联系人" v-model="inputtext.ContactsName" readonly/>
			</div>
			<div class="form1_row" id="all_address">
				<label>授课地点</label>
				<input type="text"  placeholder="请选择授课地点" v-model="inputtext.ClassLocation" readonly/>
				
			</div>
			<div class="form1_row">
				<label>授课日期</label>
				<input type="text"  placeholder="请选择授课日期" v-model="inputtext.IntentionDate" readonly/>
				
			</div>
			<div class="form1_row">
				<label>教师姓名</label>
				<input type="text"  placeholder="请填写教师姓名" v-model="inputtext.TeacherName" readonly/>
			</div>
			<div class="form1_row">
				<label>课程名称</label>
				<input type="text"  placeholder="请填写课程名称" v-model="inputtext.Title" readonly/>
			</div>
			<div class="form1_row">
				<label>单位名称</label>
				<input type="text"  placeholder="请填写单位名称" v-model="inputtext.WorkUnit" readonly/>
			</div>
			<div class="form1_row">
				<label>联系电话</label>
				<input type="number"  v-model="inputtext.Phone"   readonly/>	
			</div>
			<div class="form_row">
				<label>所在区</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio" value="1" v-model="inpu.urban" ><label class="regular-lable"></label><span class="regular-span">市区</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio" value="0" v-model="inpu.urban"><label class="regular-lable"></label><span class="regular-span">郊区</span></span>
				</span>
	        </div>
	        <div class="form1_row">
				<label>教学点</label>
				<input type="text"  placeholder="请选择教学点" id="show_address" value="上海市文化宫" readonly/>
				
			</div>
			<div class="form_row">
				<label>教师授课态度</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio1" value="1" v-model="inpu.TeachingAttitude" ><label class="regular-lable"></label><span class="regular-span">好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio1" value="2" v-model="inpu.TeachingAttitude"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio1" value="3" v-model="inpu.TeachingAttitude"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio1" value="4" v-model="inpu.TeachingAttitude"><label class="regular-lable"></label><span class="regular-span">差</span></span>
				</span>
			</div>
			<div class="form_row">
				<label>教师形态仪表</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio2" value="1" v-model="inpu.ImageBearing" ><label class="regular-lable"></label><span class="regular-span">好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio2" value="2" v-model="inpu.ImageBearing"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio2" value="3" v-model="inpu.ImageBearing"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio2" value="4" v-model="inpu.ImageBearing"><label class="regular-lable"></label><span class="regular-span">差</span></span>
				</span>
			</div>
			<div class="form_row">
				<label>教师准时到达</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio3" value="1" v-model="inpu.ArriveOnTime" ><label class="regular-lable"></label><span class="regular-span">是</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio3" value="2" v-model="inpu.ArriveOnTime"><label class="regular-lable"></label><span class="regular-span">否</span></span>
					
				</span>
			</div>
			<div class="form_row">
				<label>课程完成情况</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio4" value="1" v-model="inpu.CompletionSituation" ><label class="regular-lable"></label><span class="regular-span">好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio4" value="2" v-model="inpu.CompletionSituation"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio4" value="3" v-model="inpu.CompletionSituation"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio4" value="4" v-model="inpu.CompletionSituation"><label class="regular-lable"></label><span class="regular-span">差</span></span>
				</span>
			</div>
			<div class="form_row">
				<label>课程内容质量</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio5" value="1" v-model="inpu.ContentQuality" ><label class="regular-lable"></label><span class="regular-span">好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio5" value="2" v-model="inpu.ContentQuality"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
					
				</span>
			</div>
			<div class="form_row">
				<label>教师总体评价</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio6" value="1" v-model="inpu.TeacherEvaluation" ><label class="regular-lable"></label><span class="regular-span">好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio6" value="2" v-model="inpu.TeacherEvaluation" ><label class="regular-lable"></label><span class="regular-span">较好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio6" value="3"  v-model="inpu.TeacherEvaluation" ><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio6" value="4"  v-model="inpu.TeacherEvaluation" ><label class="regular-lable"></label><span class="regular-span" @tap="checkboxs($event)">差</span></span>
				</span>
			</div>
			<div class="form_row">
				<label>课程总体评价</label>
				<span class="form_detail">
					<span><input type="radio" class="regular-checkbox" name="radio7" value="1" v-model="inpu.CurriculumEvaluation"><label class="regular-lable"></label><span class="regular-span">好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio7" value="2" v-model="inpu.CurriculumEvaluation"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio7" value="3" v-model="inpu.CurriculumEvaluation"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
					<span><input type="radio" class="regular-checkbox" name="radio7" value="4" v-model="inpu.CurriculumEvaluation"><label class="regular-lable"></label><span class="regular-span">差</span></span>
				</span>
			</div>
			<div class="form_area">
				<p>意见和建议</p>
				<div><textarea v-model="inpu.opinion"></textarea></div>
			</div>
			<div class="form_row" style="border: 0px;">
				<input type="submit" class="submit1" @tap="doSubmit" value="提交"/>
			</div>
		</div>
		
	</div>
</template>

<script>
	import loadings from '../base/loading/loading.vue'
	export default {
		name: 'feedbackcompany',
		data(){
			return {
				"hide":false,
                "isClear":true,
				'phonenum':'',
				"check":false,
				"isShow":false,
                "tipsBind":"*输入的账号或密码有误，请重新输入",
                inputtext:{},
                inpu:{}
			}
		},
		components: {
        	   loadings
        },
		methods:{
			selBottom:function(id,data){
				document.activeElement.blur();
				mui.init();
				console.log(data)
				let userPicker = new mui.PopPicker();
				userPicker.setData(data);
				let showAddress=document.getElementById(id);

					userPicker.show(function(items){
						showAddress.value=items[0].text;
					});
			},
			doCheck:function () {
              if(this.phonenum != ''&& this.phonenum && this.checkPhone(this.phonenum) ){
                  this.check = true;
              }else {
                  this.check = false;
              }
              return;
            },
            checkboxs:function(e){
            	    console.log(e.path[0].previousSibling.previousSibling);
//          	    e.path[0].previousSibling.setAttribute('checked','checked')
            },
            checkPhone:function (num) {
                var a = /^1\d{10}$/ ;
                if(num.length != 11 || !a.test(num)) {
                  mui.toast("请输入正确的手机号哦！");
                  return false;
                }
                return true;
            },
            doSubmit:function () {
            	console.log(this.inpu);
               	var that=this;
               	if(that.inpu.Registration_Id && that.inpu.urban && that.inpu.TeachingAttitude && that.inpu.ImageBearing && that.inpu.ArriveOnTime && that.inpu.CompletionSituation && that.inpu.ContentQuality && that.inpu.TeacherEvaluation && that.inpu.CurriculumEvaluation && that.inpu.opinion){
               		this.$http.post(this.$httpUrl.doFeedBack,that.inpu).then(function (response) {  
		              console.log(response);
		              mui.alert("提交成功！");
		              setTimeout(function(){
		              	this.$router.push('/tab');
		              },1000);
		            }).catch(function (error) {
		              console.log(error);
		            })
               	}else{
               		mui.toast("请全部填写！");
               	}
	            
	         },
	          getdata:function(){
	          	var that=this;
	           	var id=this.$route.query.cid;
	           	this.inpu.Registration_Id=id;
	           	var param={
	           		"Registration_Id":id
	           	}
	           
	            this.$http.post(this.$httpUrl.getFeedBackDetail,param).then(function(res){
	            	    console.log(res.data.data);
	            	    that.inputtext=res.data.data[0];
	            	   if(!that.hide){
		                  that.hide = true;
		                  setTimeout(function () {
		                    that.isClear = false;
		                  },1000)
            			}
	            	    console.log(that.inputtext);
	            }).catch(function(error){
	            	
	            	    console.log(error);
	            });
	           }
		},
		activated(){
			this.getdata();
		}
	}
</script>

<style scoped>
	.form_company{
		background: #F0F0F0;
		text-align: left;
		font-size: 0.36rem;
		
	}
	.row1{
		line-height: 1rem;
		padding-left: 5%;
	}
	.form1_content{
		background: white;
		padding-left: 5%;
		padding-right: 5%;
		padding-bottom: 10px;
	}
	.form_company>div{
		
		box-sizing: border-box;
		width: 100%;
	}
	.form1_row>img{
		position: absolute;
		right: 5%;
		top: 0.5rem;
		width: 8px;
	}
	.form1_row{
		position: relative;
		border-bottom:1px solid #f0f0f0;
		line-height: 1.5rem;
		width: 100%;
		height: 1.4rem;
	}
	.form1_row>label{
		width: 30%;
		display: inline-block;
		
	}
	.form1_row>input{
		width: 60%;
		outline: none;
		border: 0px;
		font-size: 0.4rem;
	}
	.regular-checkbox{
		display: none;
	}
	::-webkit-input-placeholder { /* WebKit browsers */  
	    color:    #ddd;  
	}  
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
	   color:    #ddd;  
	  
	}  
	::-moz-placeholder { /* Mozilla Firefox 19+ */  
	   color:    #ddd;  
	  
	}  
	:-ms-input-placeholder { /* Internet Explorer 10+ */  
	   color:    #ddd;  
	}  
	
	.form_row{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 1px solid #f0f0f0;
		background: white;
		height: 1.4rem;
		line-height: 1.5rem;
	}
	.form_row>label{
		width: 3.2rem;
		display: inline-block;
		float: left;
		height: 1.4rem;
	}
	.regular-lable{
		margin-top: 0.5rem;
		float: left;
		margin-right: 2px;
	}
	.regular-span{
		float: left;
	}
	.form_detail:after{
		content: '';
		display: block;
		clear: both;
	}
	.form_detail>span{
		margin-right: 0.2rem;
		display: inline-block;
	}
	.form_detail>span:first-child{
		margin-right: 0.2rem;
	}
	.regular-checkbox{
		float: left;
		
	}
	.form_row span{
		
	}
label {
	display: inline;
}
.regular-checkbox {
	display: none;
}
.regular-checkbox + label {
	background-color: #fafafa;
	border: 1px solid #cacece;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
	padding: 0.24rem;
	border-radius: 50%;
	display: inline-block;
	position: relative;
	transform: scale(0.8,0.8);
}

.regular-checkbox + label:active, .regular-checkbox:checked + label:active {
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
}

.regular-checkbox:checked + label {
	background-color: rgb(38,159,214);
	border: 1px solid #adb8c0;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
	color: #99a1a7;
	border-radius: 50%;
	
}

.regular-checkbox:checked + label:after {
	content: '\2714';
	font-size: 0.26rem;
	position: absolute;
	top: 2px;
	left: 5px;
	color: rgb(255,255,255)!important;
	line-height: 0.43rem;
}
.form_area P{
	height: 1.2rem;
	line-height: 1.2rem;
}
.form_area textarea{
	height: 3rem;
	width: 100%;
	border: 1px solid #ddd;
	outline: none;
}
.submit1{
	background: rgb(255,204,0)!important;
	width: 98%;
	margin-left: 1%;
	height: 1rem;
	border: 0px!important;
	border-radius: 3px;
	margin-top: 10px;
	color: white;
	
}
</style>