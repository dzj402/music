<template>
	<div class="playList">
		<div class="commend">
			<img :src="hotmusic.coverImgUrl" alt="">
			<div class="details">
				<button>精品歌单</button>
				<span>{{hotmusic.name}}</span>
				<p>{{hotmusic.description}}</p>
			</div>
		</div>
		<ul>
			<li><a href="javascript:;" :class="{styleColor:tag=='全部'}" @click="tag='全部'">全部</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='欧美'}" @click="tag='欧美'">欧美</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='华语'}" @click="tag='华语'">华语</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='流行'}" @click="tag='流行'">流行</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='说唱'}" @click="tag='说唱'">说唱</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='摇滚'}" @click="tag='摇滚'">摇滚</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='民谣'}" @click="tag='民谣'">民谣</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='电子'}" @click="tag='电子'">电子</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='影视原声'}" @click="tag='影视原声'">影视原声</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='ACG'}" @click="tag='ACG'">ACG</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='怀旧'}" @click="tag='怀旧'">怀旧</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='治愈'}" @click="tag='治愈'">治愈</a></li>
			<li><a href="javascript:;" :class="{styleColor:tag=='旅行'}" @click="tag='旅行'">旅行</a></li>
		</ul>
		<div class="imgcontent">
			<ul>
				<li v-for="(item,index) in list" :key="index">
					<img :src="item.coverImgUrl" alt="">
					<span>{{item.name}}</span>
					<i class="el-icon-video-play"></i>
					<em class="el-icon-caret-right">{{item.playCount}}</em>
				</li>
			</ul>
		</div>
		<div class="botton">
		<el-pagination
		@current-change="handle"
		  background
		  layout="prev, pager, next"
		  :total="total"
		  :current-page="page"
		  :page-size="10">
		</el-pagination>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				total:0,
				page:1,
				hotmusic:[],
				list:[],
				tag:"全部"
			}
		},
		watch:{
			tag(){
				// console.log(this.tag)
				this.topData()
				this.listData()
				this.page=1
		}
		},
		created	() {
			this.topData(),
			this.listData()
		},
		methods:{
			topData(){
				axios({
					url:"https://autumnfish.cn/top/playlist/highquality",
					method:"get",
					params:{
						limit:1,
						cat:this.tag
					}
					
				}).then(res=>{
					// console.log(res)
					this.hotmusic=res.data.playlists[0];
				})
			},
			listData(){
				axios({
					url:"https://autumnfish.cn/top/playlist/",
					method:"get",
					params:{
						limit:10,
						offset:(this.page-1)*10,
						cat:this.tag
					}
				}).then(res=>{
					this.total=res.data.total;
					// console.log(res);
					this.list=res.data.playlists
				})
			},
			handle(val){
				// console.log(`当前页码:${val}`)
				this.page=val;
				this.listData()
			}
		}
	}
</script>

<style>
	.el-pager{
		text-align: center;
		margin: 10px auto;
	}
	.playList{
		margin: 20px auto;
		width: 800px;
		height: 810px;	
		/* background-color: #42B983; */
	}
	
	.commend{
		height: 160px;
		width: 100%;
		/* background-color: rgb(41, 28, 18); */
		overflow: hidden;
		background: linear-gradient(to top right,rgb(228, 201, 175),rgb(164, 192, 206));
	}
	.commend img{
		float: left;
		width: 100px;
		height: 120px;
		padding: 10px;
	}
	.details{
		float: left;
	}
	.details button{
		display: block;
		width: 110px;
		height: 20px;
		border: 1px solid rgb(228, 201, 175);
		border-radius: 5px;
		margin-top: 7px;
		color: rgb(228, 201, 175);
		font-style: normal;
		outline: none;
	}
	.details span{
		display: block;
		color: white;
		font-size: 16px;
		margin: 7px auto;
		font-style: italic;
	}
	.details p{
		color: white;
		width: 700px;
		/* background-color: #29F463; */
	}
	.playList ul li a{
		text-decoration: none;
		color: rgb(198, 191, 184);
	}
	.playList ul{
		float: right;
		/* overflow: hidden */
		clear: both;
	}
	.playList ul li{
		float: left;
		margin-top: 20px;
		margin-bottom: 20px;
		padding: 0 5px;
		
	}
	.playList ul li .styleColor{
		color: rgb(231, 179, 164);
		/* color: red; */
	}
	.playList .imgcontent{
		width: 100%;
	}
	/* .playList .imgcontent ul{
		width: 900px;
	} */
	.playList .imgcontent ul li{
		position: relative;
		float: left;
		width: 150px;
		margin-right: 10px;
	}
	.playList .imgcontent ul li em{
		position: absolute;
		top: 0;
		right: 0;
		color: white;
	}
	.playList .imgcontent ul li i{
		position: absolute;
		display: none;
		top: 52px;
		right: 47px;
		font-size: 49px;
		color: rgb(198, 191, 184);
	}
	.playList .imgcontent ul li:hover i{
		display: block;
	}
	.playList .imgcontent ul li img{
		width: 150px;
		height: 160px;
	}
	.playList .imgcontent ul li span{
		display: block;
		width: 150px;
		height: 60px;
		text-align: center;
		font-size: 14px;
	}
	.button{
		text-align: center;
		margin: 10px auto;
	}
</style>
