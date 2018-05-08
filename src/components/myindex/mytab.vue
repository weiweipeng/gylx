<template>
    <div class="mytab">
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
					                <img :src="list.img1">
					            </div>
					            <div class="tab_right">
					                <P class="title">{{list.title}}</p>
					                <p class="time">
					                   <img src="../../assets/images/ioncfontlogo/time1.png">
					                   <span>预约时间:</span>
					                   <span>{{list.time}}</span>
					                </p>
					                <p class="status">
					                   <img src="../../assets/images/ioncfontlogo/status.png">
					                   <span>预约状态:</span>
					                   <span>{{list.status}}</span>
					                </p>
					                <p class="address" >
					                   <img src="../../assets/images/ioncfontlogo/address@2x.png">&nbsp;教学地点:&nbsp;{{list.address}}
					                   
					                </p>
					                
					                <p class="btn_sub" @tap="jumpgo">查看反馈</p>
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
		            <li class="section1 "  v-for='list in lists'>
		                <div class="tab_left">
		                    <img :src="list.img1">
		                </div>
		                <div class="tab_right">
		                    <P class="title">{{list.title}}</p>
		                    <p class="time">
		                         <img src="../../assets/images/ioncfontlogo/time1.png">
		                       <span>预约时间:</span>
		                       <span>{{list.time}}</span>
		                    </p>
		                    <p class="status">
		                     <img src="../../assets/images/ioncfontlogo/status.png">
		                       <span>预约状态:</span>
		                       <span>{{list.status}}</span>
		                    </p>
		                   
		                    <p class="number">
		                       <img src="../../assets/images/ioncfontlogo/man.png">
		                       <span>课程人数:</span>
		                       <span>{{list.number}}</span>
		                    </p>
		                    <p class="btn_sub" @tap="jumpgo2">查看反馈</p>
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
<script >
   
    export default{
        name : 'tab',
        data(){
            return {
                
                personal:true,
                 lists:[{
                     img1 : require('../../assets/images/classes/1.png'),
                     title: '拉丁舞',
                     time:'2017.12.12',
                     status:'已受理',
                     address:'上海市总工会长宁区工人文化宫',
                     
                     number:900
                 },{
                     img1 : require('../../assets/images/classes/2.png'),
                     title: '拉丁舞',
                     time:'2017.12.12',
                     status:'已受理',
                     address:'上海市总工会长宁区工人文化宫',
                     
                     number:900
                 },{
                     img1 : require('../../assets/images/classes/3.png'),
                     title: '拉丁舞',
                     time:'2017.12.12',
                     status:'已受理',
                     address:'上海市总工会长宁区工人文化宫',
                    
                     number:900
                 },{
                     img1 : require('../../assets/images/classes/4.png'),
                     title: '拉丁舞',
                     time:'2017.12.12',
                     status:'已受理',
                     address:'上海市总工会长宁区工人文化宫',
                     
                     number:900
                 }]        
            }
        },
         methods:{
         	jumpgo(){
         		this.$router.push("/mydetail")
         	},
         	jumpgo2(){
         		this.$router.push("/mydetail")
         	},
            pulldownRefresh:function(){
            	   var that=this;
	          //下拉刷新
	          setTimeout(function () {
	           that.endPulldownToRefresh();
	          },2000)
            },
	        pullupRefresh:function () {
	        	var that=this;
	          //上拉加载
	          setTimeout(function () {
	             that.endPullupToRefresh();
	          },2000)
	        }
        }, 
	      created(){
		   	for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
	          item=mui.hooks.inits[i];
	          if(item.name=="pullrefresh"){
	              item.repeat=true;
	          }
	      	}
	   },
		mounted() {
	        var that = this;
	        mui.init();
	        mui("#slider").slider();
	        mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'),function(index,ele){
	        	  console.log(ele);
	        	  console.log(mui(ele));
	        	   mui(ele).pullToRefresh({
	        	   	   down: {
	        	   	   	  style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
				      color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
				      height:'50px',//可选,默认50px.下拉刷新控件的高度,
				      range:'100px', //可选 默认100px,控件可下拉拖拽的范围
				      offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
				      auto: true,//可选,默认false.首次加载自动上拉刷新一次
	        	   	   	  contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
		              callback: function() {
							var self = this;
							setTimeout(function() {
								self.endPullDownToRefresh();
							}, 1000);
						}
		            },
		            up: {
//		              style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
				      color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
				      height:'50px',//可选,默认50px.下拉刷新控件的高度,
				      range:'100px', //可选 默认100px,控件可下拉拖拽的范围
				      offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
				      auto: true,//可选,默认false.首次加载自动上拉刷新一次
		              contentrefresh: '正在加载...',
		              contentnomore: '没有更多数据了',
		              callback: function() {
							var self = this;
							setTimeout(function() {
								self.endPullUpToRefresh();
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
	
	.mui-bar~.mui-content .mui-fullscreen {
				top: 144px;
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
				z-index: 11111;
				display: none!important;
				background: red;
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