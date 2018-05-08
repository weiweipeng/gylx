/*
我的消息
*/
<template>
    <div id="myMsg">
      <loadings :isHide="hide" v-if="isClear"></loadings>
<section v-for="item in list">
  <div>
      <span class="text-date" v-text="item.CreateTime">

      </span>
  </div>

  <div class="section" @tap="jump(item.ID)">
        <span class="title" v-text="item.Titile">
          【个人约课】 申请提交成功
        </span>
    <img class="img" v-bind:src="item.PctureImg" alt="">
    <p  class="msg mui-ellipsis" v-text="item.Intro">
      您已提交了街舞初级入门课程的申请，申请正在受理中
    </p>
   <div  class="text-link mui-navigate-right">
      查看详情
    </div>
  </div>
</section>
      <p class="con-more" @tap="getMore"><span v-text="moreText">查看更多消息</span></p>
    </div>
</template>

<script>
  import loadings from '../base/loading/loading.vue'
    export default {
        name: 'myMsg',
        data () {
            return {
                "list":"",
              "page":1,
              "disabled":false,
              "moreText":"查看更多消息",
              "hide":false,
              "isClear":true
            }
        },
      components: {
        loadings
      },
      methods:{
            jump:function (id) {
              this.$router.push({path:'/myMsgDetail?id='+id});
            },
            getdata:function (p,r) {
              const that = this;
              that.$http.post(that.$httpUrl.getMessageList,{"page":p,"row":r}).then((res)=>{
                  console.log(res);
                if(!that.hide){
                  that.hide = true;
                  setTimeout(function () {
                    that.isClear = false;
                  },1000)
                }
                  const code = res.data.code;
                  that.disabled = false;//恢复点击功能
                  if(code == 200){
                      if(p == 1){
                        that.list = res.data.data;
                      }else {
                        that.list = that.list.concat(res.data.data);
                      }

                  }else if(code==306){
                      that.moreText = "已显示全部消息啦";
                      that.disabled = true;
                    mui.alert("没有更多消息啦！");
                  }else {
                    mui.alert(res.data.message);
                  }
              },(err)=>{
                  console.log(err);
              })
            },
        getMore:function () {
                if(!this.disabled){
                    this.disabled = true;//点击一次之后先禁用查看更多消息，等到接口返回后再恢复功能
                  this.getdata(++this.page);

                }
        }
      },
      activated(){
          this.getdata(1);
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#myMsg{
	text-align: center;
}
.img{
  width: 100%;
  height: 180px;
  margin-top: 10px;
  display: block;
}
section{
  margin-top: 15px;
}
.section{
  display: inline-block;
  width: 340px;
  min-height: 300px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffffff;
  text-align: left;
}
.msg{
  padding: 10px 0;
  margin-bottom: 0;
  font-size: 14px;
  border-bottom: 1px solid rgb(232,232,232);
  color: rgb(102,102,102);
}
.text-link{
  font-size: 12px;
  margin-top: 10px;
  color: rgb(153,153,153);
  display: block;
  position: relative;
}
.title{
  font-size: 15px;
  color: rgb(51,51,51);
}
.text-date{
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 10px;
  color: #ffffff;
  background-color: rgb(212,212,212);
}
  .con-more{
    margin-top: 10px;
  }
</style>
<style>
  html,body{
    background-color: rgb(247,247,247)!important;
  }
</style>
