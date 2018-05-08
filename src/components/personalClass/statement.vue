<template>
  <div id="statement">
    <div id="text-statement">
      <p>
        在你预约公益乐学现场版课程之前，请仔细阅读以下内容：
      </p>
      <p>
        1、请大家注意各教学点名称和地址,就近选择教学点预约,以免因张冠李戴而白跑一趟,而且浪费公益资源。
      </p>
      <p>
        2、请注意不要在同一时间段重复约课(每人在同一时间段只能选择一个教学点的一门课程预约)。申工社APP系统会直接剔除沖突项。
      </p>
      <p>
        3、请注意不要在申工社APP和公益乐学等各教点指定微信号(例如青浦工会、静工汇、杨浦职工之家、普工英、鑫工号、五里青年汇等)重复预约。
      </p>
      <p>
        4、如果你在申工社APP和指定微信号重复约课,小编也会再次人工核对,随机剔除时间冲突的课程(有可能是学员比较想上的那门课),以确保每一个宝贵的上课名额有效,所以请各位学对公益资源手下留情,不要同一时间预约不同教学点的多门课程,也不要在同一教学点的两个预约平台重复约课。
      </p>
      <p>
        5、请珍惜公益课程资源，约课成功后记得按时来上课，如临时无法出席，请直接在公益乐学或其他指定微信内回复请假。公益资源，你我共享。
      </p>
      <p>
        6、没有预约成功的学员可在公益乐学微信内留言候补，若有空位工作人员可安排旁听，但不得侵占有限的教具、耗材等。课前工作人员会按照约课成功名单发放教具、耗材等，先到先得。
      </p>
      <p>
        7、上课时请尊重老师，集中注意力，认真听讲，不要影响上课秩序，不要干扰其他同学，尤其不要在课堂上吃东西。
      </p>
      <p>
        8、上课时听从老师和工作人员的安排，爱护教具等公物，部分教具的展开和归置徐瑶同学自行整理（例如清洗毛笔、铺瑜伽垫等）。感谢配合！
      </p>
      <p>
        9、请同学们珍惜宝贵的公益资源，爱护各类教具、耗材等。作品可以带走，教具（如铅笔、毛笔、剪刀等）有借有还，耗材精打细算。节约资源，源源不绝！
      </p>
      <p>
        10、申工社APP个人预约通道内没有课程介绍，若想了解所有各教学点现场版课程介绍请移步公益乐学或相关微信号，可查询课程介绍、师资介绍、上课情况综述等。
      </p>
    </div>
    <div class="con-agree">
      <span class="con-check" v-bind:class="{'icon-check':check,'icon-uncheck':!check}" @click="check=!check"></span>
      <span>我已阅读并遵守此协议！</span>
    </div>
    <div class="con-btn">
      <button class="btn-next" @click="doNext" v-bind:disabled="!check">下一步</button>
    </div>
  </div>
</template>

<script>
//  import mui from '../../../static/js/mui'
  export default {
    name: 'statement',
    data () {
      return {
          "check":false,
        "cid":""
      }
    },
    methods:{
        doNext:function () {
          var flag = this.check;
          console.log(flag);
          if(flag){

			this.$router.push("/personalClass/form?cid="+this.cid)
          }else {
//            this.$mui.alert("很抱歉，你没有同意协议不能下一步");
            mui.alert("很抱歉，你没有同意协议不能下一步");
          }
        }
    },
    activated(){
        this.check = false;
      this.cid = this.$route.query.cid;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #text-statement{
    padding: 20px 10px;

  }
  p{
    font-size: 18px;
    color: rgb(82,82,82);
    text-align: left;
    margin-top: 35px;
  }
  p:first-child{
    margin-top: 0;
  }
  .con-agree{
    text-align: center;
    font-size: 15px;
    line-height: 15px;
    color: rgb(79,79,79);
  }
  .con-check{
    width: 18px;
    height: 18px;
    background-size: 18px 18px;
    display: inline-block;
    vertical-align: sub;
  }
  .icon-check{
    background-image: url("../../assets/images/form/icon-check.png");
  }
  .icon-uncheck{
    background-image: url("../../assets/images/form/icon-uncheck@2x.png");
  }
  .con-btn{
    margin-top: 35px;
    padding-bottom: 50px;
  }
  .btn-next{
    width: 365px;
    height: 40px;
    background-color: rgb(255,204,0);
    border-color: rgb(255,204,0);
    color: #ffffff;
    display: block;
    margin: 0 auto; }
</style>
<style>
  body{
    background-color: #ffffff;
  }
</style>
