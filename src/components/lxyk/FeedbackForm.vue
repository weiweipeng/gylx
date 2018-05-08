<template>
	<form @submit.prevent="submit">
		 <!--<loadings :isHide="hide" v-if="isClear"></loadings>-->
		<div class="form_row1">
			<label>是否首次预约</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="first_appointment" value="1" checked v-model="inputtext.first_appointment"><label class="regular-lable" ></label><span class="regular-span">是</span></span>
				<span><input type="radio" class="regular-checkbox" name="first_appointment" value="2" v-model="inputtext.first_appointment"><label class="regular-lable"></label><span class="regular-span">否</span></span>
			</span>
        </div>
		<div class="form_row1">
			<label>教师是否准时到达</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="arrive_on_time" value="1" checked v-model="inputtext.arrive_on_time"><label class="regular-lable"></label><span class="regular-span">是</span></span>
				<span><input type="radio" class="regular-checkbox" name="arrive_on_time" value="2" v-model="inputtext.arrive_on_time"><label class="regular-lable"></label><span class="regular-span">否</span></span>
			</span>
		</div>
		<div class="form_row1">
			<label>教师授课态度</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="teaching_attitude" value="1" checked v-model="inputtext.teaching_attitude"><label class="regular-lable"></label><span class="regular-span">好</span></span>
				<span><input type="radio" class="regular-checkbox" name="teaching_attitude" value="2" v-model="inputtext.teaching_attitude"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
				<span><input type="radio" class="regular-checkbox" name="teaching_attitude" value="3" v-model="inputtext.teaching_attitude"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
				<span><input type="radio" class="regular-checkbox" name="teaching_attitude" value="4" v-model="inputtext.teaching_attitude"><label class="regular-lable"></label><span class="regular-span">差</span></span>
			</span>
		</div>
		<div class="form_row1">
			<label>教师形象仪态</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="image_bearing" value="1" checked v-model="inputtext.image_bearing"><label class="regular-lable"></label><span class="regular-span">好</span></span>
				<span><input type="radio" class="regular-checkbox" name="image_bearing" value="2" v-model="inputtext.image_bearing"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
				<span><input type="radio" class="regular-checkbox" name="image_bearing" value="3" v-model="inputtext.image_bearing"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
				<span><input type="radio" class="regular-checkbox" name="image_bearing" value="4" v-model="inputtext.image_bearing"><label class="regular-lable"></label><span class="regular-span">差</span></span>
			</span>
		</div>
		<div class="form_row1">
			<label>课程计划完成情况</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="completion_situation" value="1" checked="checked" v-model="inputtext.completion_situation"><label class="regular-lable"></label><span class="regular-span">好</span></span>
				<span><input type="radio" class="regular-checkbox" name="completion_situation" value="2" v-model="inputtext.completion_situation"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
				<span><input type="radio" class="regular-checkbox" name="completion_situation" value="3" v-model="inputtext.completion_situation"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
				<span><input type="radio" class="regular-checkbox" name="completion_situation" value="4" v-model="inputtext.completion_situation"><label class="regular-lable"></label><span class="regular-span">差</span></span>
			</span>
		</div>
		<div class="form_row1" style="height: 2.4rem;line-height: 1.2rem;">
			<div>课程内容与教学</div>
			<div class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="content_quality" value="1" v-model="inputtext.content_quality" checked><label class="regular-lable"></label><span class="regular-span">非常满意</span></span>
				<span><input type="radio" class="regular-checkbox" name="content_quality" value="2" v-model="inputtext.content_quality"><label class="regular-lable"></label><span class="regular-span">满意</span></span>
				<span><input type="radio" class="regular-checkbox" name="content_quality" value="3" v-model="inputtext.content_quality"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
				<span><input type="radio" class="regular-checkbox" name="content_quality" value="4" v-model="inputtext.content_quality"><label class="regular-lable"></label><span class="regular-span">不满意</span></span>
			</div>
		</div>
		<div class="form_row1">
			<label>课时长度把握</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="course_length" value="1" v-model="inputtext.course_length" checked><label class="regular-lable"></label><span class="regular-span">好</span></span>
				<span><input type="radio" class="regular-checkbox" name="course_length" value="2" v-model="inputtext.course_length"><label class="regular-lable"></label><span class="regular-span">较好</span></span>
				<span><input type="radio" class="regular-checkbox" name="course_length" value="3" v-model="inputtext.course_length"><label class="regular-lable"></label><span class="regular-span">尚可</span></span>
				<span><input type="radio" class="regular-checkbox" name="course_length" value="4" v-model="inputtext.course_length"><label class="regular-lable"></label><span class="regular-span">差</span></span>
			</span>
		</div>
		<div class="form_row1">
			<label>选择课程内容偏好</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="content_preference" value="1" v-model="inputtext.content_preference" checked><label class="regular-lable"></label><span class="regular-span">讲座类</span></span>
				<span><input type="radio" class="regular-checkbox" name="content_preference" value="2" v-model="inputtext.content_preference"><label class="regular-lable"></label><span class="regular-span">实操类</span></span>


			</span>
		</div>
		<div class="form_row1">
			<label style="width: 54%;">是否愿意向别人推荐公益乐学</label>
			<span class="form_detail">
				<span><input type="radio" class="regular-checkbox" name="be_recommend" value="1" v-model="inputtext.be_recommend" checked><label class="regular-lable"></label><span class="regular-span">愿意</span></span>
				<span><input type="radio" class="regular-checkbox" name="be_recommend" value="2" v-model="inputtext.be_recommend"><label class="regular-lable"></label><span class="regular-span">不愿意</span></span>
			</span>
		</div>
		<div class="form_area">
			<p>意见和建议</p>
			<div><textarea v-model="inputtext.opinion"></textarea></div>
		</div>
		<div class="form_row1">
			<input type="submit" class="submit1" value="提交"/>
		</div>
	</form>
