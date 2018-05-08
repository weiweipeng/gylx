<template>
   <div class="header">
   	<loadings :isHide="hide" v-if="isClear"></loadings>
      <img src="../../assets/images/index/banner.png">
      <div class="ca_row">
         <div  @tap='jumpto(datas[0].ID)' class="category_img">
             <!-- <router-link to="/classes">-->
              <img src="../../assets/images/category/dancepic@2x.png" >
              <img src="../../assets/images/category/danceicon@2x.png" class="category_icon"/>
              <span class="category_text">舞蹈类</span>
              <!-- </router-link>-->
         </div>
          <div class="right category_img" @tap='jumpto(datas[1].ID)' >
          	<img src="../../assets/images/category/musicpic@2x.png" >
          	<img src="../../assets/images/category/musicicon@2x.png" class="category_icon"/>
          	<span class="category_text">声乐类</span>
          </div>
      </div>
      <div class="ca_row ca_row1">
          <div @tap='jumpto(datas[2].ID)' class="category_img1">
            <img src="../../assets/images/category/artpic@2x.png">
            <img src="../../assets/images/category/articon@2x.png" class="category_icon1"/>
            <span class="category_text1">文学与艺术类</span>
          </div>
          <div class="right subright">
              <div class="subrig_fir category_img" @tap='jumpto(datas[3].ID)'>
              	<img src="../../assets/images/category/gamepic@2x.png">
              	<img src="../../assets/images/category/gameicon@2x.png" class="category_icon2" />
              	<span class="category_text2">棋牌类</span>
              </div>
              <div class="subrig_sec category_img" @tap='jumpto(datas[4].ID)'>
              	<img src="../../assets/images/category/sportspic@2x.png">
              	<img src="../../assets/images/category/sportsicon@2x.png" class="category_icon2" />
              	<span class="category_text2">运动类</span>
              </div>
              
          </div>
      </div>
      <div class="three_row">
      	  <div class="three_fir category_img1" @tap='jumpto(datas[5].ID)'>
      	  	 <img src="../../assets/images/category/lifepic@2x.png">
      	  	 <img src="../../assets/images/category/lifeicon@2x.png" class="category_icon3" />
      	  	 <span class="category_text3">生活技能类</span>
      	  </div>
          <div class="three_sec category_img1" @tap='jumpto(datas[6].ID)'>
          	 <img src="../../assets/images/category/healthpic@2x.png">
          	 <img src="../../assets/images/category/healthicon@2x.png" class="category_icon3" />
          	 <span class="category_text3">身心健康类</span>
          </div>
          <div class="three_thr category_img1" @tap='jumpto(datas[7].ID)'>
          	<img src="../../assets/images/category/handworkpic@2x.png">
          	<img src="../../assets/images/category/handworkicon@2x.png" class="category_icon3" />
          	<span class="category_text3">手工制作类</span>
          </div>
          
      </div>
       
      <router-link to="/lesson">
      	<div class="session">
           查看热门课程
        </div>
      </router-link>
     <div class="msg" v-if="isblock ==1">
	    <div class="mgsbox">
	      <div class="mgstext">
	       <p>恭喜您获得</p >
	       <p><span>5</span>个积分</p >
	      </div>
	    </div>
	    <button class="btn_more" @tap="jumpgo">查看更多课程</button>
	    <div class="closebtn" @tap="close"></div>
      </div>
     <!-- <router-link to="home">Home</router-link>-->
   </div>
</template>

