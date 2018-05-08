<template>
	<div class="myintegral">
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   			 <div class="mui-scroll">
   			 	<div class="myjifen">
   			 		<img src="../../assets/images/myindexpic/myjf@3x@2x.png"/>我的积分：{{usejf}}
   			 	</div>
				<ul class="jifenlist">
					<li v-for="data in resdata">
						<p>{{data.LogContent}}</p>
						<p>{{data.LogTime}}</p>
						<span>+{{data.TaskScore}}</span>					
					</li>
				</ul>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		name: 'myintegral',
		data () {
		return {
			usejf:"",
			page:1,
			resdata:[]		 
		  }
		
		},methods:{
			getdata:function(p,r){
            	 var params = {
		            "page":p,
		            "row":r
		          }
            	 console.log(params)
            	var that =this;
            	this.$http.post(that.$httpUrl.getMyIntegral,params).then(function(res){
            			console.log(res)
            			that.usejf=res.data.data.CurrentIntegral;
						  if(p==1){
			              //p等于1为下拉刷新
				              that.resdata = [];//清空数组
				              that.resdata = res.data.data.list;
				              console.log(that.resdata)
				              if(r==10){
				                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
				              }
				           }else{	            	
				            	if(res.data.data.list.length<r){
						                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
						              }else {
						              	that.resdata=that.resdata.concat(res.data.data)
						                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
						        }
				            }
						
            			
            	},function(err){
            		mui.alert("网络错误")
            	})
            	
            },
			
			
			
		  	pulldownRefresh:function () {
		 		this.getdata(1,10);
	        },
	        pullupRefresh:function () {
	        	this.getdata(++this.page,10);
	        }
		},
		mounted() {
	        var that = this;
	        mui.init({
	        pullRefresh: {
	            container: '#pullrefresh',
	            down: {
	              callback: that.pulldownRefresh,	
	            },
	            up: {
	              contentrefresh: '正在加载...',
	              contentnomore: '没有更多数据了',
	              callback: that.pullupRefresh
	            }
	          }
	        })
	     }, created(){
				this.getdata(1)
			}
	}
</script>

<style scoped>
	.myintegral{
		text-align: left;
	}
	li{
		background: #fff;
	}
	.myjifen img{
		width: 0.48rem;
		vertical-align: sub;
		margin: 0 0.32rem;
	}
	.myjifen{
		font-size: 0.4rem;
		color: #333;
		padding: 0.48rem 0;
		background: #fff;
		margin-bottom: 0.266rem;
	}
	.jifenlist li p{margin: 0;}
	.jifenlist li p:first-child{
		font-size: 0.373rem;
		margin-bottom: 0.16rem;
		text-indent: -.5em;
		color: #333;
	}
	.jifenlist li p:last-child{
		font-size: 0.32rem;
		line-height: 0.32rem;
	}
	.jifenlist li{
		padding: 0.5rem 0.32rem 0.32rem;
		border-bottom: 1px solid #f2f2f2;
		position: relative
	}
	.jifenlist li span{
		color: #ffcc00;
		font-size: 0.373rem;
		position: absolute;
		right: 0.4rem;
		top:0.85rem;
	}
</style>