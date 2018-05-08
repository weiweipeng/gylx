<template>
	<div class="myindex">
		<loadings :isHide="hide" v-if="isClear"></loadings>
		<div class="imgbox">
			<img :src="userimg"  class="userimg" />
			<p class="username">{{username}}</p>
			<div class="indexboxbottm mui-clearfix">
				<div class="mui-pull-left indexleft">
					<router-link to="/myintegral">
					<img src="../../assets/images/myindexpic/myjf@3x@2x.png"/>我的积分：{{userjf}}
					</router-link>
				</div>
				<div class="mui-pull-right indexright">
					<router-link to="/myMsg">
					<img src="../../assets/images/myindexpic/info@2x.png"/>
					</router-link>消息
					<!--<span v-text="num1"></span>-->
				
				</div>
			</div>
		</div>
		<ul class="infolist">
			<router-link to="/collection">
				<li class="mui-clearfix">
					<img src="../../assets/images/myindexpic/mysj@2x.png" alt=""  class="infologo"/>
					<div class="mui-pull-left">我的收藏</div>
					<div class="mui-pull-right rightgo"><img src="../../assets/images/ioncfontlogo/right.png"/></div>
				</li>
			</router-link>
			<router-link to="/getMyBackList">
			<li class="mui-clearfix">
				<img src="../../assets/images/myindexpic/myfk@2x.png" alt=""  class="infologo"/>
				<div class="mui-pull-left">我的反馈</div>
				<div class="mui-pull-right rightgo"><img src="../../assets/images/ioncfontlogo/right.png"/></div>
			</li>
			</router-link >
			<router-link to="/myCourse">
			<li class="mui-clearfix">
				<img src="../../assets/images/myindexpic/myyy@2x.png" alt=""  class="infologo"/>
				<div class="mui-pull-left">我预约的课程</div>
				<div class="mui-pull-right rightgo"><img src="../../assets/images/ioncfontlogo/right.png"/></div>
			</li>
			</router-link>
		</ul>
		
	</div>
</template>

<script>
	
	import loadings from '../base/loading/loading.vue'
	export default {
	  name: 'myindex',
	  data () {
	    return {
	    	userimg:"",
	    	username:"",
	    	userjf:"",
	    	"hide":false,
            "isClear":true

	    }
	  },components:{
         loadings
		} ,methods:{	  	
	  	userinfo:function(){
	  		const that = this;
	  		this.$http.get("/api/api/getMemberInfo").then((res)=>{
	  			  if(!that.hide){
                  that.hide = true;
                  setTimeout(function () {
                    that.isClear = false;
                  },1000)
              }
	  			console.log(res)
	  			that.username =res.data.data.nickname;
	  			that.userimg =res.data.data.HeadImgUrl;
	  			that.userjf =res.data.data.CurrentIntegral;
	  		},(err)=>{
	  			console.log(err)
	  		})
	  	}
	  },created:function(){
	  	this.userinfo()
	  }
}
</script>

<style scoped>
	li{
		list-style: none;
	}
	.imgbox{
		width: 100%;
		height: 5.333rem;
		background: url('../../assets/images/myindexpic/bkg@2x.png') no-repeat center center;
		background-size: 100% 100%;
		padding-top: 0.826rem;
		box-sizing: border-box;
		position: relative;
	}
	.userimg{
		width: 1.733rem;
		height: 1.733rem;
		display: block;
		border-radius: 100%;
		border: 2px solid #fff;
		margin: 0 auto;	
	}
	.username{
		font-size: 0.4rem;
		color: #fff;
		line-height: 0.4rem;
		margin-top: 0.48rem;
		text-align: center;
	}
	.indexboxbottm{
		color: #fff;
		font-size: 0.4rem;
		position: absolute;
		width: 100%;
		bottom: 0.426rem;
	}
	.indexleft a{
		font-size: 0.4rem;
		color: #fff;
		
	}
	.indexleft img,.indexright img{
		width: 0.48rem;
		vertical-align: sub;
		margin: 0 0.32rem 0 0.64rem;
	}
	.indexright{
		margin-right: 24px;
		position: relative;
	}
	.indexright >span{
		display: block;
		position: absolute;
		width: 0.426rem;
		background: #ea5206;
		font-size: 0.32rem;
		border-radius: 100%;
		line-height: 0.426rem;
		text-align: center;
		top: -0.24rem;
		left: 0.96rem;
	}
	.infolist li{
		background: #fff;
		height: 53px;
		line-height: 53px;
		font-size: 0.32rem;
		color: #333;
		position: relative;
		padding-left: 1.546rem;
		padding-right: 0.426rem;
		box-sizing: border-box;
		border-bottom: 1px solid #f2f2f2;
	}
	.rightgo img{
		width: 0.16rem;
	}
	.infologo{
		display: block;
		float: left;
		position: absolute;
		width: 0.8rem;
		top: 0.28rem;
		left: 0.426rem
	}
</style>