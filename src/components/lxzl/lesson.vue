<template>
	<div class="teacherDetail">
		<loadings :isHide="hide" v-if="isClear"></loadings>
	   <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   		 <div class="mui-scroll">
		    <ul class="hot_lesson">
		        <li v-for='(list,index) in lists'>
		            <div class="hot_right">
		                <img :src='list.FileUrl' @tap="jump(list.CourseType,list.CourseId)"/>
		            </div>
		            <div class="hot_left">
		                <img :src='list.Icon_img'>
		                <p class="hot_title">{{list.CatTitile}}</p>
		                <p class="hot_number">
		                	<span>已参与人数:</span>
		                	<span class="hotnumber">{{list.JoinCount}}</span>
		                	<img src="../../assets/images/lesson/ss.png" v-if="list.JoinCountContrast == '1'">
		                	<img src="../../assets/images/lesson/cp.png" v-if="list.JoinCountContrast == '2'">
		                	<img src="../../assets/images/lesson/xj.png" v-if="list.JoinCountContrast == '3'">
		                </p>
		                <p class="hot_frequency">
		                	<span>预约频率:</span>
		                	<span>{{list.AppointmentRate}}</span>
		                	<img src="../../assets/images/lesson/ss.png" v-if="list.JoinCountContrast == '1'">
		                	<img src="../../assets/images/lesson/cp.png" v-if="list.JoinCountContrast == '2'">
		                	<img src="../../assets/images/lesson/xj.png" v-if="list.JoinCountContrast == '3'">
		                </p>
		                <p class="hot_frequency">
		                	<span>成功约课率:</span>
		                	<span>{{list.AppointmentFrequency}}</span>
		                	<img src="../../assets/images/lesson/ss.png" v-if="list.JoinCountContrast == '1'">
		                	<img src="../../assets/images/lesson/cp.png" v-if="list.JoinCountContrast == '2'">
		                	<img src="../../assets/images/lesson/xj.png" v-if="list.JoinCountContrast == '3'">
		                </p>
		                <p class="hot_frequency">
		                	<span>上课签到率:</span>
		                	<span>{{list.CheckRate}}</span>
		                	<img src="../../assets/images/lesson/ss.png" v-if="list.JoinCountContrast == '1'">
		                	<img src="../../assets/images/lesson/cp.png" v-if="list.JoinCountContrast == '2'">
		                	<img src="../../assets/images/lesson/xj.png" v-if="list.JoinCountContrast == '3'">
		                </p>
		                <div class="last">
		                    <span>
		                        <img src="../../assets/images/classes/read.png">
		                        <span>{{list.ClickCount}}</span>
		                    </span>
		                    <span :class="list.IsLike==0 ? 'zan':'zan1'" @tap='actives(index,list.CourseType,list.CourseId,list.IsLike)' >

		                       {{list.LikeCount}}
		                    </span>
		                    <span :class="list.IsCollect== 0? 'collect':'collect1'" @tap='showes(index,list.CourseType,list.CourseId,list.IsCollect)'>


		                    </span>
		                </div>
		            </div>
		            <div class="topimg">
		            	  <img src="../../assets/images/lesson/top1@2x.png" v-if="list.Top == '1'">
		            	   <img src="../../assets/images/lesson/top2@2x.png" v-if="list.Top =='2'">
		            	    <img src="../../assets/images/lesson/top3@2x.png" v-if="list.Top =='3'">
		            </div>
		        </li>
		    </ul>
		  </div>
		 </div>
	</div>