</template>

<script>
//	import loadings from '../base/loading/loading.vue'
	export default {
		name: 'FeedbackForm',
		data(){
			return{
//				"hide":false,
//              "isClear":true,
				inputtext:{}
			}
		},
//		components: {
//      	   loadings
//      },
		methods:{
			submit: function() {  
                   var that=this;
                   
                    if(this.inputtext.first_appointment&&this.inputtext.arrive_on_time&&this.inputtext.teaching_attitude&&this.inputtext.image_bearing&&this.inputtext.completion_situation&&this.inputtext.content_quality&&this.inputtext.course_length&&this.inputtext.content_preference&&this.inputtext.be_recommend&&this.inputtext.opinion){
                    	   console.log(this.inputtext); 
                    	   that.$http.post(this.$httpUrl.doPersonalFeedBack,that.inputtext).then(function(res){
                    	   	console.log(res);
                    	   	 mui.alert("提交成功！");
                    	   	 setTimeout(function(){
			              	this.$router.push('/tab');
			              },1000);
                    	   }).catch(function(error){
                    	   	console.log(error);
                    	   });
                    }else{
                    	   mui.toast("请全部填写!")
                    }
                } 
		},
		created(){
			var id=this.$route.query.cid;
            console.log(id);
            this.inputtext.appointment_id=id;
		}
	}
</script>

<style scoped>
	form{
		width: 100%;
		box-sizing: border-box;
		padding:0.4rem 0.4rem 0px 0.4rem;
		text-align: left!important;
		background: white;
		padding-bottom: 2rem;
	}
	.form_row1{
		width: 100%;
		height: 1rem;
		line-height: 1rem!important;
		border-bottom: 1px solid #f0f0f0;
		
	}
	.form_row1>label{
		width: 3.2rem;
		display: inline-block;
		float: left;
	}
	.regular-lable{
		margin-top: 0.2rem;
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
	left: 4px;
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
	background: rgb(255,229,141);
	width: 98%;
	margin-left: 1%;
	height: 1rem;
	border: 0px;
	border-radius: 3px;
	margin-top: 10px;
	color: white;
}
</style>