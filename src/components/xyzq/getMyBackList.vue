<template>
    <div class="feedback">
    	    <loadings :isHide="hide" v-if="isClear"></loadings>
        <div class="mui-content">
			<div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a class="mui-control-item tabsone mui-active" href="#item1mobile">
							个人约课反馈
						</a>
						<a class="mui-control-item" href="#item2mobile">
							企业约课反馈
						</a>
					</div>
				</div>
		<div class="mui-slider-group">
			<div id="item1mobile" class="mui-slider-item mui-control-content  mui-active">
				<div  class="mui-scroll-wrapper">	
					<div class="mui-scroll ">							
					    <ul class="section">
					        <li class="section1"  v-for='list in lists'>
					            <div class="tab_left">
					                <img :src="list.FileUrl">
					            </div>
					            <div class="tab_right">
					                <P class="title">{{list.Title}}</p>
					                <p class="time">
					                   <img src="../../assets/images/ioncfontlogo/time1.png">
					                   <span>预约时间:</span>
					                   <span>{{list.TeachingTime}}</span>
					                </p>
					                <p class="status">
					                   <img src="../../assets/images/ioncfontlogo/status.png">
					                   <span>预约状态:</span>
					                   <span>已反馈</span>
					                </p>
					                <p class="address" >
					                   <img src="../../assets/images/ioncfontlogo/address@2x.png">&nbsp;教学地点:&nbsp;{{list.TeachingCompany}}
					                   
					                </p>
					                
					                <p class="btn_sub" @tap="jumpgo(list.AppointmentId,list.CourseType)">查看反馈</p>
					            </div>
					
					        </li> 
					    </ul>
                  </div>
             </div>
             </div>
    <div id="item2mobile" class="mui-slider-item mui-control-content">
        <div id="pull" class="mui-content mui-scroll-wrapper">
   			 <div class="mui-scroll">
		         <ul class="section ">
		            <li class="section1 "  v-for='list in listss'>
		                <div class="tab_left">
		                    <img :src="list.FileUrl">
		                </div>
		                <div class="tab_right">
		                    <P class="title">{{list.Title}}</p>
		                    <p class="time">
		                         <img src="../../assets/images/ioncfontlogo/time1.png">
		                       <span>预约时间:</span>
		                       <span>{{list.TeachingTime}}</span>
		                    </p>
		                    <p class="status">
		                     <img src="../../assets/images/ioncfontlogo/status.png">
		                       <span>预约状态:</span>
		                       <span>已反馈</span>
		                      
		                    </p>
		                   
		                    <p class="number">
		                       <img src="../../assets/images/ioncfontlogo/man.png">
		                       <span>课程人数:</span>
		                       <span>{{list.Number}}</span>
		                    </p>
		                    <p class="btn_sub" @tap="jumpgo(list.AppointmentId,list.CourseType)">查看反馈</p>
		                </div>
		
		            </li> 
		        </ul>
             </div>
             </div>
             </div>
        
             </div>
        </div>
        </div>
    </div>
