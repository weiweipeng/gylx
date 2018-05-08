<template>
	<div class="agreement">
		<img src="../../assets/images/index/WechatIMG146.jpeg" />
		<div class="agreeBtn">
			
			<button class="agreement_but"  @tap="jumps">下一步</button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'agreement',
		data(){
			return {
				
			}
		},
		methods:{
			
			jumps(){
				this.$router.push("/agreement")
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
	
	line-height: 0.6rem;
	background: rgb(255,204,0);
	color: white;
	border-radius: 3px;
	margin-top: 30px;
	border: 0px;
}
</style>