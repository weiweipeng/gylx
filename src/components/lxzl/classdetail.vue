<template>
   <div class="classdetail">
   	  <loadings :isHide="hide" v-if="isClear"></loadings>
       <div class="head_img">
          <img :src="data.FileUrl">
          <p>{{data.CourseTitle}}</p>
       </div>
       <div class="class_sec">
       	  <p class="class_logo">课程信息</p>
       	  <p class="cla_join">
       	  	<img src="../../assets/images/classes/human.png" />
       	  	<span>已参与人数：</span>
       	  	<span>{{data.num}}人</span>
       	  </p>
       	  <p class="cla_join">
       	  	<img src="../../assets/images/ioncfontlogo/styles.png" />
       	  	<span>预约方式：</span>
       	  	<span v-if="data.CourseType==1">个人约课</span>
       	  	<span v-if="data.CourseType==2">企业约课</span>
       	  </p>
       	  <p class="cla_join">
       	  	<img src="../../assets/images/ioncfontlogo/address@2x.png" />
       	  	<span>地点：</span>
       	  	<span class="cla_address">{{data.address}}</span>
       	  </p>
       </div>
       <div class="cla_control">
       	  <p class="class_logo1">课程介绍</p>
       	  <div class="cla_article" v-html="data.Content">
       	  	
       	  </div>
       </div>
       <p class="last">
                    <span>
                    	   <img src="../../assets/images/classes/read.png">
                       <span>{{data.ClickCount}}</span>
                    </span>
                    <span :class="data.IsLike== 0 ? 'zan':'zan1'"  @tap="actives">
                       <span>{{data.LikeCount}}</span>
                    </span>
                    <span :class="data.IsCollect== 0 ? 'collect':'collect1'" @tap='showes'></span>           
                </p>
   </div>
</template>

<script>
import $ from "jquery"
export default {
  name: 'classdetail',
  data () {
    return {
			data:{},
			id:"",
			type:"",
			"hide":false,
            "isClear":true
    	}
  },
    methods: {
        actives(){
        		this.data.IsLike== 0 ?(this.data.LikeCount++) :(this.data.LikeCount --)
          		this.data.IsLike ==0 ?(this.data.IsLike = 1) :(this.data.IsLike =0)
          		var act ='';
//        		console.log(this.data.IsLike,"是否点赞")
          		if(this.data.IsLike==1){
          			act =1
          		}else{
          			act=2
          		}
          		var parameter ={
          			"course_id":this.id,
          			"course_type":this.type,
          			"course_action":act
          		}	
          		console.log(parameter,1)
          		this.$http.post(this.$httpUrl.doCourseLike,parameter).then((res)=>{
          			console.log(res)
          		},(err)=>{
          			console.log(err)
          		})
          		
            },
        showes(){     	
          	this.data.IsCollect== 0 ?(this.data.IsCollect = 1) :(this.data.IsCollect = 0)
          	var act1 ="";
          	if(this.data.IsCollect== 1){
          		act1= 1
          	}else(
          		act1=2
          	)
          	var parameters={
         			"course_id":this.id,
         			"course_type":this.type,
         			"course_action":act1
         	}
          
   			console.log(parameters,2)
     		this.$http.post(this.$httpUrl.doCourseCollect,parameters).then((res)=>{
     			console.log(res)
     		},(err)=>{
     			console.log(err)
     		})
        },
		getdata:function(){
        	this.id = this.$route.query.id;
          	this.type =this.$route.query.type;
        	var obj={
        		"type":this.type,
        		"id":this.id
        	}
        	this.$http.post(this.$httpUrl.getCatCoursedetail,obj).then((res)=>{
        		this.data= res.data.data;
        		console.log(this.data)
        	},(err)=>{
        		console.log(err)
        	})
        }
    },activated(){
    	this.getdata()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.classdetail{
	width: 100%;
	background: #F0F0F0;
}
.cla_article img{
	width: 100%!important;
}
.head_img{
	width: 100%;
	background: white;
}
.head_img img{
	width: 100%;
}
.head_img p{
	text-align: left!important;
	padding-left: 10px;
	color: #000000;
	font-size: 0.373rem;
	line-height: 0.9rem;
}
.class_sec{
	padding-bottom: 5px;
}
.class_sec,.cla_control{
	padding-top: 0.533rem;
	background: white;
}
.class_logo{
	background-image: url('../../assets/images/ioncfontlogo/red.png');
}
.class_logo1{
	background-image: url('../../assets/images/ioncfontlogo/green.png');
}
.class_logo,.class_logo1{
	
	background-repeat: no-repeat;
	width: 2.1333rem;
	background-size: 100% 100%;
	color: white;
	font-size: 0.32rem;
	height: 0.554rem;
	line-height: 0.554rem;
	margin-bottom: 10px;
	text-align: center;
}
.cla_join{
	padding-left: 10px;
	height: 28px;
	line-height: 28px;
	font-size: 0.32rem;
	text-align: left;
}
.cla_join img{
	width: 0.4rem;
	float: left;
	margin-top: 5px;
	margin-right: 6px;
}
.cla_join p{
	margin-bottom: 0!important;
}
.cla_join span{
	margin-right: 2px;
	
}
.cla_address{
	color: rgb(234,82,6);
}
.cla_control{
	margin-top: 10px;
	background: white;
}
.cla_article{
	text-align: left;
	padding-left: 10px;
	padding-right: 10px;
	line-height: 0.6rem;
	padding-bottom: 20px;
}
.cla_article li{
	margin-top: 3px;
}
.after_show, .afters{
       display:none;
    }
.last{
        height:34px;
        margin-top:10px;
        text-align:left;
        line-height:34px;
        background: white;
    }
   
    .last img{
        height:14px;
        color:#999;
        font-size:0.32rem;
        float:left;
        margin-top:10px;
        margin-right: 0.1rem;
    }
    .last>span{
    	 display: inline-block;
   	 
   	  height: 35px;
   	  padding-left: 1.6rem;
   	  box-sizing: border-box;
        margin-left:0.1rem;
        float:left;
        font-size:12px;
        margin-top:1px;
        width: 33%;
        margin: 0 auto;
    }
   .zan{
       background: url('../../assets/images/classes/zangray.png') no-repeat;
       padding-top: 2px;
       background-size: 0.4rem 0.4rem;
       padding-left: 0.6rem;
       background-position: 1.1rem 9px;
    }
   
    .zan1{ 
        background: url('../../assets/images/classes/zanyellow.png') no-repeat;
        color: rgb(255,204,0);
        
     	    padding-top: 2px;
        background-size: 0.4rem 0.4rem;
       padding-left: 1rem;
       background-position: 1.1rem 9px;
    }
    .collect {
      	background: url('../../assets/images/classes/collect.png') no-repeat;
      	 background-size: 0.4rem 0.4rem;
      height: 0.6rem ;
      width: 1rem;
   		background-position: 1.1rem 9px;
    }
   
     .collect1{
      background: url('../../assets/images/classes/collectyellow.png') no-repeat;
      background-size: 0.4rem 0.4rem;
      height: 0.6rem ;
      width: 1rem;
      background-position: 1.1rem 9px;
      color: rgb(255,204,0);
     }
    
     .cla_free{
        position:absolute;
        right:0;
        top:10px;
        width:50px;
     }
</style>
