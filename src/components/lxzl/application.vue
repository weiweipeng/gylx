<template>
	<div class="teacherDetail">
		<loadings :isHide="hide" v-if="isClear"></loadings>
	   <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   		 <div class="mui-scroll">
		    <ul class="section">
		        <li class="section1" v-for='list in lists'>
		            <div class="left">
		                <img :src="list.Backgroundimg">
		            </div>
		            <div class="right">
		                <p class="title">{{list.Titile}}</p>
		                <p class="right_appli"><img src="../../assets/images/classes/human.png">招募人数:{{list.number}}</p>
		                <p class="right_appli"><img src="../../assets/images/ioncfontlogo/lesson.png">课程名称:{{list.course}}</p>
		                <p class="right_appli"><img src="../../assets/images/ioncfontlogo/address@2x.png">工作地点:{{list.Company}}</p>
		                <p class="right_appli"><img src="../../assets/images/ioncfontlogo/time1.png">工作时间:{{list.ClassTime}}</p>
		            </div>
		            
		        </li>
		       
		    </ul>
		      
		</div>
    </div>
  <router-link to="/teachernext" ><div class="bg_footer">我要申请</div></router-link>
</div>
    
</template>
<script>
    import loadings from '../base/loading/loading.vue'
    export default{
        name : 'classes',
        data () {
            return {
               lists:[],
               p:1,
               "hide":false,
                 "isClear":true
              
              
            }
        },
        components: {
        	   loadings
        },
        methods: {
            getdata:function(p,r){
	        	   var that=this;
	        	   
	        	   var param={
	        	   	"page":p,
	        	   	"row":r
	        	   }
	        	  console.log(param);
	        	   this.$http.post(this.$httpUrl.getRecruitList,param).then(function(res){
	        	   	console.log(res);
	        	      if(!that.hide){
                  that.hide = true;
                  setTimeout(function () {
                    that.isClear = false;
                  },1000)
    			}
	        	     if(p==1){
		        	      that.lists=[];
		        	      that.lists=res.data.data;
		              mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh complet
	        	      }else{
	        	      	
	        	      	 if(res.data.code == 306){
	        	            console.log(1111);
		                mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		                
		              }else {
		              	
		                if(res.data.data.length<r){
					          mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					     }else {
					          that.lists=that.lists.concat(res.data.data);
	                          mui('#pullrefresh').pullRefresh().endPullupToRefresh();
					      }
		              }
	        	      }
//	        	   	  console.log(that.lists);
	        	   }).catch(function(error){
	        	   	   console.log(error);
	        	   })
	        },
            pulldownRefresh:function(){
            	   var that=this;
	          //下拉刷新
	           that.p=1;
	          that.getdata(that.p,10);
            },
	        pullupRefresh:function () {
	        	var that=this;
	          //上拉加载
//	          that.p++;
	           that.getdata(++that.p,10);

	        }
        }, 
		mounted() {
			  mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
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
  
    .section{
       background:#f0f0f0;
       /*padding-bottom: 0.5rem;*/
    }
    #pullrefresh{
    	   margin-bottom: 1.06rem;;
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
        height:4.2rem;
        background:#fff;
        padding-top:10px;
    }
    .left{
        width:3.4666rem;
        float:left;
        height:3.4666rem;
        margin-bottom:0px;

    }
    .left img{
        width:100%;
        height:3.4666rem;
    }
    .right{
        float:left;
        text-align: left;
        margin-left:2%;
        width:5.9rem;
        height:140px;
       margin-bottom:0px;
    }
   
    .title{
    	    font-size: 0.4rem;
    	    color: #000000;
    	    margin-bottom: 0.2rem;
    }
    .right_appli{
    	  height: 0.6rem;
    	  margin-top: 1px;
    	  font-size: 0.32rem;
      overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
	  font-weight: 500;
    }
    .right_appli:after{
	    	content: '';
	    	display: block;
        clear: both;
    }
    .right_appli img{
    	   width: 0.4rem;
    	   margin-right: 5px;
    	   	float: left;
    }
    .right_appli span{
    	float: left;
   display: inline-block;
   line-height: 0.6rem;
    }
   .bg_footer{
   	position: fixed;
   	bottom: 0px;
   	line-height: 1.06rem;
   	background: rgb(255,204,0);
   	text-align: center;
   	color: white;
   	z-index: 1000;
   	width: 100%;
   	font-size: 0.4rem;
   }
</style>