<template>
	<div class="myDetail">
		 <loadings :isHide="hide" v-if="isClear"></loadings>
		<div class="header_img">
		    <img :src="list.FileUrl" />
		</div>
		<ul class="myDetail_list">
			<li>
				<span>预约编号</span>
				<span>{{list.ReservationNumber}}</span>
			</li>
			<li>
				<span>联系人</span>
				<span>{{list.UserName}}</span>
			</li>
			<li>
				<span>授课地点</span>
				<span>{{list.TeachingPlace}}</span>
			</li>
			<li>
				<span>授课日期</span>
				<span>{{list.TeachingTime}}</span>
			</li>
			<li>
				<span>教师姓名</span>
				<span>{{list.Teachername}}</span>
			</li>
			<li>
				<span>课程名称</span>
				<span>{{list.Title}}</span>
			</li>
			<li>
				<span>单位名称</span>
				<span>{{list.WorkUnit}}</span>
			</li>
			<li>
				<span>联系电话</span>
				<span>{{list.Phone}}</span>
			</li>
			<li>
				<span>所在区</span>
				<span>{{list.urban}}</span>
			</li>
			<li>
				<span>教师形象仪态</span>
				<span>{{list.ImageBearing}}</span>
			</li>
			<li>
				<span>教师授课态度</span>
				<span>{{list.TeachingAttitude}}</span>
			</li>
			<li>
				<span>教师准时到达</span>
				<span>{{list.ArriveOnTime}}</span>
			</li>
			<li>
				<span>课程完成情况</span>
				<span>{{list.CompletionSituation	}}</span>
			</li>
			<li>
				<span>课程内容质量</span>
				<span>{{list.ContentQuality}}</span>
			</li>
			<li>
				<span>教师总体评价</span>
				<span>{{list.TeacherEvaluation}}</span>
			</li>
			<li>
				<span>课程总体评价</span>
				<span>{{list.CurriculumEvaluation}}</span>
			</li>
		</ul>
		<div class="my_adverse">
			<p>意见和建议</p>
			<p>{{list.Opinion}}</p>
		</div>
		<div class="myDetail_foot" @tap="jumpto(list.CourseType,list.ID)">
			<router-link to="/classdetail">
			查看课程详情
			</router-link>
		</div>
	</div>
</template>

<script>
	import loadings from '../base/loading/loading.vue'
	export default{
		name:'myDetail',
		data(){
			return {
			  "hide":false,
              "isClear":true,	
			   list:{}
			}
		},
		components:{
            loadings
        },
		methods:{
			getdata:function(){
				var that=this;
				var AppointmentId=this.$route.query.AppointmentId;
				var CourseType=this.$route.query.CourseType;
				
				var param={
					"CourseType":CourseType,
					"AppointmentId":AppointmentId
				}
				this.$http.post(this.$httpUrl.getMyBackDetail,param).then(function(res){
					if(!that.hide){
		                that.hide = true;
		                setTimeout(function () {
		                  that.isClear = false;
		                },1000)
		              }
					that.list=res.data.data;
					console.log(that.list);
				}).catch(function(error){
					console.log(error);
				})
			},
			jumpto:function(type,cid){
				this.$router.push('/classdetail?type='+type+'&id='+cid);
			}
		},
		created(){
			this.getdata()
		}
	}
</script>

<style scoped>
	.myDetail{
		background: white;
		width: 100%;
		padding-bottom: 40px;
	}
	.header_img img{
		width: 100%;
		height: 4rem;
	}
	.myDetail_list{
		
		box-sizing: border-box;
	}
	.myDetail_list li{
		padding-left: 5%;
		width: 100%;
		padding-right: 5%;
		font-size: 0.347rem;
		line-height: 1.4rem;
		border-bottom: 1px solid #F2F2F2;
	}
	
	.myDetail_list li>span:first-child{
		width: 30%;
		display: inline-block;
		text-align: left;
		float: left;
	}
	.myDetail_list li>span:last-child{
		width: 68%;
		display: inline-block;
		text-align: left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		
		float: left;
	}
	.my_adverse{
		text-align: left;
		padding:0 5%;
		margin-bottom: 20px;
	}
	.my_adverse>p:first-child{
		color: #999;
		line-height: 1rem;
	}
	.my_adverse>p:last-child{
		color: #333333;
	}
	.myDetail_foot{
		width: 97vw;
		margin: 0 auto;
		line-height: 1rem;
		background: rgb(255,204,0);
		border-radius: 3px;
		text-align: center;
		
	}.myDetail_foot a{
		color: white;
	   font-size: 0.4rem;
	}
</style>