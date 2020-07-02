<template>
	<div class="discovery">
		  <el-carousel :interval="4000" type="card" height="200px">
		    <el-carousel-item v-for="(item,index) in banners" :key="index">
		     <img :src="item.imageUrl" alt="">
		    </el-carousel-item>
		  </el-carousel>
		  <h2>推荐歌单</h2>
		  <div class="imgcontent">
			  <ul>
			  	<li v-for="(item,index) in list" :key="index">
					<div class="name">{{item.name}}</div>
					<img :src="item.picUrl" alt="">
					<span>{{item.copywriter}}</span>
				</li>
			  </ul>
		  </div>
		  <!-- //最新音乐 -->
		  <h2>最新音乐</h2>
		  <div class="newsongs">
			  <ul>
			  	<li v-for="(item,index) in newsongs" :key="index">
					<i class="el-icon-video-play" @click="playmusic(item.id)"></i>
					<img :src="item.picUrl" alt="">
					<span>{{item.name}}</span>
					<p>{{item.song.artists[0].name}}</p>
				</li>
			  </ul>
		  </div>
		  <h2>推荐MV</h2>
		  <div class="mvs">
			  <ul>
			  	<li v-for="(item,index) in mvs">
					<i class="el-icon-video-play"></i>
					<i class="el-icon-caret-right">{{item.playCount}}</i>
					<img :src="item.picUrl" alt="">
					<span>{{item.name}}</span>
					<p>{{item.artistName}}</p>
				</li>
			  </ul>
			  
		  </div>
	</div>
</template>

<script>
	import Axios from 'axios'
	export default{
		name:'discovery',
		data(){
			return{
				//轮播图
				banners:[],
				//推荐歌单
				list:[],
				newsongs:[],
				mvs:[]
			}
		},
		created(){
			Axios({
				url:'https://autumnfish.cn/banner',
				method:'get'
			}).then(res=>{
				this.banners=res.data.banners
			}),
			//推荐歌单
			Axios({
				url:"https://autumnfish.cn/personalized",
				method:"get",
				params:{
					limit:10
				}
			}).then(res=>{
				// console.log(res)
				this.list=res.data.result
			}),
			// 最新音乐接口
			Axios({
				url:'https://autumnfish.cn/personalized/newsong',
				method:"get"
			}).then(res=>{
				// console.log(res)
				this.newsongs=res.data.result;
				// console.log(this.newsongs)
			}),
			//推荐mv
			Axios({
				url:" https://autumnfish.cn/personalized/mv",
				method:"get"
			}).then(res=>{
				this.mvs=res.data.result;
				// console.log(this.mvs)
			})
		},
		methods:{
			playmusic(id){
				// console.log(id)
				Axios({
					url:"https://autumnfish.cn/song/url",
					method:"get",
					params:{
						id:id
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
	  .el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 200px;
	    margin: 0;
	  }
	.discovery{
		margin: 20px auto;
		width: 800px;
		height: 810px;	
	}
	h2{
		color: rgb(119, 120, 124);
		margin-bottom: 20px;
	}
	.imgcontent{
		width: 100%;
	}
	.imgcontent ul li{
		float: left;
		width: 150px;
		margin-right: 10px;
		position: relative;
	}
	.imgcontent ul li img{
		width: 150px;
		height: 160px;
	}
	.imgcontent ul li span{
		display: block;
		width: 150px;
		height: 50px;
		text-align: center;
		font-size: 12px;
	}
	.imgcontent ul li .name{
		position: absolute;
		width: 150px;
		height: 40px;
		text-align: center;
		color: white;
		background-color: #000000;
		opacity: .2;
		top: 0;
		display: none;
	}
	.imgcontent ul li:hover .name{
		display: block;
	}
	
	.discovery .newsongs ul li{
		position: relative;
		float: left;
		height: 70px;
		width: 50%;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.discovery .newsongs ul li:hover{
		background-color: rgb(244, 244, 244);
	}
	.discovery .newsongs ul li img{
		
		float: left;
		width: 70px;
		height: 70px;
		margin-left: 5px;
	}
	.discovery .newsongs ul li:hover .el-icon-video-play{
		display: block;
		opacity: .8;
	}
	.discovery .newsongs ul li span{
		font-size: 14px;
		padding-left: 5px;
		/* font-weight: 700; */
	}
	.discovery .newsongs ul li p{
		/* float: left; */
		display: block;
		padding-top: 20px;
		color: rgb(167, 170, 175);
		
	}
	.el-icon-video-play{
		position: absolute;
		top: 20px;
		left: 25px;
		font-size: 30px;
		display: none;
		color: #29f463;
	}
	.el-icon-caret-right{
		color: white;
	}
	.mvs ul li{
		position: relative;
		float: left;
		width: 200px;
		height: 190px;
		margin-right: 20px;
	}
	.mvs ul li img{
		width: 200px;
		height: 100px;
	}
	.mvs ul li .el-icon-caret-right{
		position: absolute;
		top:0;
		right: 0;
	}
	.mvs ul{
		width: 900px;
	}
	.mvs ul li p{
		color: rgb(167, 170, 175);
	}
	.mvs .el-icon-video-play{
		font-size: 20px;
		color: #000;
	}
</style>