<script>
import loadings from '../base/loading/loading.vue'
export default {
  name: 'category',
  data () {
    return {
       isblock:0,
      datas:[],
      "hide":false,
      "isClear":true
    }
  },
  methods:{
  	close:function(){
  		this.isblock=0;
  	},
  	getdata:function(){
  		var that=this;
  		this.$http.get(this.$httpUrl.getCategoryPage)
		  .then(function (res) {
		   if(!that.hide){
                  that.hide = true;
                  setTimeout(function () {
                    that.isClear = false;
                  },1000)
    			}
//		   if(res.data.code == 306){
//            	mui.toast("暂无更多数据")
//           }
//		   console.log(1111);
           console.log(res);
           that.datas=res.data.data;
            console.log(that.datas);
		  })
		  .catch(function (error) {
		  	console.log(111);
		    console.log(error);
		  });
  	},
  	  jumpto:function(cid){
  		console.log(cid);
  		this.$router.push('/classes?cid='+cid);
  	  },
  	  jumpgo:function(){
  	  	this.$router.push('/lesson');
  	  }
   },
   components:{	
		loadings
     },
   created(){
  	this.getdata();
  	this.isblock= this.$route.query.isblock;
   },
    activated(){
		this.getdata(1);
		this.hide =false;
		this.isClear =true
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.category_img1{
	position: relative;
}
.category_icon3{
	position: absolute;
	top: 0.7rem;
	left: 1.2rem;
	width: 1rem!important;
	/*height: 1.4rem!important;*/
	display: inline-block;
	
}
.ca_row1{
	height: 5.46rem;
	overflow: hidden;
}
.category_icon1{
	position: absolute;
	top: 1.8rem;
	left: 1.6rem;
	width: 1.4rem!important;
	/*height: 1.4rem!important;*/
	display: inline-block;
}
.category_icon2{
	position: absolute;
	top: 0.8rem;
	left: 1.2rem;
	width: 1rem!important;
	/*height: 1.4rem!important;*/
	display: inline-block;
}
.category_text2{
	position: absolute;
	top: 1rem;
	left: 2.4rem;
	color: white;
	font-size: 0.4rem;
	font-weight: 600;
}
.category_text3{
	position: absolute;
	top: 1.7rem;
	left: 0.7rem;
	color: white;
	font-size: 0.4rem;
	font-weight: 600;
}
.category_text1{
	position: absolute;
	top: 2.8rem;
	left: 1rem;
	color: white;
	font-size: 0.4rem;
	font-weight: 600;
}
.category_img{
	position: relative;
	height: 2.64rem;
}
.category_icon{
	position: absolute;
	top: 0.8rem;
	left: 1rem;
	width: 1.4rem!important;
	/*height: 1.4rem!important;*/
	display: inline-block;
}
.category_text{
	position: absolute;
	top: 1rem;
	left: 2.6rem;
	color: white;
	font-size: 0.4rem;
	font-weight: 600;
}
.header{
  width:100vw;
}
.header img{
  width:100%;
  height:auto;
}
.ca_row{
	width:100%;
	padding-left:0.18rem;
	padding-right:0.18rem;
	box-sizing:border-box;
	margin-top:0.14rem;
}
.ca_row div{
	width: 49%;
	float:left;
}
.ca_row:after{
	content: '';
	display: block;
	clear: both;
}
.ca_row img{
	width:100%;
}
.right{
	margin-left:1.5%;
}
.subright>div{
	display: block;
	width: 100%;
	margin-bottom: 0.1rem;
}
.three_row{
	width:100%;
	text-align: center;
	padding-left: 0.1rem;
	padding-right: 0.1rem;
	box-sizing: border-box;
}
.three_row img{
	width: 100%;
	
	
}
.three_row>div{
	float: left;
	width: 33%;
	padding: 0.08rem;
}
.three_row:after{
	content:"";
	display: block;
   clear: both;
}
.session{
	width:97%;
	margin-left:1.5%;
	height:1.066rem;
	box-sizing:border-box;
	margin-top:0.266rem;
	background:url('../../assets/images/index/button.png') no-repeat;
	background-size:100% 100%;
	text-align:center;
	line-height:1.066rem;
	color:white;
	margin-bottom: 20px;
}


/* 遮盖层*/

.msg{
 position: absolute;
 height: 100%;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 background: rgba(0,0,0,.5);
}
.mgsbox{
 width: 8.0266rem;
 margin: 0.373rem auto;
 height: 6.573rem;
 background: url('../../assets/images/index/popoup@2x.png') no-repeat left center;
 background-size: 100% 100%;
 position: relative;
}
.mgstext{
 position: absolute;
 bottom: 40px;
 width: 100%;
 text-align: center;
}
.mgsbox .mgstext >p{
 color: #fff;
 margin: 0;
}
.mgsbox  .mgstext>p:first-child{
 font-size: 0.64rem;
 margin-bottom: 0.2rem;
}
.mgsbox .mgstext>p:last-child span{
 font-size: 0.613rem;
 
}
.mgsbox .mgstext>p:last-child{
 font-size: 0.506rem;
 /*margin-top: 0.2rem;*/
}
.closebtn{
 width: 0.56rem;
 height: 0.56rem;
 background: url('../../assets/images/index/shutdon@2x.png') no-repeat center center;
 background-size: 100% 100%;
 position: absolute;
 top: 0.4rem;
 right: 0.4rem;
}
.btn_more{
 width:4rem;
 height: 1.066rem;
 /*line-height: 40px;*/
 text-align: center;
 color: #fff;
 background: #ffcc00;
 font-size: 0.373rem;
 border: 0;
 border-radius: 0.186rem;
 outline: none;
 display: block;
 margin: 0 auto;
}
</style>
