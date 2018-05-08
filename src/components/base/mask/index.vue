<template>
    <div id="base-mask">

    </div>
</template>

<script>
    export default {
        name: 'base-mask',
        data () {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#base-mask{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 9;
}
</style>
