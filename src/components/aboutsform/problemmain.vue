<template>
	<div class="problemmain">
		<div class="problembox">
			<p v-text="mypro"></p>
			<div class="textbox">
				<div class="text" v-text="myprotext"></div>
				<div class="statusbox mui-clearfix">
    				<span  class="mui-pull-left">留言时间：{{datetimes}}</span>
    				<span v-if="stauts==0" class="mui-pull-right">未回复</span>
    				<span v-if="stauts==1" class="mui-pull-right">已回复</span>
	        	</div>
			</div>
		</div>
		<div class="answer" v-show="isblock">
			<div class="statusbox mui-clearfix answer_1">
    				<span  class="mui-pull-left">回复人：{{answerpelp}}</span>
    				<span class="mui-pull-right">
    					回复时间：{{answertime}}
    				</span>
	        </div>
	        <div class="text text_1"  v-text="anwercont"></div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'category',
	  data () {
	    return {
	    	isblock:false,
	    	mypro:"",
	    	myprotext:"",
			datetimes:"",
			stauts:"",
			answerpelp:"老王",
			answertime:"",
			anwercont:""
	    }
	  },methods:{
	  	 getdata:function(){
	  	 	var that =this;
	  	 	 var id =this.$route.query.id;
	  	 	 var ids={
	  	 	 	"ID":id
	  	 	}
	  	 	this.$http.post(that.$httpUrl.getQuestionDeatail,ids).then(function(res){
	  	 		console.log(res)
	  	 		that.mypro =res.data.data.Title;
	  	 		that.datetimes=res.data.data.AskTime;
	  	 		that.myprotext=res.data.data.AskContent;
	  	 		that.stauts =res.data.data.statue;	  	 		
//	  	 		console.log(this.stauts)
	  	 		if(res.data.data.statue == 1){
	  	 			that.isblock =true;
	  	 			that.answertime =res.data.data.ReplyTime;
	  	 			that.anwercont =res.data.data.ReplyContent;
	  	 		}
	  	 		
	  	 	},function(err){
	  	 		mui.alert("网络错误")
	  	 	})
	  	 }
	  },activated(){
	  	this.getdata()	  	
	  }
}
</script>
	
<style scoped>

	.problemmain{
		text-align: left;
		background: #f2f2f2;
	}
	.problembox{
		background: #fff;
		padding: 0 0.4rem;
		margin-bottom: 0.133rem;
	}
	.problembox>p{
		font-size: 0.373rem;
		color: #333;
		font-weight: 700;
		padding: 0.266rem 0;
		padding-left: 0.21rem;
		border-bottom: 1px solid #f2f2f2;
	}
	.text{
		font-size: 0.346rem;
		color: #666;
		padding:0 0.23rem;
		margin-bottom: 0.6rem;
	}
	.statusbox{
		padding:0 0.23rem;
		font-size: 0.32rem;
		color: #999;
		padding-bottom: 0.133rem;
	}
	.answer{
		background: #fff;
		padding-top: 0.266rem;
		
	}
	.answer_1{
		padding: 0 0.666rem;
	}
	.text_1{
		padding: 0 0.666rem 10px 0.666rem;
		margin-top:0.266rem;
		margin-bottom: 0;
	}
</style>