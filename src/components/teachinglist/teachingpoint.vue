
<template>
	<div class="teachingpoint">
		<loadings :isHide="hide" v-if="isClear"></loadings>
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   			 <div class="mui-scroll">
				<ul class="ullist">	
					<li v-for="(item,index) in resdata">
							<p>{{item.Company}}</p>
								<div @tap="jumpto(item.ID)">
									<img :src="item.Picture" />
								</div>		 
							<p>
								<img src="../../assets/images/teaching/datetime@2x.png" />
								时间：
								<span>{{item.ClassTime}}</span>
							</p>
							<p>
								<img src="../../assets/images/teaching/address_1@2x.png" />
								地点：
								<span @tap="getmap(index,item.ID)">{{item.Address}}</span>
								<span class="zangaybox" :class="item.IsLike ==0? 'check':'nocheck'" @tap="show(index,item.ID,item.IsLike)" >
									<span>{{item.LikeCount}}</span>
								</span>		
							</p>	
					</li>	
				</ul>
			</div>
		</div>	
	</div>
</template>

<script>
//	import wx from 'weixin-js-sdk'
	import loadings from '../base/loading/loading.vue'
	export default {
		  name: 'teachingpoint',
		  data () {
		    return {
		      resdata:[],
		      page:1,
		      "hide":false,
               "isClear":true
		    }
		},
		components:{
			loadings
      },
		methods:{  	
			jumpto:function(id){	
				this.$router.push({path:'/addressmain?id='+id})
			},
			show:function(index,id,islike){		
				this.resdata[index].IsLike == 0?(this.resdata[index].LikeCount++):(this.resdata[index].LikeCount--);
				this.resdata[index].IsLike == 0?(this.resdata[index].IsLike=1):(this.resdata[index].IsLike=0);
				var act ="";
				islike ==0 ?(act=1):(act=2)
				console.log(act)
				var obj={
	         			"course_id":id,
	         			"course_type":"4",
	         			"course_action":act
	         		}
				console.log(obj,"obj")
	         		this.$http.post(this.$httpUrl.doCourseLike,obj).then(function(res){
	         			console.log(res)
	         		},function(err){
	         			mui.alert("网络错误")
	         		})
			},
			getdata:function(p,r){
				var obj={
					page:p,
					row:r
				}
				 var that =this;
				this.$http.post(this.$httpUrl.getAddressList,obj).then(function(res){
					if(!that.hide){
		                  that.hide = true;
		                  setTimeout(function () {
		                    that.isClear = false;
		                  },1000)
            			}
					console.log(res.data)
					  if(p==1){
			              //p等于1为下拉刷新
			              that.resdata = [];//清空数组
			              that.resdata = res.data.data;
			              if(r==10){
			                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			              }
			           }else{	            	
			            	if(res.data.code ==306){
				                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				            }else {
				              	that.resdata=that.resdata.concat(res.data.data)
				                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
				            }
			            }
				},function(err){
					console.log(err)
				})
			},
			getmap:function(index,id){
				 var thisPageUrl = window.location.href.split('#')[0];  
		        var jsons = {  
		            url : thisPageUrl  
		        };
				var ids={
						"ID":id
				},
				that =this;
				 this.$http.post("http://we.gobestsoft.com/map/ts.php",jsons)
         		 .then(function(res){
         		 	wx.config({
					    debug: true,
					    appId: res.data.appId,
					    timestamp: res.data.timestamp,
					    nonceStr: res.data.nonceStr,
					    signature: res.data.signature,
					    jsApiList: ['getLocation','openLocation']
					 });	
	            	that.locations(ids);
	           	},function(err){  
	              console.log('服务器请求错误');
	            })  	
			},
			locations:function(ids){
				this.$http.post(this.$httpUrl.getAddresslnglat,ids).then(function(res){
						console.log(res)
					wx.ready(function(){
					    wx.openLocation({
					      latitude: res.data.data.lat, 
					      longitude: res.data.data.lng,
					      name: '中国', 
					      address:res.data.data.address, 
					      scale: 14,
					      infoUrl: '' 
					    });
					 });
					},function(err){
						mui.alert("网络错误")
				})
			},
		 	pulldownRefresh:function () {
		 		this.getdata(1,10);
	        },
	        pullupRefresh:function () {
	       		this.getdata(++this.page,10);
	        }    
		}, 
		created:function(){
		 	this.getdata(1)
		},
		mounted:function(){
	        var that = this;
	        mui.init;
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
	       
      }, activated(){
					this.getdata(1);
					this.hide =false;
    				this.isClear =true;
			   }
	}
</script>

