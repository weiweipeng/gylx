<template>
	<div class="form_company">
		<div class="row1">必填</div>
		<div class="form1_content">
			<div class="form1_row formactive">
				<label>姓名</label>
				<input type="text"  placeholder="姓名" v-model="inputtext.Name" required/>
			</div>
			<div class="form1_row formactive">
				<label>身份证号</label>
				<input type="number"  placeholder="身份证号" v-model="inputtext.CardID" @blur="docheckID" required/>
			</div>
			<div class="form1_row formactive" id="all_address">
				<label>性别</label>
				<input type="text"  placeholder="性别" id="Sex" v-model="inputtext.Sex	" @click="selBottom('Sex',list)" required/>
				<img src="../../assets/images/ioncfontlogo/right.png" />
			</div>
			<div class="form1_row formactive">
				<label>出生年月</label>
				<input type="text"  placeholder="出生年月" id="show_date" v-model="inputtext.Birth" @click="seldate('show_date')" required/>
				<img src="../../assets/images/ioncfontlogo/right.png" />
			</div>
			<div class="form1_row formactive">
				<label>民族</label>
				<input type="text"  placeholder="请填写民族" v-model="inputtext.Nation" required/>
			</div>
			<div class="form1_row formactive">
				<label>特长</label>
				<input type="text"  placeholder="请填写特长" v-model="inputtext.Specialty" required/>
			</div>
			<div class="form1_row formactive">
				<label>户籍地址</label>
				<input type="text"  placeholder="请填写户籍地址" v-model="inputtext.PermanentAddress" required/>
			</div>
			<div class="form1_row formactive">
				<label>文化程度</label>
				<input type="text"  placeholder="请填写文化程度" id="Education" v-model="inputtext.Education" @click="selBottom('Education',listlocal)" required/>
				<img src="../../assets/images/ioncfontlogo/right.png" />
			</div>
			<div class="form1_row formactive">
				<label>政治面貌</label>
				<input type="text"  placeholder="请填写政治面貌" id="Political" v-model="inputtext.Political" @click="selBottom('Political',listTeam)" required/>
				<img src="../../assets/images/ioncfontlogo/right.png" />
			</div>
			<div class="form1_row formactive">
				<label>在沪工作区</label>
				<input type="text"  placeholder="请填写地点" id="Area" v-model="inputtext.Area" @click="selBottom('Area',listAreas)" required/>
				<img src="../../assets/images/ioncfontlogo/right.png" />
			</div>
			<div class="form1_row formactive">
				<label>现任职务</label>
				<input type="text"  placeholder="请填写现任职务" v-model="inputtext.Post" required/>	
			</div>
			<div class="form1_row formactive">
				<label>通讯地址</label>
				<input type="text"  placeholder="请填写通讯地址" v-model="inputtext.MailingAddress" required/>	
			</div>
			<div class="form1_row formactive">
				<label>邮政编码</label>
				<input type="number" v-model="inputtext.ZipCode"  placeholder="请填写邮政编码" required/>	
			</div>
			<div class="form1_row formactive">
				<label>手机</label>
				<input type="number"  @blur="doCheck" v-model="inputtext.Phone"   placeholder="请填写手机号码" required/>	
			</div>
			<div class="form1_row formactive">
				<label>电子邮箱</label>
				<input type="email" v-model="inputtext.EMail" placeholder="请填写电子邮箱" required/>	
			</div>
			<div class="form_row2 formactive">
				<label>课时金支付账户名</label>
				<input type="text" v-model="inputtext.AccountName"  placeholder="请填写账户名" required/>	
			</div>
			<div class="form1_row formactive">
				<label>账号</label>
				<input type="number" v-model="inputtext.Account" placeholder="请填写账号" required/>	
			</div>
			<div class="form1_row formactive">
				<label>开户行</label>
				<input type="text" v-model="inputtext.BankAccount" placeholder="请填写开户行" required/>	
			</div>
			<div class="form_row3 formactive">
				<p>主要文体活动经历（可提供的课程、教育背景、所学专业、参与团队或协会、活动内容、获奖情况等）</p>
				<div>参加活动获奖、参加活动获奖、参加活动获奖</div>
			</div>
			
			<div class="form_row" style="border: 0px;">
				<input type="submit" class="submit1" value="提交" @tap='doSubmit'/>
			</div>
		</div>
		
	</div>
