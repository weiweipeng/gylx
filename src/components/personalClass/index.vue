
<!--个人约课组件-->

<template>

  <div id="personalClass" class="mui-content" style="background-color: #FFFFFF;">
    <loadings :isHide="hide" v-if="isClear"></loadings>
    <div id="pullrefresh" class="mui-scroll-wrapper" >
      <div class="mui-scroll" style="background-color: #FFFFFF;">
        <!--这里放置真实显示的DOM内容-->

        <!--列表-->
        <list-course v-bind:listdata.sync="list" v-on:subscribe="doSubscribe" v-on:jumpJump="jump" v-on:zanZan="doZan" v-on:collect="doCollect"></list-course>
      </div>
    </div>

  </div>
</template>

<script>
  import listCourse from '../base/list-course'
  import loadings from '../base/loading/loading.vue'
    export default {
      name: 'personalClass',
      data () {
        return {
          "list": [],
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
          var params = {
            "page":p,
            "row":r
          }
          var that = this;
          that.$http.post(that.$httpUrl.getPersonalCourseList,params).then((response) => {
            //响应成功回调
            console.log(response);
              if(!that.hide){
                that.hide = true;
                setTimeout(function () {
                  that.isClear = false;
                },1000)
              }
            const code = response.data.code
            if(code == 200){
                const arr = response.data.data;
              if(p==1){
                //p等于1为下拉刷新或数据首次初始化
                //初始化操作
                that.list = [];//清空数组
                that.list = arr;
                console.log("list中的值为：")
                console.log(that.list);

                if(r==10){
                  //下拉刷新操作
                  mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                }
              }else {
                //否则为上拉加载
                that.list = that.list.concat(arr);
                console.log("上拉加载后list中的值为：")
                console.log(that.list);
                if(response.data.data.length <10){
//                  mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                  mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                }else {
                  mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                }
              }
            }else if(code == 306){
              mui('#pullrefresh').pullRefresh().endPullupToRefresh();
//            mui.alert("不要再扯啦，没有更多数据啦！");

            }

          }, (err) => {
            //响应错误回调
            alert('服务器请求错误');
            console.log(err);
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
          this.$router.push({path:'/personalClass/personalStatement?cid='+cid});
        },
        jump:function (cid) {
          /*========跳转至详情界面=========*/
          console.log("cid:"+cid);
          this.$router.push({path:'/classdetail?id='+cid+'&type=1'})
        },
        /**
         *点赞方法
         * @param a：行为：1点赞；2取消点赞
         * @param cid：课程ID
         */
        doZan:function (a,cid) {
          /*=====点赞=======*/
          console.group("从子组件接收到的点赞信息");
          console.log(a);
          console.log(cid);
          console.groupEnd();
          const url = '/api/doCourseLike';
          this.doZanOrCollect(a,cid,url);
        },
        /**
         * 收藏方法
         * @param a：行为：1收藏；2取消收藏
         * @param cid：课程ID
         */
        doCollect:function (a,cid) {
          /*=====收藏=========*/
          const url = '/api/doCourseCollect';
          this.doZanOrCollect(a,cid,url);
        },
        /**
         * 点赞和收藏的公共方法
         * @param a：行为
         * @param cid：课程ID
         * @param url：
         */
        doZanOrCollect:function (a,cid,url) {

          const that = this;
          if(url=='/api/doCourseLike'){
              url =that.$httpUrl.doCourseLike;
          }else if(url == '/api/doCourseCollect'){
            url =that.$httpUrl.doCourseCollect;
          }
          that.$http.post(url,{
            "course_id":cid,
            "course_type":1,
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
        },
        isExistence:function (a,o) {
            if(JSON.stringify(a).indexOf(JSON.stringify(o)) == -1){
                return false;
            }
            return true;
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
.mui-pull-bottom-pocket {
	background-color: #f0f0f0!important;
}
</style>