<style scoped>
	.ullist{
		background: #f2f2f2;
		list-style: none;
		padding-top: 0.293rem;
	}
	.ullist li{
		background: #fff;
		padding:0 0.373rem;
		text-align: left;
		padding-bottom: 0.32rem;
		margin-top: 0.293rem;
	}
	.ullist li:first-child{
		margin-top:0!important;
			}
	.ullist li >p:first-child{
		font-size: 0.4rem;
		color:#000;
		padding: 12px 0;
	}
	
	.ullist li >  div  img{
		width: 100%;
		display: block;
	}
	.ullist li >p:nth-of-type(2),.ullist li >p:nth-of-type(3){
		font-size: 0.346rem;
		line-height: 0.346rem;
		color: #333;
		margin-top: 0.346rem;
	}
	.ullist li >p:nth-of-type(3){
		color: #3e89ad;
		margin-top: 0.453rem;
	}
	.ullist li >p:nth-of-type(2) > img,.ullist li >p:nth-of-type(3) >img{
		width:0.346rem ;
		display: block;
		vertical-align: middle;
		float: left;
		margin-top: -0.06rem;
		margin-right:9px ;
	}
	.zangaybox{
		float: right;
		color: #999;
		font-size: 0.32rem;
	}
	.zangaybox span:first-child img{
		width: 0.32rem;
		display: inline-block;
	}
	.yellowcolor{
		color: #ffcc00!important;
	}
	.check{
		background: url('../../assets/images/classes/zangray.png') no-repeat left center;
		background-size: 0.32rem 0.32rem;
		padding-left: .4rem;
		color: #999;
	}
	.nocheck{
		background: url('../../assets/images/classes/zanyellow.png') no-repeat left center;
		background-size: 0.32rem 0.32rem;
		padding-left: .4rem;
		color: #ffcc00;
	}
	

</style>||||||| .r198
<template>
	<div class="teachingpoint">
		<loadings :isHide="hide" v-if="isClear"></loadings>
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   			 <div class="mui-scroll">
				<ul class="ullist">	
					<li v-for="(item,index) in resdata">
						
							<p>{{item.Company}}</p>
								<div @tap="jumpto(item.ID)">
									<img :src="item.Picture" />
								</div>		 
							<p>
								<img src="../../assets/images/teaching/datetime@2x.png" />
								时间：
								<span>{{item.ClassTime}}</span>
							</p>
							<p>
								<img src="../../assets/images/teaching/address_1@2x.png" />
								地点：
								<span @tap="getmap(index,item.ID)">{{item.Address}}</span>
								<span class="zangaybox" :class="item.IsLike ==0? 'check':'nocheck'" @tap="show(index,item.ID,item.IsLike)" >
									<span>{{item.LikeCount}}</span>
								</span>		
							</p>	
							
					</li>	
				</ul>
			</div>
		</div>	
	</div>
</template>

<script>
	import loadings from '../base/loading/loading.vue'
	export default {
		  name: 'teachingpoint',
		  data () {
		    return {
		      resdata:[],
		      page:1,
		      "hide":false,
               "isClear":true
		    }
		},
		components:{
			loadings
      },
		methods:{  	
			jumpto:function(id){	
				this.$router.push({path:'/addressmain?id='+id})
			},
			show:function(index,id,islike){		
				this.resdata[index].IsLike == 0?(this.resdata[index].LikeCount++):(this.resdata[index].LikeCount--);
				this.resdata[index].IsLike == 0?(this.resdata[index].IsLike=1):(this.resdata[index].IsLike=0);
				var act ="";
				islike ==0 ?(act=1):(act=2)
				console.log(act)
				var obj={
	         			"course_id":id,
	         			"course_type":"4",
	         			"course_action":act
	         		}
				console.log(obj,"obj")
	         		this.$http.post(this.$httpUrl.doCourseLike,obj).then(function(res){
	         			console.log(res)
	         		},function(err){
	         			mui.alert("网络错误")
	         		})
			},
			getdata:function(p,r){
				var obj={
					page:p,
					row:r
				}
				 var that =this;
				this.$http.post(this.$httpUrl.getAddressList,obj).then(function(res){
					if(!that.hide){
		                  that.hide = true;
		                  setTimeout(function () {
		                    that.isClear = false;
		                  },1000)
            			}
					console.log(res.data)
					  if(p==1){
			              //p等于1为下拉刷新
			              that.resdata = [];//清空数组
			              that.resdata = res.data.data;
			              if(r==10){
			                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			              }
			           }else{	            	
			            	if(res.data.code ==306){
					                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					              }else {
					              	that.resdata=that.resdata.concat(res.data.data)
					                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
					            }
			            }
						
				},function(err){
					console.log(err)
				})
			},
			getmap:function(index,id){
				var ids={
						"ID":id
				},
				that =this;
				 this.$http.post("http://we.gobestsoft.com/map/ts.php")
         		 .then(function(res){
         		 	wx.config({
					    debug: true,
					    appId: res.data.appId,
					    timestamp: res.data.timestamp,
					    nonceStr: res.data.nonceStr,
					    signature: res.data.signature,
					    jsApiList: ['getLocation','openLocation']
					 });	
	            	that.locations(ids);
	           	},function(err){  
	              console.log('服务器请求错误');
	            })  	
			},
			locations:function(ids){
				this.$http.post(this.$httpUrl.getAddresslnglat,ids).then(function(res){
						console.log(res)
					wx.ready(function(){
					    wx.openLocation({
					      latitude: res.data.data.lat, 
					      longitude: res.data.data.lng,
					      name: '中国', 
					      address:res.data.data.address, 
					      scale: 1,
					      infoUrl: '' 
					    });
					 });
					},function(err){
						mui.alert("网络错误")
				})
			},
		 	pulldownRefresh:function () {
		 		this.getdata(1,10);
	        },
	        pullupRefresh:function () {
	       		this.getdata(++this.page,10);
	        }    
		}, 
		created:function(){
		 	this.getdata(1)
		},
		mounted:function(){
	        var that = this;
	        mui.init;
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
	       
      }, activated(){
					this.getdata(1);
					this.hide =false;
    				this.isClear =true;
			   }
	}