</template>
<script>
    import loadings from '../base/loading/loading.vue'
    export default{
        name : 'tab',
        data(){
            return {
                
                personal:true,
                 lists:[],
                 listss:[],
                 "hide":false,
                 "isClear":true,
                 "p":1,
                 "p1":1
            
            }
        },
        components: {
        	   loadings
        },
         methods:{
         	jumpgo(AppointmentId,CourseType){
         		
         		this.$router.push("/myDetail?CourseType="+CourseType+"&&AppointmentId="+AppointmentId)
         	},
         	jumpgo2(){
         		this.$router.push("/feedbackcompany")
         	},
         	
         	getdata:function(p,r,id,s){
         		console.log(p,r,id);
         		var that=this;
         		var param1={
         			"page":p,
         			"row":r,
         			"type":id
         		}
         		console.log(param1);
         		
         		this.$http.post(this.$httpUrl.getMyBackList,param1)
         		 .then(function(res){
         		 	console.log(res);
         		 	if(!that.hide){
		                  that.hide = true;
		                  setTimeout(function () {
		                    that.isClear = false;
		                  },1000)
            			}
         		    	  if(s){
         		    	  	if(p==1){
				              //i等于1为下拉刷新
				              that.lists = [];//清空数组
				              that.lists = res.data.data;
				              s.endPullDownToRefresh(); //refresh completed
				          }else{	            	
			            	      if(res.data.code == 306){
			            	      	console.log(111);
				                  s.endPullUpToRefresh(true);  
				              }else {
				              	that.lists=that.lists.concat(res.data.data)
				                if(res.data.data.length<20){
				              		s.endPullUpToRefresh(false);
				              	}else{
				              		s.endPullUpToRefresh(true);
				              	}
					         }
				         } 
         		    	  }else{
         		    	  	that.lists = res.data.data;
         		    	  }
         		 }).catch(function(error){
         		 	console.log(error);
         		 })
         	},
         	getdata1:function(p,r,id,s){
         		console.log(p,r,id);
         		var that=this;
         		var param1={
         			"page":p,
         			"row":r,
         			"type":id
         		}
         		console.log(param1);
         		
         		this.$http.post(this.$httpUrl.getMyBackList,param1)
         		 .then(function(res){
         		 	
         		 	if(!that.hide){
		                  that.hide = true;
		                  setTimeout(function () {
		                    that.isClear = false;
		                  },1000)
            			}
         		    	  if(s){
         		    	  	if(p==1){
				              //i等于1为下拉刷新
				              that.listss = [];//清空数组
				              that.listss = res.data.data;
				              s.endPullDownToRefresh(); //refresh completed
				          }else{	            	
			            	      if(res.data.code == 306){
				                s.endPullUpToRefresh(true);
				                
				              }else {
				              	that.listss=that.lists.concat(res.data.data)
				                if(res.data.data.length<20){
				              		s.endPullUpToRefresh(false);
				              	}else{
				              		s.endPullUpToRefresh(true);
				              	}
					         }
				          }      
         		    	  }else{
         		    	  	  that.listss = res.data.data;
         		    	  }
         		 }).catch(function(error){
         		 	console.log(error);
         		 })
         	}
        },
//       components:{
//			loadings
//    }, 
      created(){
	   	this.getdata(1,20,1);
		this.getdata1(1,20,2);
	   },
	  mounted() {
			
	        var that = this;
	        mui.init();
	        mui("#slider").slider();
	        mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'),function(index,ele){
	        	  
	        	   mui(ele).pullToRefresh({
	        	   	   down: {
	        	   	   	  contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
		              callback: function() {
							var self = this;
							var type=index+1;
							setTimeout(function() {
								if(index==0){
									that.p=1;
									that.getdata(1,20,1,self);
								}else if(index==1){
									that.p1=1;
									that.getdata1(1,20,2,self);
								}
							}, 1000);
						}
		            },
		            up: {
		             
		              contentrefresh: '正在加载...',
		              contentnomore: '没有更多数据了',
		              callback: function() {
							var self = this;
							setTimeout(function() {
								if(index==0){
								    that.p++;
									that.getdata(that.p,20,1,self);
								}else if(index==1){
									that.p1++;
									that.getdata1(that.p1,20,2,self);
								}
							}, 1000);
						}
		            }
	        	   });
	        });
//	         mui.init({
//	          pullRefresh: {
//	            container: '#pull',
//	            down: {
//	              callback: that.pulldownRefresh,
//	            },
//	            up: {
//	              contentrefresh: '正在加载...',
//	              contentnomore: '没有更多数据了',
//	              callback: that.pullupRefresh
//	            }
//	          }
//	        })
	      }
    }
