<template>
  <div id="companyClass" class="mui-content" style="background-color: #FFFFFF;">
    <loadings :isHide="hide" v-if="isClear"></loadings>
    <div id="pullrefresh" class="mui-scroll-wrapper" >
      <div class="mui-scroll" style="background-color: #FFFFFF;">
        <!--这里放置真实显示的DOM内容-->
        <list-course v-bind:listdata.sync="list" v-on:subscribe="doSubscribe" v-on:jumpJump="jump" v-on:zanZan="doZan" v-on:collect="doCollect"></list-course>
      </div>
    </div>
  </div>
</template>

<script>
  import listCourse from '../base/list-course'
  import loadings from '../base/loading/loading.vue'

  export default {
    name: 'companyClass',
    data () {
      return {
        "list": "",
        "page":1,
        "hide":false,
        "isClear":true
      }
    },
    components: {
      listCourse,
      loadings
    },
    methods: {
      getdata:function (p,r,m){
//          var url = "http://localhost:8080/static/api/personalClass/data.json";

        var url = "/api/getCourseInformationList";
        var params = {
          "page":p,
          "row":r
        }
        console.log(url);
        var that = this;
        that.$http.post(that.$httpUrl.getCourseInformationList,params).then((response) => {
            //响应成功回调
            console.log(response);
          if(!that.hide){
            that.hide = true;
            setTimeout(function () {
              that.isClear = false;
            },1000)
          }
            if(response.data.code == 200){

              if(p==1){
                //p等于1为下拉刷新
                that.list = [];//清空数组
                that.list = response.data.data;
                console.log("list中的值为：")
                console.log(that.list);
                if(r==10){
                  mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                }
              }else {
                //否则为上拉加载
                that.list = that.list.concat(response.data.data);
                console.log("上拉加载后list中的值为：")
                console.log(that.list);
                if(response.data.data.length <10){
                  mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                }else {
                  mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                }
              }
            }else {
              mui.alert("网络错误");
            }

          }, (response) => {
            //响应错误回调
            alert('服务器请求错误');
          }
        )
        console.log(this.list);
      },
      pulldownRefresh:function () {
        //下拉刷新
        this.getdata(1,10);

      },
      pullupRefresh:function () {
        //上拉加载
        this.getdata(++this.page,10);
      },
      doSubscribe:function (cid) {
          /*=====预约=======*/
        this.$router.push({path:'/companyClass/companyStatement?cid='+cid});
      },
      jump:function (cid) {
          /*========跳转至详情界面=========*/
        console.log("cid:"+cid);
//            location.href = '/companyClass/companyStatement?cid='+cid;
          this.$router.push({path:'/classdetail?id='+cid+'&type=2'})
      },
      doZan:function (a,cid) {
          /*=====点赞=======*/
        console.group("从子组件接收到的点赞信息");
        console.log(a);
        console.log(cid);
        console.groupEnd();
        const url = '/api/doCourseLike';
        this.doZanOrCollect(a,cid,url);
      },
      doCollect:function (a,cid) {
          /*=====收藏=========*/
        const url = '/api/doCourseCollect';
        this.doZanOrCollect(a,cid,url);
      },
      doZanOrCollect:function (a,cid,url) {
          /*========点赞和收藏的公共方法========*/
        const that = this;
        if(url=='/api/doCourseLike'){
          url =that.$httpUrl.doCourseLike;
        }else if(url == '/api/doCourseCollect'){
          url =that.$httpUrl.doCourseCollect;
        }
        that.$http.post(url,{
          "course_id":cid,
          "course_type":2,
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
    beforeCreate(){
      console.group('beforeCreate 创建前状态===============》');
      console.groupEnd();
    },
    created(){
      console.group('created 创建完毕状态===============》');
      this.getdata(1);
      console.groupEnd();
    },
    beforeMount(){
      console.group('beforeMount 挂载前状态===============》');
      console.groupEnd();
    },
    mounted() {
      console.group('mounted 挂载结束状态===============》');
      var that = this;
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
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
    beforeUpdate(){
      console.group('beforeUpdate 更新前状态===============》');
      var that = this;
//        mui('.mui-scroll-wrapper').scroll({
//          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//        });
//        mui.init({
//          pullRefresh: {
//            container: '#pullrefresh',
//            down: {
//              callback: that.pulldownRefresh,
//
//            },
//            up: {
//              contentrefresh: '正在加载...',
//              contentnomore: '没有更多数据了',
//              callback: that.pullupRefresh
//            }
//          }
//        })

      console.groupEnd();
    },
    updated(){
      console.group('updated 更新完成状态===============》');
      console.groupEnd();
    },
    beforeDestroy(){
      console.group('beforeDestroy 销毁前状态===============》');
      console.groupEnd();
    },
    destroyed(){
      console.group('destroyed 销毁完成状态===============》');
      console.groupEnd();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    background-color: #ffffff;
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