</script>

<style scoped>
	.ullist{
		background: #f2f2f2;
		list-style: none;
		padding-top: 0.293rem;
	}
	.ullist li{
		background: #fff;
		padding:0 0.373rem;
		text-align: left;
		padding-bottom: 0.32rem;
		margin-top: 0.293rem;
	}
	.ullist li:first-child{
		margin-top:0!important;
			}
	.ullist li >p:first-child{
		font-size: 0.4rem;
		color:#000;
		padding: 12px 0;
	}
	
	.ullist li >  div  img{
		width: 100%;
		display: block;
	}
	.ullist li >p:nth-of-type(2),.ullist li >p:nth-of-type(3){
		font-size: 0.346rem;
		line-height: 0.346rem;
		color: #333;
		margin-top: 0.346rem;
	}
	.ullist li >p:nth-of-type(3){
		color: #3e89ad;
		margin-top: 0.453rem;
	}
	.ullist li >p:nth-of-type(2) > img,.ullist li >p:nth-of-type(3) >img{
		width:0.346rem ;
		display: block;
		vertical-align: middle;
		float: left;
		margin-top: -0.06rem;
		margin-right:9px ;
	}
	.zangaybox{
		float: right;
		color: #999;
		font-size: 0.32rem;
	}
	.zangaybox span:first-child img{
		width: 0.32rem;
		display: inline-block;
	}
	.yellowcolor{
		color: #ffcc00!important;
	}
	.check{
		background: url('../../assets/images/classes/zangray.png') no-repeat left center;
		background-size: 0.32rem 0.32rem;
		padding-left: .4rem;
		color: #999;
	}
	.nocheck{
		background: url('../../assets/images/classes/zanyellow.png') no-repeat left center;
		background-size: 0.32rem 0.32rem;
		padding-left: .4rem;
		color: #ffcc00;
	}
	

