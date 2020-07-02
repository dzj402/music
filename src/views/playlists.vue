<template>
	<div class="playlists">
		<div class="topnav">
			<div class="topnav-left">
			<img :src="playlist.coverImgUrl" alt="" class="img1">
			</div>
			<div class="topnav-right">
			<span class="translate">{{playlist.name}}</span>
			<div class="art">
				<img :src="playlist.creator.avatarUrl" alt="" class="img2">
				<span>{{playlist.creator.nikename}}</span>{{playlist.createTime}}创建
			</div>
			<button>播放全部</button>
			<span class="tag"><em>标签</em>
			<ul>
				<li v-for="(item,index) in playlist.tags" :key="index">{{item}}</li>
			</ul></span>
			<p class="p"><em>简介</em>{{playlist.description}}</p>
			</div>
		</div>
		   <el-tabs v-model="activeName">
		     <el-tab-pane label="歌曲列表" name="song">
				 <div class="songs">
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
				 				 <tr v-for="(item,index) in playlist.tracks" :key="index" @dblclick="playmusic(item.id)">
				 					 <td>{{index+1}}</td>
				 					 <td><img :src="item.al.picUrl" alt=""></td>
				 					 <td>
				 						 <div class="de">
				 							 <span>{{item.name}}</span><i class="el-icon-video-play"></i>
				 							 <p>{{item.subTitle}}</p>
				 						</div>
				 					 </td>
				 					 <td>{{item.ar[0].name}}</td>
				 					 <td>{{item.al.name}}</td>
				 					 <td>{{item.dt}}</td>
				 				 </tr>
				 			 </tbody>
				 </table>
				 </div>
			 </el-tab-pane>
		     <el-tab-pane label="评论" name="hot">
				 <h2>精彩评论({{hotcount}})</h2>
				 <div class="hotpinglun" v-for="(item,index) in hotcomment" :key='index'>
					 <ul>
					 	<li>
							<div class="left">
							<img :src="item.user.avatarUrl" alt="">
							</div>
							<div class="right">
							<div class="user">
							<span>{{item.user.nickname}}</span>：{{item.content}}
							</div>
							<div class="res" v-if="item.beReplied.length!=0">
								<span>{{item.beReplied[0].user.nickname}}</span>:{{item.beReplied[0].content}}
							</div>
							<div class="time">
							时间
							avatarUrl
							</div>
							</div>
						</li>
					 </ul>
				 </div>
			 </el-tab-pane>
		   </el-tabs>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		 data() {
		      return {
		        activeName: 'second',
				playlist:{},
				hotcomment:[],
				hotcount:0
		      };
		    },
			created() {
				axios({
					url:" https://autumnfish.cn/playlist/detail",
					method:"get",
					params:{
						id:this.$route.query.key
					}
				}).then(res=>{
					this.playlist=res.data.playlist
					
					
					for(let i=0;i<this.playlist.tracks.length;i++){
						let duration=this.playlist.tracks[i].dt
						const munite=parseInt(duration/1000/60)
						if(munite<10)
						{munite='0'+munite}
						const second=parseInt(duration/1000%60)
						if(second<10)
						{second='0'+second}
						// console.log(munite+":"+second)
						this.playlist.tracks[i].dt=`${munite}:${second}`
					}
				}),
				axios({
					url:"https://autumnfish.cn/comment/hot",
					method:"get",
					params:{
						id:this.$route.query.key,
						type:2
					}
				}).then(res=>{
			
					this.hotcomment=res.data.hotComments
					this.hotcount=res.data.total
				})
			
			},
		    methods: {
				playmusic(id){
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

<style scoped="scoped">
	.tag em{
		float: left;
	}
	.tag ul li{
		cursor: pointer;
		float: left;
		padding-right: 5px;
	}
	.playLists{
		margin: 20px auto;
		width: 700px;
		height: 810px;
	}
	.topnav{
		height: 200px;
		width: 100%;
		display: flex;
	}
	.topnav .topnav-left{
		width: 230px;
		height: 200px;
	}
	.topnav .topnav-left .img1{
		padding: 10px 0 0 10px;
		width: 200px;
		height: 200px;
	}
	.topnav .topnav-right{
		flex: 1;
		background-color: aliceblue;
	}
	.topnav .topnav-right .translate{
		height: 20px;
		line-height: 20px;
		font-size: 16px;
		font-weight: 700;
		color: rgb(70, 69, 64);
		margin-bottom: 10px;
		padding-bottom: 10px;
	}
	.topnav .topnav-right .art{
		height: 30px;
		margin: 10px auto;
		color: rgb(116, 107, 116);
	}
	.topnav .topnav-right .img2{
		/* margin-top: 20px; */
		width: 25px;
		height: 25px;
		border-radius: 60%;
		vertical-align: middle;
		margin-right: 5px;
	}
	.topnav .topnav-right .art span{
		font-size: 14px;
		padding-right: 10px;
		color: rgb(109, 104, 93);
	}
	.topnav .topnav-right button{
		display: block;
		width: 100px;
		height: 30px;
		font-style: none;
		outline: none;
		border: 0;
		border-radius: 5px;
		color: white;
		background-color: rgb(211, 86, 62);
		margin-bottom: 10px;
	}
	.topnav .topnav-right .tag{
		display: block;
		height: 20px;
		margin: 10px auto;
		padding: 10px auto;
		color: rgb(109, 104, 93);
	}
	em{
		font-style: none;
		font-size: 16px;
		padding-right: 10px;
		
	}
	 .topnav .topnav-right p{
		color: rgb(109, 104, 93);
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

	.songs .table tbody tr:hover{
		background-color: rgb(244, 244, 244);
	}
	.songs .table tbody tr td{
		font-size: 14px;
		position: relative;
		text-align: center;
		color: rgb(149, 148, 141);
	}
	.hotpinglun{
		height: 120px;
	}
	h2{
		color: rgb(59, 65, 68);
		padding-bottom: 10px;
	}
	.hotpinglun .left{
		float: left;
		width: 30px;
		margin-right: 10px;
	}
	.hotpinglun .right{
		float: left;
	}
	.hotpinglun ul li{
		float: left;
	}
	.hotpinglun ul li span{
		color:rgb(107, 133, 157) ;
	}
	.hotpinglun ul li img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.hotpinglun .user{
		height: 20px;
		width: 800px;
		margin-bottom: 10px;
	}
	.res{
		height: 40px;
		width: 800px;
		line-height: 40px;
		background-color: rgb(229, 229, 229);
		}
		.time{
			color: rgb(222, 220, 219);
		}
</style>
