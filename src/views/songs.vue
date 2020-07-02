<template>
	<div class="songs">
		<div class="nav">
			<ul>
				<li><a href="javascript:;" :class="{stylecolor:tag==0}" @click="tag=0">全部</a></li>
				<li><a href="javascript:;" :class="{stylecolor:tag==7}" @click="tag=7">华语</a></li>
				<li><a href="javascript:;" :class="{stylecolor:tag==96}" @click="tag=96">欧美</a></li>
				<li><a href="javascript:;" :class="{stylecolor:tag==8}" @click="tag=8">日本</a></li>
				<li><a href="javascript:;" :class="{stylecolor:tag==16}" @click="tag=16">韩国</a></li>
			</ul>
		</div>
		 <table class="table">
			 <thead>
				 <th></th>
				 <th></th>
				 <th>音乐标题</th>
				 <th>歌手</th>
				 <th>专辑</th>
				 <th>时长</th>
			 </thead>
			 <tbody>
				 <tr v-for="(item,index) in list" :key="index">
					 <td>{{index+1}}</td>
					 <td><img :src="item.artists[0].picUrl" alt=""></td>
					 <td>
						 <div class="de">
							 <i class="el-icon-caret-right" @click="play(item.id)"></i>
							 <i class="el-icon-video-play"></i>
							 <span>{{item.name}}</span>
							 <p>1232131232</p>
						</div>
					 </td>
					 <td>{{item.artists[0].name}}</td>
					 <td>{{item.album.name}}</td>
					 <td>{{item.duration}}</td>
				 </tr>
			 </tbody>
		 </table>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				list:[],
				tag:0
			}
		},
		watch:{
			tag(){
			this.change()
			}
		},
		created(){
			this.change()
		},
		methods:{
			change(){
				axios({
					url:" https://autumnfish.cn/top/song",
					method:"get",
					params:{
						type:this.tag
					}
				}).then(res=>{
					this.list=res.data.data;
					// console.log(this.list)
					for(let i=0;i<this.list.length;i++){
						let duration=this.list[i].duration
						const munite=parseInt(duration/1000/60)
						if(munite<10)
						{munite='0'+munite}
						const second=parseInt(duration/1000%60)
						if(second<10)
						{second='0'+second}
						// console.log(munite+":"+second)
						this.list[i].duration=`${munite}:${second}`
					}
				})
			},
			play(id){
				// console.log(id)
				axios({
					url:"https://autumnfish.cn/song/url",
					method:"get",
					params:{
						id
					}
				}).then(res=>{
					let url=res.data.data[0].url;
					this.$parent.musicUrl=url;
				})
			}
		
		}
	
	}
</script>

<style scoped>
	.de{
		text-align: left;
		padding-left: 35px;
	}
	.de p{
		color: rgb(219, 221, 221);
		padding-top: 15px;
	}
	.de span{
		/* position: relative; */
		height: 10px;
		width: 100px;
	}
	.de .el-icon-video-play{
		position: absolute;
		top: 13px;
		right: -20px;
		color: red;
	}
	.de .el-icon-caret-right{
		position: absolute;
		top: 15px;
		left: -50px;
		font-size: 30px;
		color: skyblue;
		display: none;
	}
	.songs{
		margin: 10px auto;
		width: 800px;
		height: 810px;	
	}
	.songs .nav{
		height: 20px;
		margin-bottom:20px ;
	}
	.songs .nav ul{
		float: right;
		
	}
	.songs .nav ul li{
		float: left;
		padding: 0 10px;
		font-size: 14px;
	}
	.songs .nav ul li a{
		text-decoration: none;
		color: rgb(195, 193, 194);
		font-style: normal;
	}
	.songs .nav ul li .stylecolor{
		color: rgb(210, 163, 149);
	}
	.songs .table{
		width: 100%;
	}
	.songs .table thead{
		font-size: 15px;
		color: rgb(169, 171, 170);
		font-weight: normal;
	}
	.songs .table thead th:nth-child(2){
		width: 50px;
	}
	.songs .table thead th:nth-child(3){
		width: 130px;
	}
	.songs .table tbody tr{
		height: 60px;
		padding: 20px;
	}
	.songs .table tbody tr img{
		width: 70px;
		height: 70px;
	}
	.songs .table tbody tr:hover .el-icon-caret-right{
		display: block;
	}
	.songs .table tbody tr:hover{
		background-color: rgb(244, 244, 244);
	}
	.songs .table tbody tr td{
		font-size: 14px;
		position: relative;
		text-align: center;
		color: rgb(149, 148, 141);
	}
</style>
