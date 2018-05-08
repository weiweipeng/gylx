<template>
	<div class="addressmain">
		<loadings :isHide="hide" v-if="isClear"></loadings>
		<div class="textbox" v-html="adcontent">
			
		</div>
	</div>
</template>

<script>
	import loadings from '../base/loading/loading.vue'
	export default {
		name:"addressmain",
		data(){
			return{
				adcontent:"",
				"hide":false,
            	"isClear":true
			}
		},components:{
			loadings
      }
		,methods:{
			getdata:function(){
				var id =this.$route.query.id;
				var obj={
					"ID":id
				}
				console.log(obj)
				var that =this;
				this.$http.post(this.$httpUrl.getAddressDetail,obj).then(function(res){
					if(!that.hide){
	                  that.hide = true;
	                  setTimeout(function () {
	                    that.isClear = false;
	                  },1000)
        			}
					console.log(res.data.data)
					that.adcontent =res.data.data
				},function(err){
					mui.alert("网络错误")
				})
			}
		}
		, activated(){
			this.getdata(1);
			this.hide =false;
			this.isClear =true;
	   }
	}

</script>

<style scoped>

</style>