</template>
<script>
    import $ from "jquery"
    import loadings from '../base/loading/loading.vue'
    export default{
       name : 'lesson',
       data(){
           return{
           		page:1,
           		 "hide":false,
               "isClear":true,
              lists:[]
           }
       },
         components:{
			loadings
      },
        methods: {
            actives(index,type,id,isclick){
                if(this.lists[index].IsLike == 0){
					this.lists[index].IsLike=1;
					this.lists[index].LikeCount++;
				}else{
					this.lists[index].IsLike=0;
					this.lists[index].LikeCount--;
				}
				var act1=null;
					if(isclick ==0){
						act1 =1;			
					}else{
						act1=2;
					}	
				var obj={
					'course_id':id,
					'course_type':type,
					'course_action':act1
				}
				this.$http.post(this.$httpUrl.doCourseLike,obj).then((res)=>{
          			console.log(res)
          		},(err)=>{
          			console.log(err)
          		})

            },
            showes(index,type,id,col){
             	if(this.lists[index].IsCollect == 0){
					this.lists[index].IsCollect=1;
				}else{
					this.lists[index].IsCollect=0;
				}
				var act=null;
				if(col ==0){
					act =1;		
				}else{
					act=2;
				}
				var obj1={
					'course_id':id,
					'course_type':type,
					'course_action':act
				}
				this.$http.post(this.$httpUrl.doCourseCollect,obj1).then((res)=>{
	     			console.log(res)
	     		},(err)=>{
	     			console.log(err)
	     		})
            },
            jump(type,id){
            	this.$router.push("/classdetail?type="+type+"&id="+id)
            },
            getdata:function(p,r){
            	var that =this;
            	var parms={
            		page:p,
            		row:r
            	}
            	this.$http.post(this.$httpUrl.getHotCourse,parms).then(function(res){
            		console.log(res)
        			if(!that.hide){
	                  that.hide = true;
	                  setTimeout(function () {
	                    that.isClear = false;
	                  },1000)
        			}
					
					if(res.data.code == 306){
		              	mui.toast("暂无更多数据")
		             }
					 if(p==1){
		              //p等于1为下拉刷新
		              that.lists = [];//清空数组
		              that.lists = res.data.data;
		             
		              if(r==10){
		                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		              }
		           }else{	            	
		            	if(res.data.code == 306){
				                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				                
				              }else {
				              	that.lists=that.lists.concat(res.data.data)
				                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
				            }
		            }
            	},function(err){
            		mui.alert("网络错误")
            	})
            },    
			pulldownRefresh:function(){  
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
	     },
	   activated(){
	   		this.getdata(1);
			this.hide =false;
			this.isClear =true;
	   }
    }
</script>
<style scoped>
    *{
        padding:0;
        margin:0;
    }
    .hot_left>p>img{
    	 height:0.35rem;
    	 width: 0.35rem;
    }
    .topimg{
    	  position: absolute;
    	  top: 10px;
    	  right: 0px;
    }
    .topimg>img{
    	   width: 1.2rem;
    }
    .hot_left>p>span:first-child{
    	width: 100px;
    	display: inline-block;
    }
    .hot_left>p>span:nth-child(2){
    	 width: 40px;
    	 display: inline-block;
    }
    .hot_lesson{
        width:100%;
        background:#f0f0f0;
    }
    .hot_lesson li{
        width:100%;
        height:170px;
        background:white;
        margin-bottom:10px;
        position: relative;
    }
    .hot_right{
        width:50%;
        padding:10px;
        box-sizing:border-box;
        float:left;
    }
    .hot_right>img{
        width:100%;
        height:150px;
    }
    .hot_left{
        float:left;
        width:50%;
        box-sizing:border-box;
        padding-left:2px;
        padding-top:10px;
        text-align:left;
    }
    .hot_left>img{
        float:left;
        width:26px;
    }
    .hot_title{
        font-size:16px;
        margin-left:34px;
        font-weight:900;
        line-height:36px;
    }
    .hot_number{
        font-size:0.35rem;
        height:20px;
        line-height:20px;
        width:100%;
    }
    .hotnumber{
        color:rgb(234,82,6);
        /*margin-left:5px;*/
    }
    .hot_frequency span{

        display:inline-block;
        font-size:0.32rem;
    }
    .last{
        height:24px;
        margin-top:4px;
        text-align:left;
        line-height:20px;
    }
    .last img{
        height:14px;
        color:#999;
        font-size:0.32rem;
        float:left;
        margin-top:4px;
        width:16px;
    }
    .last span{
        margin-left:2px;
        float:left;
        font-size:0.32rem;
        margin-top:1px;
    }
    .zan{
    	background: url('../../assets/images/classes/zangray.png') no-repeat;
    	 margin-left:16px!important;
     	padding-top: 2px;
        background-size: 0.45rem 0.45rem;
       padding-left: 0.6rem;

    }

    .zan1{
        background: url('../../assets/images/classes/zanyellow.png') no-repeat;
        color: rgb(255,204,0);
         margin-left:16px!important;
     	padding-top: 2px;
        background-size: 0.45rem 0.45rem;
       padding-left: 0.6rem;

    }
    .collect {
      	background: url('../../assets/images/classes/collect.png') no-repeat;
      	 background-size: 0.4rem 0.4rem;
      height: 0.6rem ;
      width: 1rem;
      background-position:0.5rem  3px;
    }

     .collect1{
      	background: url('../../assets/images/classes/collectyellow.png') no-repeat;
     	 background-size: 0.4rem 0.4rem;
      height: 0.6rem ;
      width: 1rem;
      background-position: 0.5rem 3px;
     }
    li{
        list-style:none;
    }
     .after_show, .afters{
       display:none;
    }
</style>
