<template>
  <div id="app">
   <top></top>
   <index></index>
  </div>
</template>
<script>
	import top from "./components/top.vue"
	import index from "./components/main.vue"
	export default{
		data(){
			return{
				
			}
		},
		components:{
			top,
			index
		}
	}
</script>
<style scoped>
	@import url("./assets/base.css");
</style>
