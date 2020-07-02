<template>
	<div class="top">
		<div class="top-left">
			<ul>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<div class="direction">
			<i class="el-icon-arrow-left"></i>
			<i class="el-icon-arrow-right"></i>
			</div>
		</div>
		<div class="top-right">
			<!-- <i class="el-icon-zoom-in"></i> -->
			<button class="el-icon-search" @click="search"></button>
			<input type="search" class="input" placeholder="搜索" v-model="searchInput" @keyup.enter="search">
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchInput:""
			}
		},
		methods:{
			search(){
				// alert(this.searchInput)
				if(this.searchInput=="")
				{
					this.$message.warning('请输入您要搜索的歌曲')
				}else{
					this.$router.push('./result?key='+this.searchInput)
					this.searchInput=""
				}
			}
		}
	}
</script>

<style scoped>
	li{
		list-style-type: none;
	}
	.top{
		height: 50px;
		width: 100%;
		line-height: 50px;
		background-color: rgb(249, 249, 249);
	}
	.top-left ul li{
		float: left;
		width: 30px;
		height: 30px;
		
		margin-top: 10px;
		margin-left: 15px;
		border-radius: 50%;
	}
	.top-left ul li:nth-child(1){
		background-color: rgb(231, 118, 94);
	}
	.top-left ul li:nth-child(2){
		background-color: rgb(223, 189, 89);
	}
	.top-left ul li:nth-child(3){
		background-color: rgb(130, 175, 91);
	}
	.direction{
		float: left;
		width: 40px;
		height: 50px;
		margin-left: 30px;
	}
	.top-right{
		float: right;
		width: 300px;
		height: 50px;
		line-height: 50px;
		/* border: 1px solid #000; */
		}
		.top-right input{
			width: 200px;
			height: 30px;
			outline: none;
			border-radius: 0 10px 10px 0;
			border-left: none;
			border-top: none;
		}
		.top-right button{
			outline: none;
		}
	.el-icon-search{
		width: 30px;
		height: 30px;
		/* line-height: 30px; */
		text-align: center;
		border: .5px solid rgb(238, 238, 238);
		border-right: 0;
		border-radius: 10px 0 0 10px;
		background-color: white;
	}
</style>
