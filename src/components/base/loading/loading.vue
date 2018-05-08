<template>
    <div id="loading"v-bind:class="{'hide':isHide}" >
    	 <div class="loading">  
	        <span></span>  
	        <span></span>  
	        <span></span>  
	        <span></span>  
	        <span></span>  
		</div>  
    </div>
</template>

<script>
    export default {
     name: 'loading',
      props:['isHide'],
        data () {
            return {
              "isClear":true
            }
        },
      methods:{

      },
      mounted(){

      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#loading{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #fff;
		z-index: 99999;
	}
  .loading{   
            width: 80px;   
            height: 40px;   
            margin: 0 auto;   
            margin-top:249px;   
        }   
        .loading span{   
            display: inline-block;   
            width: 8px;   
            height: 100%;   
            border-radius: 4px;   
            background: rgb(86,181,60);   
            -webkit-animation: load 1s ease infinite;   
        }   
        @-webkit-keyframes load{   
            0%,100%{   
                height: 40px;   
                background: rgb(234,82,6);   
            }   
            50%{   
                height: 70px;   
                margin: -15px 0;   
                background: rgb(86,181,60);   
            }   
        }   
        .loading span:nth-child(2){   
            -webkit-animation-delay:0.2s;   
        }   
        .loading span:nth-child(3){   
            -webkit-animation-delay:0.4s;   
        }   
        .loading span:nth-child(4){   
            -webkit-animation-delay:0.6s;   
        }   
        .loading span:nth-child(5){   
            -webkit-animation-delay:0.8s;   
        }   
</style>
