<template>
	<div class="main">
		<div class="middle">
		<div class="nav">
			<ul>
				<li>
					<i class="el-icon-finished"></i>
					<router-link to="discovery">发现音乐</router-link>
					</li>
				<li><i class="el-icon-s-data"></i> 
				<router-link to="playList">推荐歌单</router-link>
				</li>
				<li><i class="el-icon-service"></i>
				<router-link to="songs">最新音乐</router-link>
				</li>
				<li><i class="el-icon-c-scale-to-original"></i>
				<router-link to="mvs">最新MV</router-link>
				</li>
			</ul>
		</div>
		<div class="container">
			<!-- <discovery></discovery> -->
			<router-view></router-view>
		</div>
		</div>
		<div class="audio">
			<audio :src="musicUrl" autoplay loop controls="controls"></audio>
		</div>
	</div>
</template>

<script>
	// import discovery from "../views/discovery.vue"
	export default{
		data(){
			return{
				musicUrl:""
			}
		},
		components:{
			// discovery
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		
	}
	.middle{
		display: flex;
		height:570px;
	}
	.middle .nav{
		width: 200px;
		background-color: #ededed;
	}
	.middle .nav li{
		text-align: center;
		margin: 20px;
	}
	.middle .nav li i{
		padding-right: 10px;
	}
	.middle .nav li a{
		text-decoration: none;
		font-style: normal;
		color: black;
	}
	a.router-link-active{
		background-color: #00FFFF;
	}
	.container{
		/* background-color: aqua; */
		flex:1;
		 overflow-x: hidden;
		  overflow-y: auto;
		    color: #000;
		    font-size: .7rem;
		    font-family: "\5FAE\8F6F\96C5\9ED1",Helvetica,"黑体",Arial,Tahoma;
			clear: both;
	}
	.container::-webkit-scrollbar {
	    width: 4px;    
	    /*height: 4px;*/
	}
	.container::-webkit-scrollbar {
	    width: 4px;    
	    /*height: 4px;*/
	}
	/* 设置滚动条样式 */
	.container::-webkit-scrollbar-thumb {
	    border-radius: 10px;
	    background: rgba(0,0,0,0.2);
		}
		.audio audio{
			width: 100%;
		}
</style>
