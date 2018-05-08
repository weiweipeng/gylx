<template>
	<div class="contactus">
		<div class="mui-content">
			<div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a class="mui-control-item tabsone mui-active" href="#item1mobile">
							在线留言
						</a>
						<a class="mui-control-item" href="#item2mobile">
							我的问题
						</a>
					</div>
				</div>
			
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content  mui-active">													
								  <div class="section">
						        	<form>
						        	 	<div class="form_nav">
						        	 		<span></span>填写信息
						        	 	</div>
						        	 	<div class="inputnav">
						        	 		<input type="text" placeholder="标题" v-model="uesrtitle"/>
						        	 	</div>
						        	 	<div class="form_text">
						        	 		<textarea placeholder="内容..."  v-model="containerss"></textarea>
						        	 	</div>
						        	 </form>
						        	 <button class="form_btn" @tap="postdata">提交</button>
						        	 <div class="linkman">
						        	 	<div class="linknav">
						        	 		联系方式
						        	 	</div>
						        	 	<ul class="linkbottom">
						        	 		<li>
						        	 			<img src="../../assets/images/contactus/contant2@2x.png" alt="" />
						        	 			联系人：<span>{{teach}}</span>
						        	 		</li>
						        	 		<li>
						        	 			<img src="../../assets/images/contactus/number1@2x.png" alt="" />
						        	 			联系电话：<span>{{tel}}</span>
						        	 		</li>
						        	 		<li>
						        	 			<img src="../../assets/images/contactus/contant1@2x.png" alt="" />
						        	 			地址：<span>{{addres}}</span>
						        	 		</li>
						        	 	</ul>
						        	 </div>
						</div>
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">	
						 <div class="section1">
					        <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
					   			 <div class="mui-scroll">
						        	<ul class="problem">
						        		<router-link to="/problemmain">
							        		<li v-for=" item in resdata" @tap="jump(item.ID)">
							        			<p v-text="item.Title"></p>
							        			<div class="mui-clearfix">
							        				<span v-text="item.AskTime" class="mui-pull-left"></span>
							        				<span v-if="item.statue==0" class="mui-pull-right">未回复</span>
							        				<span v-if="item.statue==1" class="mui-pull-right">已经回复</span>
							        			</div>
							        		</li>
						        		</router-link>
						        	
						       		 </ul>
					       		</div>
					       	</div>
						</div>
					</div>		
			</div>
		</div>
	</div>
	 <!--遮盖层-->
        <div class="msg" v-show="isblock">
        	<div class="msgbox_1">
        		<img src="../../assets/images/contactus/contant3@2x.png" alt="" />
        		<p>发送成功</p>
        		<div class="textmsg">您的留言已收到，我们会尽快给予您回复，
				谢谢！
        		</div>
        		<span class="close_1" @tap="closemsg"></span>
        	</div>
        </div>
	</div>
</template>

