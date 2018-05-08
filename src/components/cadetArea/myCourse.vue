/*
我预约的课程
*/

<template>
    <div>
      <loadings :isHide="hide" v-if="isClear"></loadings>

      <div class="mui-content">
        <div id="slider" class="mui-slider mui-fullscreen">
          <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <a class="mui-control-item" href="#item1mobile">
              个人约课
            </a>
            <a class="mui-control-item" href="#item2mobile">
              企业约课
            </a>
          </div>
          <div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-6" style="background-color: rgb(247,247,247);">
            <div style="width: 75%;background-color: #efeff4;height: 2px;">
              <div style="width: 67%;height: 2px;background-color: rgb(255,182,0);float: right;"></div>
            </div>
          </div>
          <div style="background-color: #dfdfdf;height: 1px;"></div>
          <div class="mui-slider-group">
            <div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
              <div id="scroll1" class="mui-scroll-wrapper">
                <div class="mui-scroll">
                  <!--列表-->
                  <ul id="list-course">
                    <li class="item" v-for="item in list" @tap="jump(item.AppointmentId,1,item.CourseId)">
                      <img class="img-right" v-bind:src="item.FileUrl" alt="" >
                      <div class="item-msg">
                        <div class="con-title" >
           <span class="text-title col-333 mm-1" v-text="item.Title">
           课程标题
          </span>

                          <img class="icon-state" v-if="item.Status==0" src="../../assets/images/course/icon-slz@2x.png" alt="">
                          <img class="icon-state" v-if="item.Status==2" src="../../assets/images/course/icon-slcg@2x.png" alt="">
                          <img class="icon-state" v-if="item.Status==3" src="../../assets/images/course/icon-wsl@2x.png" alt="">
                          <img class="icon-state" v-if="item.Status==5" src="../../assets/images/course/icon-yfk@2x.png" alt="">
                        </div>

                        <div class="con-partake">
                          <img class='icon-partake' src='../../assets/images/classes/human.png'>
                          <span class='text-partake col-333 m-l-5'>已参与人数：</span>
                          <span class='text-partake col-red' v-text="item.count">{{item.partake}}</span>
                        </div>
                        <div class='con-synopsis'>
                          <span class='text-synopsis mm-2 col-333'><span class='col-666 mui-ellipsis-2' style="line-height: 0.5rem;">简介：<span v-text="item.SubTitle"></span></span></span>
                        </div>
                        <!-- 浏览、点赞、收藏 -->
                        <div class='con-3'>
                          <!-- 浏览 -->
                          <div class='con-browse'>
                            <img class='icon-browse' src='../../assets/images/classes/read.png'>
                            <span class='text-browse col-a1 m-l-5' v-text="item.ClickCount">{{item.browsenum}}</span>
                          </div>
                          <!-- 点赞 -->
                          <div class='con-praise'  @tap.stop="item.IsLike = doZan(item.IsLike,item.CourseId,1),item.LikeCount = changeNum(item.IsLike,item.LikeCount)">
                            <span class="icon-praise"  v-bind:class="{ 'add-zan':item.IsLike==1,'cancel-zan':item.IsLike==0}"  ></span>
                            <span class='text-praise  m-l-5' v-bind:class="{'col-ffcc00':item.IsLike==1,'col-a1':item.IsLike==0}">{{item.LikeCount}}</span>
                          </div>
                          <!-- 收藏 -->
                          <span     class='icon-collect'  v-bind:class="{ 'icon-collect-yellow':item.IsCollect==1 ,'icon-collect-base':item.IsCollect==0}" @tap.stop="item.IsCollect = doCollect(item.IsCollect,item.CourseId,1)" v-bind:a="item.IsCollect"   ></span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="item2mobile" class="mui-slider-item mui-control-content">
              <div id="scroll2" class="mui-scroll-wrapper">
                <div class="mui-scroll">
                  <!--列表-->
                  <ul id="list-course2">
                    <li class="item" v-for="item in list2" @tap="jump(item.AppointmentId,2,item.CourseId)">
                      <img class="img-right" v-bind:src="item.FileUrl" alt="" >
                      <div class="item-msg">
                        <div class="con-title" >
           <span class="text-title col-333 mm-1" v-text="item.Title">
           课程标题
          </span>

                          <img class="icon-state" v-if="item.Status==0" src="../../assets/images/course/icon-slz@2x.png" alt="">
                          <img class="icon-state" v-if="item.Status==2" src="../../assets/images/course/icon-slcg@2x.png" alt="">
                          <img class="icon-state" v-if="item.Status==3" src="../../assets/images/course/icon-wsl@2x.png" alt="">
                          <img class="icon-state" v-if="item.Status==5" src="../../assets/images/course/icon-yfk@2x.png" alt="">
                        </div>

                        <div class="con-partake">
                          <img class='icon-partake' src='../../assets/images/classes/human.png'>
                          <span class='text-partake col-333 m-l-5'>已参与人数：</span>
                          <span class='text-partake col-red' v-text="item.count">{{item.partake}}</span>
                        </div>
                        <div class='con-synopsis'>
                          <span class='text-synopsis mm-2 col-333'><span class='col-666 mui-ellipsis-2' style="line-height: 0.5rem;">简介：<span v-text="item.SubTitle"></span></span></span>
                        </div>
                        <!-- 浏览、点赞、收藏 -->
                        <div class='con-3'>
                          <!-- 浏览 -->
                          <div class='con-browse'>
                            <img class='icon-browse' src='../../assets/images/classes/read.png'>
                            <span class='text-browse col-a1 m-l-5' v-text="item.ClickCount">{{item.browsenum}}</span>
                          </div>
                          <!-- 点赞 -->
                          <div class='con-praise'  @tap.stop="item.IsLike = doZan(item.IsLike,item.CourseId,2),item.LikeCount = changeNum(item.IsLike,item.LikeCount)">
                            <span class="icon-praise"  v-bind:class="{ 'add-zan':item.IsLike==1,'cancel-zan':item.IsLike==0}"  ></span>
                            <span class='text-praise  m-l-5' v-bind:class="{'col-ffcc00':item.IsLike==1,'col-a1':item.IsLike==0}">{{item.LikeCount}}</span>
                          </div>
                          <!-- 收藏 -->
                          <span     class='icon-collect'  v-bind:class="{ 'icon-collect-yellow':item.IsCollect==1 ,'icon-collect-base':item.IsCollect==0}" @tap.stop="item.IsCollect = doCollect(item.IsCollect,item.CourseId,2)" v-bind:a="item.IsCollect"   ></span>
                        </div>
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
  import listCourse from '../base/list-course'
  import loadings from '../base/loading/loading.vue'
  import baseMask from '../base/mask'
    export default {
        name: 'name',
        data () {
            return {
                "listdata":[],
              "list":"",
              "list2":"",
              "page1":1,
              "page2":1,
              "hide":false,
              "isClear":true
            }
        },
      components: {
        listCourse,
        loadings,
        baseMask
      },
      methods: {
      	jump:function(id,type,cid){
      		this.$router.push("/myCoursedetail?aid="+id+"&type="+type+"&cid="+cid);
      	},
        /**
         *获取数据
         * @param p：页码
         * @param r：每页的数据条数
         * @param t：获取数据类型；1为个人预约数据，2为企业预约数据
         * @param f：触发判断标识；0为初始化，1为下拉刷新，2为上拉加载
         * @param s：触发上拉或者下拉的元素；用于停止上拉和下拉
         */
        getdata:function (p,r,t,f,s){
          const that = this;
          const params = {
			"page":p,
            "row":r,
            "type":t
          }
          that.$http.post(that.$httpUrl.getMyAppointList,params).then((response) => {
              //响应成功回调
              console.log(response);
              if(!that.hide){
                  that.hide = true;
                  setTimeout(function () {
                    that.isClear = false;
                  },1000)
              }
              if(t==1){
                  //type等于1，说明请求的是个人预约列表
                if(f==1||f==0){
                  that.list = response.data.data;
                  if(f==1){
                      console.log("结束下拉");
                    s.endPullDownToRefresh();
                  }
                }else if(f==2){
                  if( response.data.code == 200) {
                    that.list = that.list.concat(response.data.data);
                  }

                  if(response.data.code == 306){
                    s.endPullUpToRefresh(true);
                  }else {
                    s.endPullUpToRefresh();
                  }
                  console.log("结束上拉");

                }
                console.log("list中的值为：")
                console.log(that.list);
              }else if(t==2){
                //否则为企业预约列表
                if(f==1||f==0){
                  that.list2 = response.data.data;
                  if(f==1){
                    console.log("结束下拉");
                    s.endPullDownToRefresh();
                  }
                }else if(f==2){
                    if( response.data.code == 200){
                        that.list2 = that.list2.concat(response.data.data);
                    }
                  if(response.data.code == 306){
                    s.endPullUpToRefresh(true);
                  }else {
                    s.endPullUpToRefresh();
                  }
                  console.log("结束上拉");
                }
                console.log("list2中的值为：")
                console.log(that.list2);
              }

            }, (error) => {
              //响应错误回调
//              alert('服务器请求错误');
              if (error.response) {
                console.log('error.response')
                console.log(error.response);
              } else if (error.request) {
                console.log(error.request)
                console.log('error.request')
                if(error.request.readyState == 4 && error.request.status == 0){
                  //我在这里重新请求
                  mui.alert("网络超时")
                }
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
            }
          )

        },
        doCollect:function (d,cid,type) {
            var flag = "";
          if(d==0){
            console.log("收藏");
            console.log("请求收藏接口");
            d=1;
            flag = 1;
          }else {
            console.log("取消收藏");
            console.log("请求取消收藏接口");
            d=0;
            flag = 2;
          }
          this.doZanOrCollect(flag,cid,2,type);
          return d;
        },
        doZan:function (z,cid,type) {
          console.log(z);
          var flag = "";
          if(z==0){
            console.log("点赞");
            console.log("请求点赞接口");
            z=1;
            flag = 1;
          }else {
            console.log("取消点赞");
            console.log("请求取消点赞接口");
            z=0;
            flag = 2;
          }
          this.doZanOrCollect(flag,cid,1,type);
          return z;
        },
        changeNum:function (z,num) {
          if(z){
            console.log("点赞");
            console.log("请求点赞接口点赞量加1");
            num = parseInt(num) + 1;
          }else {
            console.log("取消点赞");
            console.log("请求取消点赞接口点赞量减1");
            num = parseInt(num) - 1;
          }
          return num;
        },
        /**
         * 点赞和收藏的公共方法
         * @param a：行为
         * @param cid：课程ID
         * @param uType：点赞收藏标识符；1为点赞，2为收藏
         * @param cType：课程类型：1为个人课程，2为企业课程
         */
        doZanOrCollect:function (a,cid,uType,cType) {

          const that = this;
          var  url;
          if(uType==1){
            url =that.$httpUrl.doCourseLike;
          }else if(url == 2){
            url =that.$httpUrl.doCourseCollect;
          }
          that.$http.post(url,{
            "course_id":cid,
            "course_type":cType,
            "course_action":a
          }).then( (response)=>{
            console.group("成功回调");
            console.log(response);
            console.groupEnd();
          },(error)=>{
            console.group("失败回调");
            console.log(error);
            console.groupEnd();
          })
        }

      },
      created(){
        this.getdata(1,10,1,0);
        this.getdata(1,10,2,0);
      },
    mounted(){
          const that = this;
    	mui("#slider").slider();
      var deceleration = mui.os.ios?0.003:0.0009;
      mui('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration:deceleration
      });
      mui.ready(function() {
        //循环初始化所有下拉刷新，上拉加载。
        mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
          console.log(pullRefreshEl);
          mui(pullRefreshEl).pullToRefresh({
            down: {
              callback: function() {
                var self = this;
                setTimeout(function() {
                  const id = self.element.firstChild.id;
                  const type = id=="list-course"?1:2;
                  const page = 1;
                  console.group("触发下拉的列表：");
                  console.log(id);
                  console.groupEnd();
                  that.getdata(page,10,type,1,self);

                }, 1000);
              }
            },
            up: {
              callback: function() {
                var self = this;
                setTimeout(function() {
                  const id = self.element.firstChild.id;
                  const type = id=="list-course"?1:2;
                  const page = id=="list-course"?++that.page1:++that.page2;
                  console.group("触发上拉的列表：");
                  console.log(self.element.firstChild.id);
                  console.groupEnd();
                  that.getdata(page,10,type,2,self);

                }, 1000);
              }
            }
          });
        });
      });
     },
      beforeUpdated(){

      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .mui-control-content {
    background-color: white;

  }
  .mui-control-content .mui-loading {
    margin-top: 50px;
  }
  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
    color: rgb(255,182,0);
  }
  #sliderSegmentedControl{
    background-color: #ffffff;
  }
  .mui-slider .mui-segmented-control.mui-segmented-control-inverted~.mui-slider-group .mui-slider-item{
  	border: 0;
  }
