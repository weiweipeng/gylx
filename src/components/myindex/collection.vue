<!--收藏组件页面-->
<template>
	<div class="collection">
		<loadings :isHide="hide" v-if="isClear"></loadings>
	   <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
   		 	<div class="mui-scroll">
			   <listclasses v-bind:listdata.sync="lists" @collects="collect" @activess="actives" @jumpto="jump"></listclasses>
			</div>
		</div>
	</div>
</template>

<script>
   
    import listclasses from '../base/list-classes'
    import loadings from '../base/loading/loading.vue'
    export default{
        name : 'classes',
        data () {
            return {
               lists:[],
               "page":1,
               "hide":false,
              "isClear":true
            }
        },
         components:{
			listclasses,
			 loadings
      },
        methods: {
        		jump:function(type,id){
        			this.$router.push("/classdetail?type="+type+"&id="+id)
        		},
				getdata:function(p,r){
					var that =this;
					var parms={
						"page":p,
						"row":r
					}
					this.$http.post(that.$httpUrl.getCollectionList,parms).then(function(res){
						if(!that.hide){
		                  that.hide = true;
		                  setTimeout(function () {
		                    that.isClear = false;
		                  },1000)
		              }
						console.log(res)			
						  if(p==1){
			              //p等于1为下拉刷新
			              that.lists = [];//清空数组
			              that.lists = res.data.data;
			              if(r==10){
			                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			              }
			           }else{	            	
			            	if(res.data.code ==306){
					                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					              }else {
					              	that.lists=that.lists.concat(res.data.data)
					                mui('#pullrefresh').pullRefresh().endPullupToRefresh();
					            }
			            }
					},function(err){
						mui.alert("网络错误")
					})
				},
	         	collect(index,type,id,act){
	         		console.log("index:"+index)
	         		console.log("type:"+type)
	         		console.log("id:"+id)
	         		console.log("act:"+act)
	         		var obj={
	         			"course_id":id,
	         			"course_type":type,
	         			"course_action":act
	         		}
	         		this.$http.post(this.$httpUrl.doCourseCollect,obj).then(function(res){
	         			console.log(res)
	         		},function(err){
	         			console.log(err)
	         		})
	         	},
	         	actives(index,type,id,act1){
		         		var obj1={
		         			"course_id":id,
		         			"course_type":type,
		         			"course_action":act1
		         		}
	         		
	         		this.$http.post(this.$httpUrl.doCourseLike,obj1).then(function(res){
	         			console.log(res)
	         		},function(err){
	         			console.log(err)
	         		})
	         	},
				 pulldownRefresh:function(){
		          	this.getdata(1,10);
	            },
		        pullupRefresh:function () {
		        	this.getdata(++this.page,10);
		        }
	        }, 
				mounted() {
			        var that = this;
			        mui('.mui-scroll-wrapper').scroll({deceleration:0.002});
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
					this.getdata(1);
					this.hide =false;
    				this.isClear =true;
			   }
		    }
</script>
<style scoped>
    *{
       padding:0;
       margin:0;
    }

</style>