</script>
<style scoped>
    .class_tab{
        width:100%;
        height:40px;
        line-height:40px;
        background-color:#fff;
        font-size:0.426rem;
    }
    .class_tab>p{
        width:50%;
        float:left;
        color:#999;
    }
    .tabactive{
         border-bottom:2px solid rgb(255,182,0);
         color:rgb(255,182,0);
    }
    .class_tab span{
        padding-left:10px;
        padding-right:10px;
        display:inline-block;
        height:38px;
        font-weight:900;
    }
    *{
       padding:0;
       margin:0;
    }
    .feedback{
       background:#f0f0f0;
    }
    .section{
       margin-top:5px;
    }
    .after_show, .afters{
       display:none;
    }
 
    .section1{
        width:100%;
        box-sizing:border-box;
        padding-left:2%;
        padding-right:2%;
        margin-top:10px;
        position:relative;
        margin-top:10px;
        height:150px;
        background:#fff;
        padding-top:10px;
    }
 
    .tab_left{
        width:44%;
        float:left;
        height:130px;
        margin-bottom:0px;

    }
    .tab_left img{
        width:100%;
        height:130px;
    }
    .tab_right{
        float:left;
        margin-left:2%;
        width:54%;
        height:140px;
         margin-bottom:0px;
    }
    .title{
        text-align:left;
	    line-height: 24px;
	    font-Family: "PingFang-SC-Bold";
	    font-Size: 0.384rem;  
    }
    .time,.status,.address,.number{
        height:22px;
        line-height:22px;
        font-size:0.34rem;
        text-align:left;
    }
    .time img,.status img,.address img,.number img{
        float:left;
        height:16px;
        width:16px!important;
        margin-top:2px;
    }
    .time span,.status span,.number span{
        float:left;
        margin-left:4px;
    }
    
    .btn_sub{
        float:right;
        background-color:rgb(255,204,0);
        color:#fff;
        font-size:0.32rem;
        height:23px;
        line-height:23px;
        padding-left:8px;
        padding-right:8px;
        border-radius:5px;
        margin-top:18px;
        /*border: 1px solid #000000;*/
    }
    
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
    	width: 60%;
    	height: 2px;
    	left: 20%;
    	bottom: 0;
    	content: "";
    	background: #ffb600;
	}
	.mui-slider .mui-segmented-control.mui-segmented-control-inverted~.mui-slider-group .mui-slider-item{
		border: 0;
	}
	
	
		
	

</style>
<style>
	.mui-bar~.mui-content .mui-fullscreen {
				top: 44px;
				height: auto;
			}
			.mui-pull-top-tips {
				position: absolute;
				top: -20px;
				left: 50%;
				margin-left: -25px;
				width: 40px;
				height: 40px;
				border-radius: 100%;
				z-index: 1;
			}
			.mui-bar~.mui-pull-top-tips {
				top: 24px;
			}
			.mui-pull-top-wrapper {
				width: 42px;
				height: 42px;
				display: block;
				text-align: center;
				background-color: #efeff4;
				border: 1px solid #ddd;
				border-radius: 25px;
				background-clip: padding-box;
				box-shadow: 0 4px 10px #bbb;
				overflow: hidden;
			}
			.mui-pull-top-tips.mui-transitioning {
				-webkit-transition-duration: 200ms;
				transition-duration: 200ms;
			}
			.mui-pull-top-tips .mui-pull-loading {
				/*-webkit-backface-visibility: hidden;
				-webkit-transition-duration: 400ms;
				transition-duration: 400ms;*/
				
				margin: 0;
			}
			/*.mui-pull-top-wrapper .mui-icon,
			.mui-pull-top-wrapper .mui-spinner {
				margin-top: 7px;
			}*/
			.mui-pull-top-wrapper .mui-icon.mui-reverse {
				/*-webkit-transform: rotate(180deg) translateZ(0);*/
			}
			.mui-pull-bottom-tips {
				text-align: center;
				background-color: #efeff4;
				font-size: 15px;
				line-height: 40px;
				color: #777;
			}
			.mui-pull-top-canvas {
				overflow: hidden;
				background-color: #fafafa;
				border-radius: 40px;
				box-shadow: 0 4px 10px #bbb;
				width: 40px;
				height: 40px;
				margin: 0 auto;
			}
			.mui-pull-top-canvas canvas {
				width: 40px;
			}
			.mui-slider-indicator.mui-segmented-control {
				background-color: #efeff4;
			}
	
</style>