.mui-fullscreen .mui-segmented-control ~ .mui-slider-group{
	margin-top: 10px;
}
  /* pages/courseList/courseList.wxss */
  ul{
    overflow-x: hidden;
  }
  li{
    text-align: left;
    margin-bottom: 10px;

  }
  li::after{
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 10px;
    background-color: rgb(247,247,247);
  }
  .item{
    display: flex;
    padding: 10px;
    position: relative;
  }

  .free{
    width: 10.93333vw;
    height: 10.93333vw;
    position: absolute;
    top:2.666666vw;
    right: 2.666666vw;
  }
  .hidden{
    display: none;
  }
  .img-right{
    /*width: 41.6vw;*/
    /*height: 27.2vw;*/
    width: 156px!important;
    height:120px!important;
    flex-shrink: 0;
  }
  .item-msg{
    flex-grow:1;
    display: flex;
    flex-direction: column;
    margin-left:10px;
  }
  .con-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text-title{
    font-size: 15px;
  }
  .btn{
    display: inline-block;
    width: 45px;
    height: 20px;
    border-radius: 3px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    background-color: rgb(255,204,0);
  }
  .con-partake{
    margin: 12px 0 10px 0;
  }
  .icon-partake{
    width: 15px!important;
    height: 11.5px!important;
  }
  .text-partake,.text-synopsis{
    font-size: 14px;
    line-height: 14px;
  }
  .text-synopsis{
    line-height: 16px;
  }
  .icon-browse,.icon-praise,.icon-collect{
    width: 13px!important;
    height: 13px!important;
    background-size: 13px 13px;
  }
  .icon-collect{
    margin-right: 26px;
  }
  .add-zan{
    background-image: url("../../assets/images/classes/zanyellow.png");
  }
  .cancel-zan{
    background-image: url("../../assets/images/classes/zangray.png");
  }
  .icon-collect-yellow{
    background-image: url("../../assets/images/classes/collectyellow.png");

  }
  .icon-collect-base{
    background-image: url("../../assets/images/classes/collect.png");
  }
  .text-browse,.text-praise{
    font-size: 12px;
    line-height: 12px;
  }
  .con-3{
    flex-grow:1;
    align-items: flex-end;
    display: flex;
    justify-content: space-between;

  }
  .con-browse,.con-praise{
    display: flex;
    align-items: flex-end;
  }
  .col-333{
    color: #333;
  }
  .col-red{
    color: #ee805b;
  }
  .col-666{
    color: #666;
  }
  .col-a1{
    color: #a1a1a1;
  }
  .col-ffcc00{
    color: #ffcc00;
  }
  .m-l-5{
    margin-left: 5px;
  }
  .mm-2{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .mm-1{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }
  .icon-state{
    width: 52px!important;
    height: 52px!important;
    position: absolute;
    top:0;
    right: 0;
  }
</style>
<style>
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
  .mui-pull-top-wrapper .mui-icon,
  .mui-pull-top-wrapper .mui-spinner {
    margin-top: 7px;
  }
  .mui-pull-top-wrapper .mui-icon.mui-reverse {
    /*-webkit-transform: rotate(180deg) translateZ(0);*/
  }
  .mui-pull-bottom-tips {
    text-align: center;
    background-color: #ffffff;
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

