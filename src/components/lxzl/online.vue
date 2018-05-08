<template>
	<div class="teacherDetail">
	   <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   		 <div class="mui-scroll">
			<ul class="online_class">
				<li class="on_section" v-for="(list,index) in lists1">
					<div class="on_bg">
						<!--<img :src="list.bgimg">-->
							<video width="98%"  @tap="player(index,$event)">
								 <source src="http://www.weipengtop.cn/shen.mp4" type="video/mp4" >
							</video>
					<!--<img src="../../assets/images/ioncfontlogo/player.png" class="on_player" @tap="player(index,$event)">-->
					</div>
					<div class="on_footer">
						<span>{{list.Titile}}</span>
						<span>
							<span class="on_read">{{list.BrowseCount}}</span>
						    <span :class="list.IsLike==0?'on_zannum':'on_zannum1'"  @tap="zanevent(index,$event,list.ID)">{{list.PraiseCount}}</span>
						</span>
					</div>
				</li>
			</ul>
	      </div>
	    </div>
	</div>
</template>

<script>
	export default{
		name: 'online',
		data(){
			return{
				
				lists1:{}
				
			}
		},
		methods:{
			zanevent(index,event,id){
				
				var act="";
				if(this.lists1[index].IsLike==1){
				    act=2;
					this.lists1[index].IsLike=0;
					this.lists1[index].PraiseCount--;
				}else{
					act=1;
					this.lists1[index].IsLike=1;
					this.lists1[index].PraiseCount++;
				}
				
				var param={
					"course_id" : id,
					"course_type" : 3,
					"course_action" : act
				}
				console.log(param);
				this.$http.post(this.$httpUrl.doCourseLike,param).then(function(res){
					console.log(res);
				}).catch(function(error){
					console.log("eee");
					console.log(error);
				})
			},
			 pulldownRefresh:function(){
            	   var that=this;
	          //下拉刷新
	          setTimeout(function () {
	            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
	          },2000)
            },
	        pullupRefresh:function () {
	        	var that=this;
	          //上拉加载
	          setTimeout(function () {
	             mui('#pullrefresh').pullRefresh().endPullupToRefresh();
	          },2000)
	        },
	        getdata:function(){
	        	    var that=this;
	        	   var param={
	        	   	   "row":20,
	        	   	   "page":1
	        	   }
	        	    that.$http.post(this.$httpUrl.getOnlineCourse,param).then(function(res){
	        	    that.lists1=res.data.data;
	        	    	console.log(that.lists1);
	        	    	    console.log(res);
	        	    }).catch(function(error){
//	        	    	    console.log(error);
	        	    });
	        },
	        player:function(index,e){
                console.log( e.path[0]);
                 console.log( e.path[0].getAttribute("src"));
                console.log( e.path[0].children[0].getAttribute("src"));
                var isIphone = navigator.userAgent.indexOf('iPhone') >= 0;
                console.log(navigator.userAgent.indexOf('iPhone') );
		        if (isIphone) {
		                window.location=e.path[0].children[0].getAttribute("src");
		        }
//		        else {
//		            $(".play_video").click(function(){
//		                
//		                var videoHtml = "<video id=\"video_span\" class=\"url_video\" src=\"视频的绝对地址url\" x-webkit-airplay=\"true\" webkit-playsinline=\"true\" poster=\"视频封面图片的绝对地址\" preload=\"null\" loop=\"loop\" autoplay  controls=\"controls\"></video>"
//		                $("#video_div").html(videoHtml)
//		                $(".video").show();
//		                
//		            });
//		        }
         
                
                 
	        }
//           pause:function(index,e){
//           	console.log(e.path);
//           	e.path[0].pause();
//           	e.path[0].nextElementSibling.style.display="block";
//           }
		}, 
		mounted() {
	        var that = this;
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
	     activated(){
	     	this.getdata();
	     }
	}
</script>

<style scoped>
	.online_class{
		background: #f0f0f0;
	}
	.online_class li{
		padding: 14px 10px 0px 10px;
		box-sizing: border-box;
		width: 100%;
		background: white;
		margin-top: 10px;
	}
	.on_bg{
		width: 100%;
		position: relative;
	}
	vedio{
		width: 100%;
		/*height: 2rem;*/
	}
	.on_player{
		position: absolute;
		top: 50%;
		margin-top: -0.8rem;
		width: 1.6rem;
		left: 50%;
		margin-left: -0.8rem;
	}
	.on_footer{
		line-height: 0.8rem;
		text-align: left;
	}
	.on_footer:after{
		content: '';
	display: block;
	clear: both;
		
	}
	.on_footer>span:first-child{
		margin-right: 40px;
		font-size: 0.4rem;
		
	}
	.on_footer>span:nth-child(2){
		display: inline-block;
		width: 170px;
	}
	
	.on_read{
		background-image: url('../../assets/images/classes/read.png');
	    margin-right: 20px;
		
	}
	.on_read,.on_zannum,.on_zannum1{
		display: inline-block;
		background-size: 0.45rem 0.45rem;
		background-repeat: no-repeat;
		background-position-y: 6px;
		padding-left: 26px;
		
	}
	.on_zannum,.on_zannum1{
		padding-top: 1px;
	}
	.on_zannum1{
		background-image: url('../../assets/images/classes/zanyellow.png');
		color: rgb(255,204,0);
	}
	.on_zannum{
		background-image: url('../../assets/images/classes/zangray.png');
	}
</style>