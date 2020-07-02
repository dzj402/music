<template>
	<div class="result">
		<div class="top">
			<h2>{{$route.query.key}}</h2>
			<span>找到{{count}}个结果</span>
		</div>
		
		  <el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="歌曲" name="songs">
				<table class="table">
							 <thead>
								 <th></th>
								 <th>音乐标题</th>
								 <th>歌手</th>
								 <th>专辑</th>
								 <th>时长</th>
							 </thead>
							 <tbody>
								 <tr v-for="(item,index) in songlist" :key="index" @dblclick="playmusic(item.id)">
									 <td>{{index+1}}</td>
									 <td>
										 <div class="de">
											 <span>{{item.name}}</span> <i class="el-icon-video-play" v-if="item.mvid!=0"></i>
											 <p v-if="item.alias.length!=0">{{item.alias[1]}}</p>
										</div>
									 </td>
									 <td>{{item.artists[0].name}}</td>
									 <td>{{item.album.name}}</td>
									 <td>{{item.duration}}</td>
								 </tr>
							 </tbody>
				</table>
			</el-tab-pane>
		    <el-tab-pane label="歌单" name="list">
				<div class="imgcontent">
					<ul>
						<li v-for="(item,index) in songlists" :key="index" @click="toplaylist(item.id)">
							<img :src="item.coverImgUrl" alt="">
							<span>{{item.name}}</span>
							<i class="el-icon-video-play"></i>
							<em class="el-icon-caret-right">{{item.playCount}}</em>
						</li>
					</ul>
				</div>
			</el-tab-pane>
		    <el-tab-pane label="MV" name="mv">
				<div class="mvlist">
					<ul>
						<li v-for="(item,index) in songMv" :key="index">
							<img :src="item.cover" alt="">
							<i class="el-icon-video-play"></i>
							<i class="el-icon-caret-right">{{item.playCount}}</i>
							<em>{{item.name}}</em>
							<p>{{item.artistName}}</p>
							<span class="span">{{item.duration}}</span>
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
				songlist:[],
				songlists:[],
				songMv:[],
				count:0,
		      }
		    },
			created	() {
				axios({
					url:"https://autumnfish.cn/search",
					method:"get",
					params:{
						keywords:this.$route.query.key,
						limit:50,
						type:1
					}
				}).then(res=>{
						this.songlist=res.data.result.songs;
						// console.log(res.data.result)
						for(let i=0;i<this.songlist.length;i++){
							let duration=this.songlist[i].duration
							const munite=parseInt(duration/1000/100)
							if(munite<10)
							{munite='0'+munite}
							const second=parseInt(duration/1000%100)
							if(second<10)
							{second='0'+second}
							// console.log(munite+":"+second)
							this.songlist[i].duration=`${munite}:${second}`
						}
						this.count=res.data.result.songCount
					
				})
			},
			watch:{
				activeName(){
					let type=1;
					switch(this.activeName){
						case 'songs':
							type=1;
							break;
						case 'list':
							type=1000;
							break;
						case 'mv':
							type=1004;
							break;
					}
					axios({
						url:"https://autumnfish.cn/search",
						method:"get",
						params:{
							keywords:this.$route.query.key,
							limit:50,
							type
						}
					}).then(res=>{
						// console.log(res)
						if(type==1)
						{
							this.songlist=res.data.result.songs;
							for(let i=0;i<this.songlist.length;i++){
								let duration=this.songlist[i].duration
								const munite=parseInt(duration/1000/100)
								if(munite<10)
								{munite='0'+munite}
								const second=parseInt(duration/1000%100)
								if(second<10)
								{second='0'+second}
								// console.log(munite+":"+second)
								this.songlist[i].duration=`${munite}:${second}`
							}
							this.count=res.data.result.songCount
						}else if(type==1000){ 
							this.songlists=res.data.result.playlists
							this.count=res.data.result.playlistCount
							// console.log(this.songlists)
						}else{
							this.songMv=res.data.result.mvs
							// console.log(this.songMv)
							this.count=res.data.result.mvCount
							
							for(let i=0;i<this.songMv.length;i++){
								let duration=this.songMv[i].duration
								const munite=parseInt(duration/1000/60)
								if(munite<10)
								{munite='0'+munite}
								const second=parseInt(duration/1000%60)
								if(second<10)
								{second='0'+second}
								// console.log(munite+":"+second)
								this.songMv[i].duration=`${munite}:${second}`
							}
						}
					
					})
				}
			},
		    methods: {
				toplaylist(id){
					this.$router.push('/playlists?key='+id)
				},
		      handleClick(tab, event) {
		        // console.log(tab, event);
		      },
			  playmusic(id){
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
	.result{
		margin: 10px auto;
		width: 800px;
		height: 810px;	
	}
	.span{
		position: absolute;
		color: white;
		bottom: 40px;
		right: 0;
	}
	.result .table{
		width: 100%;
	}
	.result .table thead{
		font-size: 15px;
		color: rgb(169, 171, 170);
		font-weight: normal;
	}
	.result .table thead th:nth-child(2){
		width: 250px;
	}
	.result .table thead th:nth-child(3){
		width: 130px;
	}
	.result .table tbody tr{
		height: 60px;
		padding: 20px;
		cursor: pointer;
	}
	.result .table tbody tr img{
		width: 70px;
		height: 70px;
	}
	.result .table tbody tr:hover .el-icon-caret-right{
		display: block;
	}
	.result .table tbody tr:hover{
		background-color: rgb(244, 244, 244);
	}
	.result .table tbody tr td{
		font-size: 14px;
		position: relative;
		text-align: center;
		color: rgb(149, 148, 141);
	}
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
		color: red;
	}
	.mvlist{
		margin-top: 20px;
	}
	.mvlist ul li p{
		color:rgb(194, 191, 185) ;
	}
	.mvlist ul{
		width: 1000px;
	}
	.mvlist ul li{
		position: relative;
		float: left;
		width: 200px;
		height: 185px;
		margin-right: 20px;
		margin-bottom: 20px;
		cursor: pointer;
		
	}
	.mvlist ul li img{
		width: 200px;
		height: 150px;
	}
	.mvlist .el-icon-caret-right{
		color: white;
		position: absolute;
		top: 0px;
		right: 0px;
	}
	.mvlist ul li:hover .el-icon-video-play{
		display: block;
	}
	.mvlist .el-icon-video-play{
		position: absolute;
		display: none;
		top: 50px;
		left: 80px;
		font-size: 60px;
		color: #87CEEB;
		
		/* color: red; */
		opacity: .5;
	}
	 .imgcontent{
		width: 100%;
	}
	/* .playList .imgcontent ul{
		width: 900px;
	} */
	.imgcontent ul li{
		position: relative;
		float: left;
		width: 150px;
		margin-right: 10px;
	}
	 .imgcontent ul li em{
		position: absolute;
		top: 0;
		right: 0;
		color: white;
	}
	.imgcontent ul li i{
		position: absolute;
		display: none;
		top: 52px;
		right: 47px;
		font-size: 49px;
		color: rgb(198, 191, 184);
	}
	.imgcontent ul li:hover i{
		display: block;
	}
	 .imgcontent ul li img{
		width: 150px;
		height: 160px;
	}
	.imgcontent ul li span{
		display: block;
		width: 150px;
		height: 60px;
		text-align: center;
		font-size: 14px;
	}
</style>