<script>
	export default{
		name:"cheshi",
		data (){
 			return {
				isblock:false,
				teach:"陈老师",
				tel:"021-63226155",
				uesrtitle:"",
				addres:"上海市工人文化宫",
				containerss:"",
				"page":1,
				resdata:[]
			}
		},
		methods:{
			jump(id){
				this.$router.push("/problemmain?id="+id)
			},
			 postdata:function(){	 	
//          	this.isblock =true;
				var that =this;
				var userdata={
					Title:this.uesrtitle,
					AskContent:this.containerss
				}
				if(userdata.Title!=""&&userdata.AskContent!=""){
					this.$http.post(that.$httpUrl.doMemberQuestion,userdata).then(function(res){
						console.log(res)
						if(res.data.code== 500){
							that.isblock =true;	
							that.uesrtitle="";
							that.containerss=""
						}
//						console.log(res)
					},function(err){
						mui.alert("网络错误")
					})
				
				}else{
					mui.alert("标题和内容不能为空！")
				}
            },
            getdata:function(p,r){
            	 var params = {
		            "page":p,
		            "row":r
		          }
            	 console.log(params)
            	 var that =this;
            	this.$http.post(that.$httpUrl.getMemberQuestion,params).then(function(res){
            			console.log(res)
//          			this.resdata=res.data.data;
						  if(p==1){
			              //p等于1为下拉刷新
			              that.resdata = [];//清空数组
			              that.resdata = res.data.data;
			              if(r==10){
			                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			              }
			           }else{	            	
			            	if(res.data.code ==306){
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
            closemsg(){
            	this.isblock =false;
            },
      
	            pulldownRefresh:function () {
	            	  this.getdata(1,10);
	       	 	},
	        	pullupRefresh:function () {
	        		this.getdata(++this.page,10);
	        		
	          		
	        	}
       		
		},
			mounted() {
			mui("#slider").slider();
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
	         
	      },created(){
	      	this.getdata(1)
	      }
	}
</script>

<style scoped>
	.mui-segmented-control.mui-scroll-wrapper,.mui-segmented-control.mui-scroll-wrapper .mui-scroll{
		height: 1.173rem;
	}
	.mui-segmented-control.mui-scroll-wrapper{
		margin-bottom: 0.266rem;
	}
	.mui-segmented-control .mui-control-item{
		line-height: 1.173rem;
	}
	.mui-fullscreen .mui-segmented-control~.mui-slider-group{
		top:  1.173rem;
	}
	.mui-slider-group{
		top:1.444rem!important
	}
	.mui-segmented-control.mui-scroll-wrapper .mui-scroll{
		width: 100%;
		background: #fff;
	}
	.mui-segmented-control.mui-scroll-wrapper .mui-control-item{
		padding: 0;
		width: 50%;
		text-align: center;
		font-size: 0.373rem;
		color: #999;
	}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
		color: #ffb600;
		position: relative;
	}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active:after{
		position: absolute;
    	width: 40%;
    	height: 2px;
    	left: 30%;
    	bottom: 0;
    	content: "";
    	background: #ffb600;
	}
	.mui-slider .mui-segmented-control.mui-segmented-control-inverted~.mui-slider-group .mui-slider-item{
		border: 0;
	}
	
	.contactus{
		text-align: left;
	}
	  .class_tab span{
        padding-left:0.266rem;
        padding-right:0.266rem;
        display:inline-block;
        height:1.013rem;
        font-weight:900;
    }
    .section{
    	padding:0 0.266rem;
    	height: 16.266rem;
    	overflow: scroll;
    }
    .section> form{
    	background: #fff;
    	display: block;
    }
    .form_nav{
    	font-size: 0.32rem;
    	color: #333;
    	padding: 0.266rem;
    	border-bottom: 1px solid #f0f0f0;
    }
    .form_nav span{
    	width: 2px;
    	display: inline-block;
    	height: 0.4rem;
    	margin-right: 4px;
    	background: #ffb600;
    	vertical-align: middle
    }
    .inputnav input::-webkit-input-placeholder, .form_text textarea::-webkit-input-placeholder{
    	color: #999;
    	font-size: 0.346rem;
    }
    .inputnav input{
    	width: 97%;
    	margin-left: 2%;
    	color: #333;
    	font-size: 0.373rem;
    	padding: 0.266rem;
    	border: 0;
    	outline: none;
    	border-bottom: 1px solid #f0f0f0;
    	box-sizing: border-box;
    }
    .form_text textarea{
    	width: 97%;
    	height: 5.8rem;
    	margin-left: 2%;
    	padding: 0.266rem;
    	outline: none;
    	color: #666;
    	font-size: 0.346rem;
    	border: 0;
    	resize:none ;
    	box-sizing: border-box;
    }
    .form_btn{
    	width: 9.466rem;
    	height: 1.066rem;
    	border-radius: 0.133rem;
    	background: #ffb600;
    	border: 0;
    	outline: none;
    	color: #fff;
    	font-size: 0.4rem;
    	margin:  0.4rem 0;
    }
    
    .linkman{
    	width: 9.466rem;
    	background: #fff;
    	padding: 0 0.56rem;
    	box-sizing: border-box;
    	padding-bottom: 0;
    	border-radius: 0.186rem;
    }
    .linknav{
    	font-size: 0.373rem;
    	color: #333;
    	line-height: 0.373rem;
    	text-align: center;
    	padding:0.266rem 0;
    	border-bottom: 1px solid #f0f0f0;
    }
     .linkbottom{
     	padding-top:0.4rem;
     }
    .linkbottom li {
    	font-size: .346rem;
    	color: #333;
    	padding:0.25rem 0;
    }
    .linkbottom li >img{
    	width: 0.43rem!important;
    	float: left;
    	margin-right: 0.346rem;
    }
    
    
    ul{
    	list-style: none;
    }
    .msg{
    	position: fixed;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	background: rgba(0,0,0,.5);
    	z-index: 1;
    }
    .msgbox_1{
    	width: 8.053rem;
    	height: 7.386rem;
    	margin:2.666rem auto;
    	background: #fff;
    	border-radius: 0.106rem;
    	padding-top: 1.54rem;
    	box-sizing: border-box;
    	position: relative;
    }
    .msgbox_1>img{
    	display: block;
    	width: 2.586rem;
    	margin: 0 auto;
    }
    .msgbox_1 >p{
    	font-size: 0.533rem;
    	line-height: 0.533rem;
    	color: #333;
    	text-align: center;
    	font-weight: 700;
    	margin-top: 0.746rem;
    }
    .textmsg{
    	font-size: 0.373rem;
    	color: #999;
    	text-align: center;
    	padding: 0 0.266rem;
    	margin-top: 0.266rem;
    }
    .close_1{
    	display: block;
    	position: absolute;
    	right: 0.266rem;
    	top: 0.266rem;
    	width: 0.56rem;
    	height: 0.56rem;
    	background: url('../../assets/images/contactus/btngray.png') no-repeat center center;
    	background-size: 100% 100%;
    }
    
    
    /*第二个选项页面*/
    .section1 ul {
    	padding: 0 0.4rem;
    		background: #fff;
    }
  .section1 ul  li{
  	border-bottom: 1px solid #f2f2f2;
  	padding: 0.32rem 0.506rem;
  }
  
  .problem li >p{
  	font-size: 0.346rem;
  	line-height: 0.346rem;
  	color: #444;
  	margin-bottom: 0.4rem;
  } 
  .problem li >div span{
  	color: #999;
  	font-size: 0.32rem;
  	line-height: 0.346rem;
  }
  
  
 
</style>