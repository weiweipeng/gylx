

<!--约课列表组件-->

<template>
  <ul id="list-course">
    <li class="item" v-for="item in listdata" v-bind:cid="item.CourseId" >
      <img class="img-right" v-bind:src='item.FileUrl' alt="" @tap="doJump(item.CourseId)">
      <div class="item-msg">
        <div class="con-title" >
           <span class="text-title col-333 mm-1">
           {{item.Title}}
          </span>
          <span class="btn" @tap.stop="doSubscribe(item.CourseId)">预约</span>
        </div>

        <div class="con-partake">
          <img class='icon-partake' src='../../../assets/images/classes/human.png'>
          <span class='text-partake col-333 m-l-5'>已参与人数：</span>
          <span class='text-partake col-red'>{{item.AppointmentCount}}</span>
        </div>
        <div class='con-synopsis'>
          <span class='text-synopsis mm-2 col-333'>简介：<span class='col-666'>{{item.SubTitle}}</span></span>
        </div>
        <!-- 浏览、点赞、收藏 -->
        <div class='con-3'>
          <!-- 浏览 -->
          <div class='con-browse'>
            <img class='icon-browse' src='../../../assets/images/classes/read.png'>
            <span class='text-browse col-a1 m-l-5'>{{item.ClickCount}}</span>
          </div>
          <!-- 点赞 -->
          <div class='con-praise'  @tap.stop="item.IsLike = doZan(item.IsLike,item.CourseId),item.LikeCount = changeNum(item.IsLike,item.LikeCount)">
            <span class="icon-praise"  v-bind:class="{ 'add-zan':item.IsLike==1,'cancel-zan':item.IsLike==0}"  ></span>
            <span class='text-praise  m-l-5' v-bind:class="{'col-ffcc00':item.IsLike==1,'col-a1':item.IsLike==0}">{{item.LikeCount}}</span>
          </div>
          <!-- 收藏 -->
          <span     class='icon-collect'  v-bind:class="{ 'icon-collect-yellow':item.IsCollect==1 ,'icon-collect-base':item.IsCollect==0}" @tap.stop="item.IsCollect = doCollect(item.IsCollect,item.CourseId)" v-bind:a="item.IsCollect"   ></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  //  import lineDivision from '../line-division'
  export default {
    name: 'list-course',
    props:['listdata'],
    data () {
      return {
        "list":this.listdata
      }
    },
    components:{

    },
    methods:{
      doSubscribe:function (cid) {
        this.$emit('subscribe',cid);//触发父组件中的subscribe事件
      },
      doCollect:function (d,cid) {
        if(d==0){
          console.log("收藏");
          console.log("请求收藏接口");
          d=1;
          this.$emit('collect',1,cid);
        }else {
          console.log("取消收藏");
          console.log("请求取消收藏接口");
          d=0;
          this.$emit('collect',2,cid);
        }
        return d;
      },
      doZan:function (z,cid) {
        console.log(z)
        if(z==0){
          console.log("点赞");
          console.log("请求点赞接口");
          z=1;
          this.$emit('zanZan',1,cid);
        }else {
          console.log("取消点赞");
          console.log("请求取消点赞接口");
          z=0;
          this.$emit('zanZan',2,cid);
        }
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
      doJump:function (cid) {
        this.$emit('jumpJump', cid);

      }
    },
    mounted(){
      console.log(this);

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    /*flex-shrink: 1;*/
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
    line-height: 20px;
    border-radius: 3px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    background-color: rgb(255,204,0);
    flex-shrink:0;
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
    background-image: url("../../../assets/images/classes/zanyellow.png");
  }
  .cancel-zan{
    background-image: url("../../../assets/images/classes/zangray.png");
  }
  .icon-collect-yellow{
    background-image: url("../../../assets/images/classes/collectyellow.png");

  }
  .icon-collect-base{
    background-image: url("../../../assets/images/classes/collect.png");
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
  .mm-2,.mm-1{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;

  /*autoprefixer: off*/
  -webkit-box-orient:vertical;
    /*autoprefixer: on*/
  }
  .mm-1{
    -webkit-line-clamp:1;

  }
  .mm-2{
    -webkit-line-clamp:2;
  }
</style>
