/*
  我的消息详情
*/

<template>
    <div id="myMsgDetail">
      <loadings :isHide="hide" v-if="isClear"></loadings>
      <span class="title" v-text="msg.Titile">
        【个人约课】  申请提交成功
      </span>
      <p class="text-from">
        来源：公益乐学   <span v-text="msg.CreateTime">2018年2月1日  18:58</span>
      </p>
      <div class="text-tips" v-text="msg.Content">
        您提交了街舞初级入门课程的申请，申请正在受理中，请耐心等待。
      </div>
      <!--<img class="img" v-bind:src="msg.PctureImg" alt="">-->
      <!--<table border="1" class="tables">-->
        <!--<tr>-->
          <!--<td>课程</td>-->
          <!--<td>拉丁舞</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>上课地点</td>-->
          <!--<td>上海市浦东新区中山一路</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>上课时间</td>-->
          <!--<td>2018/02/23</td>-->
        <!--</tr>-->
      <!--</table>-->
      <p class="tips-bottom">
        查看更多详情请点击下方链接
      </p>
      <a class="link-y" href="#/myCourse">
        如要查看预约详情请点击：我预约的课程
      </a>
      <a class="link-k" :href="'#/classdetail?id='+msg.CourseId+'&type='+msg.CourseType">
        如要查看课程详情请点击：课程详情
      </a>
    </div>
</template>
<script>
  import loadings from '../base/loading/loading.vue'
    export default {
      name: 'myMsgDetail',
        data () {
            return {
              "msg":"",
              "ID":"",
              "hide":false,
              "isClear":true
            }
        },components: {
        loadings
      },
      methods:{
          getdata:function () {
            const that = this;
            that.$http.post(that.$httpUrl.getMessageDetail,{"ID":that.ID}).then((res)=>{
                console.log(res);
              if(!that.hide){
                that.hide = true;
                setTimeout(function () {
                  that.isClear = false;
                },1000)
              }
                const code = res.data.code;
                if(code == 200){
                    that.msg = res.data.data;
                }else {
                    mui.alert("网络开小差啦，请稍后再试哦！");
                }

            },(err)=>{
                console.log(err);
            })
          }
      },
      activated(){
        this.hide=false;
        this.isClear=true;
          this.ID = this.$route.query.id;
          this.getdata();
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #myMsgDetail{
    padding: 10px;
    background:#fff;
     text-align: center;
  }
.title{
  font-size: 15px;
}
  .text-from{
    font-size: 12px;
    margin-top: 15px;
    color: rgb(153,153,153);
    text-align: left;
  }
  .text-tips{
    text-align: left;
    font-size: 15px;
    text-indent: 30px;
  }
  .img{
    width: 100%;
    height: 210px;
    margin-top: 15px;
  }
  table{
    width: 100%;
    margin-top: 15px;

  }
  td{
    padding: 10px 0;
  }
  tr td:first-child{
    width: 97px;
  }
  tr td:last-child{
    text-align: left;
    padding-left: 25px;
  }
  .tips-bottom{
    margin-top: 25px;
    font-size: 12px;
    color: rgb(160,160,160);
  }
  .link-y,.link-k{
    display: block;
   text-decoration: underline;
    margin-top: 15px;
  }
</style>
<style>
  html,body{
    background-color: #ffffff;
  }
</style>