</template>

<script scoped>
	export default {
		name: 'feedbackcompany',
		data(){
			return {
				list:[{
					text:'男'
				},{
					text:'女'
				}],
				
				listlocal:[{
					text:'博士'
				},{
					text:'硕士'
				},{
					text:'本科'
				},{
					text:'大专'
				},{
					text:'中专'
				}],
				listTeam:[{
					text:'中共党员'
				},{
					text:'共青团员'
				},{
					text:'无党派人士'
				},{
					text:'群众'
				},{
					text:'民主党派人士'
				}],
				listAreas:[{
					text:'浦东新区'
				},{
					text:'杨浦区'
				},{
					text:'黄浦区'
				},{
					text:'徐汇区'
				},{
					text:'长宁区'
				},{
					text:'静安区'
				},{
					text:'普陀区'
				},{
					text:'虹口区'
				},{
					text:'闵行区'
				},{
					text:'宝山区'
				},{
					text:'嘉定区'
				},{
					text:'金山区'
				},{
					text:'松江区'
				},{
					text:'青浦区'
				},{
					text:'奉贤区'
				}],
				'phonenum':'',
				"check":true,
				"isShow":false,
                "tipsBind":"*输入的账号或密码有误，请重新输入",
                inputtext:{}
			}
		},
		methods:{
			selBottom:function(id,data){
				document.activeElement.blur();
				mui.init();
				
				let userPicker = new mui.PopPicker();
				userPicker.setData(data);
				console.log(id);
				let showAddress=document.getElementById(id);
				var that=this;
              
					userPicker.show(function(items){
						showAddress.value=items[0].text;
						console.log(id);
						if(id=='Sex'){
							that.inputtext.Sex=items[0].text;
						}else if(id=='Education'){
							that.inputtext.Education=items[0].text;
						}else if(id=='Political'){
							that.inputtext.Political=items[0].text;
						}else if(id=='Area'){
							that.inputtext.Area=items[0].text;
						}
						
						console.log(that.inputtext);
					});
			},
			seldate:function(id){
				document.activeElement.blur();
				mui.init();
				var dtPicker = new mui.DtPicker({"type": "date"});
				let showAddress=document.getElementById(id);
				var that=this;
				dtPicker.show(function(res){
					console.log(that);
					showAddress.value=res.value;
					that.inputtext.Birth=res.value;
				});
			},
			docheckID:function(num){
			    var reg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			   
			    if(!reg.test(this.inputtext.CardID)){
			    	    mui.toast("请输入正确的身份证号！");
			    	    this.check=false;
			    	    return false;
			    }
			    return true;
			},
			doCheck:function () {
              if(this.inputtext.Phone != ''&& this.inputtext.Phone && this.checkPhone() ){
//                this.check = true;
              }else {
                  this.check = false;
              }
              return;
            },
            checkPhone:function () {
//          	console.log(num);
                var a = /^1\d{10}$/ ;
                if(this.inputtext.Phone.length != 11 || !a.test(this.inputtext.Phone)) {
                  mui.toast("请输入正确的手机号哦！");
                  
                  return false;
                }
                return true;
            },
            doSubmit:function () {
            	console.log(this.inputtext);
	            if(this.check){
	            	      this.$http.post(this.$httpUrl.doInstructor,this.inputtext).then(function (response) {
			              console.log(response);
			              mui.alert("提交成功！");
			          }).catch(function (error) {
			              console.log(error);
			          })
	            }else{
	            	    mui.alert("请全部填写正确！")
	            }
	         }
		},
		mounted() {
			var that=this;
			
		}
	}
</script>

<style>
	.formactive>input{
		width: 55%!important;
		border: 0!important;
	}
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
	.form_row2{
		border-bottom:1px solid #f0f0f0;
		
		width: 100%;
		height: 1.4rem;
	}
	.form_row2>label{
		width: 30%;
		display: inline-block;
		
	}
	.form_row2>input{
		width: 60%;
		outline: none;
		border: 0px;
		
	}
	.form_row3{
		border-bottom: 1px solid #F0F0F0;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.form_row3>div{
		margin-top: 15px;
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
	color: white;
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