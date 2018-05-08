<template>
	<div class="teacherDetail">
		 <loadings :isHide="hide" v-if="isClear"></loadings>
	   <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   		 <div class="mui-scroll">
		    <ul class="section">
		        <li class="section1" v-for='(list,index) in lists'>
		            <div class="left">
		                <img :src="list.Picture">
		            </div>
		            <div class="right">
		                <P class="title">{{list.Name	}}</p>
		                <p class="number">
		                    <span class="num">任课教程:</span>
		                    <span class="count">{{list.Class}}</span>
		                </p>
		                <p class="detail">
		                   
		                   <span class="mui-ellipsis-2"><span style="font-weight: 700;">简介: </span>{{list.ActivitiesExp}}</span>
		                </p>
		                <p class="last">
		                    <img src="../../assets/images/classes/read.png">
		                    <span>{{list.ClickCount}}</span>
		                    <span class="zan"  :class="list.IsLike ==0? 'check1':'nocheck1'" @tap="ontap(index,list.Code)">
		                       <!--<img src="../../assets/images/classes/zangray.png" class="before_show">
		                       <img src="../../assets/images/classes/zanyellow.png" class="after_show">-->
		                       <span>{{list.LikeCount}}</span>
		                    </span>
		                   
		                </p>
		            </div>
		            
		        </li>
		       
		    </ul>
		      
		</div>
		
    </div>
  <router-link to="/application" ><div class="bg_footer">我想当老师</div></router-link>
</div>
    
</template>
<script>
   import loadings from '../base/loading/loading.vue'
    export default{
        name : 'classes',
        data () {
            return {
               p:1,
               lists:[],
               "hide":false,
                 "isClear":true
              
              
            }
        },
        components: {
        	   loadings
        },
        methods: {
	        	ontap(index,course_id){
	        		
	        		var that=this;
	        		console.log(index,course_id);
	        		this.lists[index].IsLike=="0" ?(this.lists[index].LikeCount++) : (this.lists[index].LikeCount--)
	        		if(this.lists[index].IsLike==0){
	        			this.lists[index].IsLike=1;
	        		}else{
	        			this.lists[index].IsLike=0;
	        		}
	        		var param={
	        			"course_id":course_id,
	        			"course_type":5,
	        			"course_action":that.lists[index].IsLike
	        		}
	        		console.log(param);
	        		this.$http.post(this.$httpUrl.doCourseLike,param).then(function(res){
	        			
	        			console.log(res);
	        		}).catch(function(error){
	        			console.log(error);
	        		})
//	        		this.listss[index].IsLike=="0"? (this.listss[index].IsLike = 1) :(this.listss[index].IsLike= 0)
	        		
	        	},
            pulldownRefresh:function(){
            	   var that=this;
	          //下拉刷新
//	           location.reload();
	          that.p=1;
	          that.getdata(that.p,10);
	          setTimeout(function () {
	            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
	          },2000)
            },
	        pullupRefresh:function () {
	        	console.log(1111);
	        	var that=this;
	          //上拉加载
	          that.p++;
	           that.getdata(that.p,10);
	           
//	          setTimeout(function () {
//	             mui('#pullrefresh').pullRefresh().endPullupToRefresh();
//	          },2000)
	        },
	        getdata:function(p,r){
	        	   var that=this;
	        	   var param={
	        	   	"page":p,
	        	   	"row":r
	        	   }
	        	   console.log(p,r);
	        	   this.$http.post(this.$httpUrl.getInstructorList,param).then(function(res){
	        	      if(!that.hide){
                  that.hide = true;
                  setTimeout(function () {
                    that.isClear = false;
                  },1000)
    			}
	        	      if(p==1){
	        	      	that.lists=[];
	        	      	that.lists=res.data.data;
	        	      	if(r==10){
	        	      		
		                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		              }
	        	      	 
	        	      }else{
	        	      	 if(res.data.code == 306){
	        	      
		                mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		                
		              }else {
		              	that.lists=that.lists.concat(res.data.data);
		              	console.log(that.lists);
		                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
		              }
	        	      }
	        	   	  console.log(that.lists);
	        	   }).catch(function(error){
	        	   	   console.log(error);
	        	   })
	        }
        }, 
        
		mounted() {
//			mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
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
	      },
	      created(){
	      	this.getdata(1,10);
	      }
    }
</script>
<style scoped>
    *{
       padding:0;
       margin:0;
    }
  	ul{
  		margin-bottom: 50px;
  	}
    .section{
       background:#f0f0f0;
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
    .left{
        width:44%;
        float:left;
        height:130px;
        margin-bottom:0px;

    }
    .left img{
        width:100%;
        height:130px;
    }
    .right{
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
		font-Size: 0.373rem;
		
		

    }
    .number{
        margin-top:6px;
        font-size:0.32rem;
        line-height:24px;
        text-align:left;
    }
    .number img{
        width: 18px;
	    float:left;
	    margin-top:4px;
    }
   
   
    .detail{
       font-size:0.32rem;
       text-align:left;
       display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height:24px;
    }
    .last{
        height:24px;
        margin-top:10px;
        text-align:left;
        line-height:20px;
    }
    .last img{
        height:14px;
        color:#999;
        font-size:0.32rem;
        float:left;
        margin-top:4px;
    }
    .last span{
        margin-left:4px;
        float:left;
        font-size:12px;
        margin-top:1px;
    }
    .zan{
        margin-left:30px!important;
        
    }
    .collect img{
        margin-left:20px;
    }
    .bg_footer{
    	  position: fixed;
    	   top:95vh;
    	   width: 100vw;
    	   line-height: 5vh;
    	   background: rgb(255,204,0);
    	   color: white;
    	   font-size: 0.4rem;
    	   z-index: 10000;
    	   text-align: center;
    }
    .check1{
    	background: url("../../assets/images/classes/zangray.png") no-repeat left center;
    	background-size: 0.373rem 0.373rem;
    	padding-left: 10px;
 
    	color: #999;
    }
    .nocheck1{
    	background: url("../../assets/images/classes/zanyellow.png") no-repeat left center;
    	background-size: 0.373rem 0.373rem;
    	padding-left: 10px;
    	color: #ffcc00;
    }
</style>