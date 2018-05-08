<template>
	<div class="agreement">
		<img src="../../assets/images/index/WechatIMG134.png" />
		<div class="agreeBtn">
			<p><input type="checkbox" class="regular-checkbox inagree" name="radio1"  @click='agreements(agree)' value="好"><label class="regular-lable" ></label><span class="regular-span">我已阅读并遵守此协议！</span></p>
			<button class="agreement_but" :disabled="agree" @tap="jumps">同意</button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'agreement',
		data(){
			return {
				agree:true
			}
		},
		methods:{
			agreements(){
				if(this.agree){
					this.agree=false;
				}else{
					this.agree=true;
				}
				 
				
			},
			jumps(){
				this.$router.push("/teacherDetailForm")
			}
		}
	}
</script>

<style scoped>
	.agreement{
		width: 100%;
		background: white;
		padding-bottom: 30px;
	}
	.agreement img{
		width: 100%;
	}
	.regular-checkbox {
	display: none;
}
.regular-checkbox + label {
	background-color: #fafafa;
	border: 1px solid #cacece;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
	padding: 0.24rem;
	border-radius: 3px;
	display: inline-block;
	position: relative;
	transform: scale(0.8,0.8);
}

.regular-checkbox + label:active, .regular-checkbox:checked + label:active {
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
}

.regular-checkbox:checked + label {
	background-color: rgb(255,204,0);
	border: 1px solid rgb(255,204,0);
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
	color: #99a1a7;
	border-radius: 3px;
	
}

.regular-checkbox:checked + label:after {
	content: '\2714';
	font-size: 0.26rem;
	position: absolute;
	top: 2px;
	left: 3px;
	color: #fff!important;
	line-height: 0.43rem;
}
.regular-lable{
	float: left;
	margin-top: 0!important;
}

.regular-span{
	margin-bottom: 5px;
	float: left;
	
}

.agreeBtn>p{
	margin-left: 2.7rem;
	position: relative;
}
.agreeBtn>p:after{
	content: '';display: block;
	clear: both;
}
.inagree{
	position: absolute;
    left: 4px;
    top: 4px;
    z-index: 1000;
    visibility: hidden;
    display: block;
}
.agreement_but{
	width: 96vw;
	margin-left: 2vw;
	line-height: 0.6rem;
	background: rgb(255,204,0);
	color: white;
	border-radius: 3px;
	margin-top: 30px;
	border: 0px;
}
</style>