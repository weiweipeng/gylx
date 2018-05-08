<template>
	    <ul class="section">
			        <li class="section1" v-for='(list,index) in listdata'>
			            <div class="left">
			                <img :src="list.FileUrl" @tap="jump(list.CourseType,list.ID)">
			            </div>
			            <div class="right">
			                <P class="title mui-ellipsis" style="width: 75%;">{{list.Titile}}</p>
			                <p class="number">
			                    <img src="../../../assets/images/classes/human.png" class="human">
			                    <span class="num">参与人数:</span>
			                    <span class="count">{{list.num}}</span>
			                </p>
			                <p class="detail mui-ellipsis-2">
			                   <strong>简介:</strong>
			                   <span>{{list.SubTitle}}</span>
			                </p>
			                <p class="last">
					                    <span>
					                        <img src="../../../assets/images/classes/read.png">
					                        <span>{{list.ClickCount}}</span>
					                    </span>
					                    <span :class="list.IsLike==0 ? 'zan':'zan1'" @tap='actives(index,list.CourseType,list.ID,list.IsLike)' >
					                      
					                       {{list.LikeCount}}
					                    </span>
					                    <span class='icon-collect '  :class="list.IsCollect== 0? 'collect':'collect1'" @tap="collect(index,list.CourseType,list.ID,list.IsCollect)" >
					                    </span>
					                </p>
			            </div>
			            <img src="../../../assets/images/classes/top.png" class="cla_free">
			        </li>
			       
			    </ul>
	</template>

<script>
	 export default {
	 	 name: 'list-course',
	 	  props:['listdata',"collects","activess","jumpto"],
	 	   data () {
            return {
                "lists":''
            }
       },   methods:{
        jump(type,id){
			this.$emit('jumpto',type,id)			
        },
        collect(index,type,id,col){
        	this.listdata[index].IsCollect	== 0 ?(this.listdata[index].IsCollect=1):(this.listdata[index].IsCollect=0)	
        	console.log(this.listdata[index].IsCollect,"1是收藏 0没有收藏")
        	var act=null;
			if(col ==0){
				act =1;		
			}else{
				act=2;
			}
        	this.$emit('collects',index,type,id,act)
        },
        actives(index,type,id,isclick){
        	
        	this.listdata[index].IsLike ==0?(this.listdata[index].LikeCount++):(this.listdata[index].LikeCount--)
        	this.listdata[index].IsLike ==0?(this.listdata[index].IsLike =1):(this.listdata[index].IsLike =0)
       		var act1=null;
			if(isclick ==0){
				act1 =1;			
			}else{
				act1=2;
			}	
       		this.$emit('activess',index,type,id,act1)
        }
      }
       
	 }
</script>

<style scoped>
	 .section{
       background:#f0f0f0;
    }
    .after_show, .afters{
       display:none;
    }
 
    .section1{
        width:100%;
        box-sizing:border-box;
        padding-left:2%;
        padding-right:2%;
        margin-top:10px;
        position:relative;
        margin-top:10px;
        height:150px;
        background:#fff;
        padding-top:10px;
    }
    .left{
        width:44%;
        float:left;
        height:130px;
        margin-bottom:0px;
		
    }
    .left img{
        width:100%;
        height:130px;
    }
    .right{
        float:left;
        margin-left:2%;
        width:54%;
        height:140px;
         margin-bottom:0px;
    }
    .title{
        text-align:left;
		line-height: 24px;
		font-Family: "PingFang-SC-Bold";
		font-Size: 0.373rem;
		
		

    }
    .number{
        margin-top:6px;
        font-size:0.32rem;
        line-height:24px;
        text-align:left;
    }
    .number img{
        width: 18px;
	    float:left;
	    margin-top:4px;
    }
    .num{
       margin-left:5px;
    }
    .count{
       color:rgb(234,82,6);
    }
    .detail{
       font-size:0.32rem;
       text-align:left;
       display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height:24px;
    }
    .last{
        height:24px;
        margin-top:10px;
        text-align:left;
        line-height:20px;
    }
    .last img{
        height:14px;
        color:#999;
        font-size:0.32rem;
        float:left;
        margin-top:4px;
    }
    .last span{
        margin-left:4px;
        float:left;
        font-size:12px;
        margin-top:1px;
        display: inline-block;
   		 width: 33.3%;
     
    }
    .zan{
   	    background: url('../../../assets/images/classes/zangray.png') no-repeat;
    	margin-left:16px!important;
       background-size: 0.4rem 0.4rem;
       padding-left: 0.4rem;
       padding-top: 2px;
       background-position-y: 2px;
    }
   
    .zan1{ 
        background: url('../../../assets/images/classes/zanyellow.png') no-repeat;
        color: rgb(255,204,0);
        background-size: 0.4rem 0.4rem;
        margin-left:16px!important;
        padding-left: 0.4rem;
        padding-top: 2px;
        background-position-y: 2px;
    }
    .collect {
      	background: url('../../../assets/images/classes/collect.png') no-repeat;
      	background-size: 0.4rem 0.4rem;
	    height: 0.6rem ;
	    width: 1rem;
	    background-position: 0.2rem 0.09rem;
    }
   
     .collect1{
      	background: url('../../../assets/images/classes/collectyellow.png') no-repeat;
     	 background-size: 0.4rem 0.4rem;
      height: 0.6rem ;
      width: 1rem;
     background-position: 0.2rem 0.09rem;
     }
    
     .cla_free{
        position:absolute;
        right:0;
        top:10px;
        width:50px;
     }
   .icon-collect{
    width: 25px!important;
    height: 20px!important;
   
  }
</style>