</style>=======
<template>
	<div class="teachingpoint">
		<loadings :isHide="hide" v-if="isClear"></loadings>
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   			 <div class="mui-scroll">
				<ul class="ullist">
					<li v-for="(item,index) in resdata">

							<p>{{item.Company}}</p>
								<div @tap="jumpto(item.ID)">
									<img class="img-top" :src="item.Picture" />
								</div>
							<p>
								<img src="../../assets/images/teaching/datetime@2x.png" />
								时间：
								<span>{{item.ClassTime}}</span>
							</p>
							<p>
								<img src="../../assets/images/teaching/address_1@2x.png" />
								地点：
								<span @tap="getmap(index,item.ID)">{{item.Address}}</span>
								<span class="zangaybox" :class="item.IsLike ==0? 'check':'nocheck'" @tap="show(index,item.ID,item.IsLike)" >
									<span>{{item.LikeCount}}</span>
								</span>
							</p>

					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import loadings from '../base/loading/loading.vue'
	export default {
		  name: 'teachingpoint',
		  data () {
		    return {
		      resdata:[],
		      page:1,
		      "hide":false,
               "isClear":true
		    }
		},
		components:{
			loadings
      },
		methods:{
			jumpto:function(id){
				this.$router.push({path:'/addressmain?id='+id})
			},
			show:function(index,id,islike){
				this.resdata[index].IsLike == 0?(this.resdata[index].LikeCount++):(this.resdata[index].LikeCount--);
				this.resdata[index].IsLike == 0?(this.resdata[index].IsLike=1):(this.resdata[index].IsLike=0);
				var act ="";
				islike ==0 ?(act=1):(act=2)
				console.log(act)
				var obj={
	         			"course_id":id,
	         			"course_type":"4",
	         			"course_action":act
	         		}
				console.log(obj,"obj")
	         		this.$http.post(this.$httpUrl.doCourseLike,obj).then(function(res){
	         			console.log(res)
	         		},function(err){
	         			mui.alert("网络错误")
	         		})
			},
			getdata:function(p,r){
				var obj={
					page:p,
					row:r
				}
				 var that =this;
				this.$http.post(this.$httpUrl.getAddressList,obj).then(function(res){
					if(!that.hide){
		                  that.hide = true;
		                  setTimeout(function () {
		                    that.isClear = false;
		                  },1000)
            			}
					console.log(res.data)
					  if(p==1){
			              //p等于1为下拉刷新
			              that.resdata = [];//清空数组
			              that.resdata = res.data.data;
			              if(r==10){
			                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			              }
			           }else{
			            	if(res.data.code ==306){
					                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					              }else {
					              	that.resdata=that.resdata.concat(res.data.data)
					                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
					            }
			            }

				},function(err){
					console.log(err)
				})
			},
			getmap:function(index,id){
				var ids={
						"ID":id
				},
				that =this;
				 this.$http.post("http://we.gobestsoft.com/map/ts.php")
         		 .then(function(res){
         		 	wx.config({
					    debug: true,
					    appId: res.data.appId,
					    timestamp: res.data.timestamp,
					    nonceStr: res.data.nonceStr,
					    signature: res.data.signature,
					    jsApiList: ['getLocation','openLocation']
					 });
	            	that.locations(ids);
	           	},function(err){
	              console.log('服务器请求错误');
	            })
			},
			locations:function(ids){
				this.$http.post(this.$httpUrl.getAddresslnglat,ids).then(function(res){
						console.log(res)
					wx.ready(function(){
					    wx.openLocation({
					      latitude: res.data.data.lat,
					      longitude: res.data.data.lng,
					      name: '中国',
					      address:res.data.data.address,
					      scale: 1,
					      infoUrl: ''
					    });
					 });
					},function(err){
						mui.alert("网络错误")
				})
			},
		 	pulldownRefresh:function () {
		 		this.getdata(1,10);
	        },
	        pullupRefresh:function () {
	       		this.getdata(++this.page,10);
	        }
		},
		created:function(){
		 	this.getdata(1)
		},
		mounted:function(){
	        var that = this;
	        mui.init;
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

      }, activated(){
					this.getdata(1);
					this.hide =false;
    				this.isClear =true;
			   }
	}
</script>

<style scoped>
	.ullist{
		background: #f2f2f2;
		list-style: none;
		padding-top: 0.293rem;
	}
	.ullist li{
		background: #fff;
		padding:0 0.373rem;
		text-align: left;
		padding-bottom: 0.32rem;
		margin-top: 0.293rem;
	}
	.ullist li:first-child{
		margin-top:0!important;
			}
	.ullist li >p:first-child{
		font-size: 0.4rem;
		color:#000;
		padding: 12px 0;
	}

	.ullist li >  div  img{
		width: 100%;
		display: block;
	}
	.ullist li >p:nth-of-type(2),.ullist li >p:nth-of-type(3){
		font-size: 0.346rem;
		line-height: 0.346rem;
		color: #333;
		margin-top: 0.346rem;
	}
	.ullist li >p:nth-of-type(3){
		color: #3e89ad;
		margin-top: 0.453rem;
	}
	.ullist li >p:nth-of-type(2) > img,.ullist li >p:nth-of-type(3) >img{
		width:0.346rem ;
		display: block;
		vertical-align: middle;
		float: left;
		margin-top: -0.06rem;
		margin-right:9px ;
	}
	.zangaybox{
		float: right;
		color: #999;
		font-size: 0.32rem;
	}
	.zangaybox span:first-child img{
		width: 0.32rem;
		display: inline-block;
	}
	.yellowcolor{
		color: #ffcc00!important;
	}
	.check{
		background: url('../../assets/images/classes/zangray.png') no-repeat left center;
		background-size: 0.32rem 0.32rem;
		padding-left: .4rem;
		color: #999;
	}
	.nocheck{
		background: url('../../assets/images/classes/zanyellow.png') no-repeat left center;
		background-size: 0.32rem 0.32rem;
		padding-left: .4rem;
		color: #ffcc00;
	}
.img-top{
  width: 347px;
  height: 178px;
}

</style>
>>>>>>> .r230
