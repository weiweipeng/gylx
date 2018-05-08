
<template>
    <div>
      <div class="text-statement">
        <p>
          在您填写公益乐学企业版课程预约函之前，请仔细阅读以下内容：
        </p>
        <p>
          1、预约单位提供意向日期、意向时间后，由公益乐学项目组居间与讲师协商，确定正式上课时间。
        </p>
        <p>
          2、企业版课程每次预约需至少提前两周，正式上课前一周不在接受上课时间的变更。
        </p>
        <p>
          3、企业版预约单位，原则上每场参与人数不少于30人。
        </p>
        <p>
          4、企业版课程形式为一个半小时讲座，讲座内容为本页所列课程，送教上门，接受基于课程内容的小幅增减。
        </p>
        <p>
          5、每家企事业单位每年仅可享受两次公益乐学的课时金补贴。如果企事业单位需延长课时，年度申请两次以上培训或附加服务、耗材等，需向项目组支付培训费。（部分专家讲师即使是公益乐学培训，企事业单位也需承担部分课时金。）
        </p>
        <table border="1">
          <tr>
            <td></td>
            <td>市区</td>
            <td>远郊园区</td>
            <td>部分专家讲师</td>
          </tr>
          <tr>
            <td>师资的课时金金额</td>
            <td>500</td>
            <td>800</td>
            <td>2000</td>
          </tr>
          <tr>
            <td>公益乐学项目提供的课时金补贴</td>
            <td>500</td>
            <td>800</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>企事业单位需承担的课时金</td>
            <td>0</td>
            <td>0</td>
            <td>1000</td>
          </tr>
        </table>
        <p>
          6、公益乐学讲师公益课时金支付标准（一个半小时）
        </p>
        <p>
          7、所有由企事业单位承担的课时金统一支付至上海市工人文化宫，市宫提供培训费发票。附加服务费、耗材工本费等支付至公益乐学指定供应商，由供应商提供正规发票。公益乐学项目组成员和教师本人不接受任何现金。
        </p>
        <p class="text-account">
          账户名称：上海市工人文化宫
        </p>
        <p class="text-account">
          账户号码：31604900067274345
        </p>
        <p >
          开户行：上海银行上工支行
        </p>
        <p>
          8、尊重公益乐学讲师基于价值认同对项目的付出，所有课程和老师都经项目组考察和审核，因此不接受企事业单位对老师的事前面试。但是项目组会为双方事前沟通创造便利条件，双方可就场地环境、教材教具、受众需求、教学需求、教学内容等充分沟通，使有限的培训，最大限度地发挥作用，更好地位职工服务。位于远郊园区的企事业单位，需负责老师接送或提供交通便利。
        </p>
        <p>
          9、公益乐学项目是2017年上海工会服务职工实事项目，我们的目标受众是一线企事业单位职工。所有另有资金来源的商业性文体活动，包括但不限于，如企业商务客户会员活动、其他商业性培训机构承接的有收入的技能培训、拓展训练、健身培训等，不得占用公益培训资源。一经发现，预约单位纳入“黑名单”，停止预约资格两年。情节严重的，向预约单位的上级主管部门通报反映。
        </p>
        <p>
          10、欢迎预约单位成为公益乐学的兼职通讯员，提供至少5张培训现场图片和信息稿，电邮至sh_sgpx@sina.com，将择优录取，刊载在公益乐学订阅号上，展示贵单位企业文化和企业形象。
        </p>
        <p>
          11、以上内容解释权归上海市工人文化宫公益乐学项目组。咨询电话：63520281。
        </p>
      </div>
      <div class="con-agree">
        <span class="con-check" v-bind:class="{'icon-check':check,'icon-uncheck':!check}" @click="check=!check"></span>
        <span>我已阅读并遵守此协议！</span>
      </div>
      <div class="con-btn">
        <button class="btn-next"  v-bind:disabled="!check" @tap="jumpto">同意</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'name',
        data () {
            return {
                "check":false,
              "cid":""
            }
        },
        methods:{
        	jumpto(){
        		this.$router.push("/companyClass/form?cid="+this.cid);
        	}
        },
      activated(){
            this.check = false;
        this.cid=this.$route.query.cid;
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-statement{
    padding: 20px 10px 45px 15px;
  }
  p{
    color: rgb(58,58,58);
     margin-bottom: 15px;
    font-size: 16px;
    text-indent: 16px;
  }
  .text-account{
    margin-bottom: 5px;
  }

  table{
    margin: 40px 0 20px 0;
  }
  tr{
    height: 35px;
  }
  td{
    font-size: 12px;
    margin: 0 auto;
    text-align: center;
  }
  tr td:first-child{
    font-size: 14px;
    line-height: 14px;
    width: 136px;
    padding: 0 10px;
    text-align: left;
  }
  tr td:nth-child(2){
    width: 55px;
  }
  tr td:nth-child(3){
    width: 72px;
  }
  tr td:last-child{
    width: 81px;
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
    margin: 0 auto;
  }
</style>
<style>
  body{
    background-color: #ffffff;
  }
  #app{
    text-align: left;
  }
</style>
