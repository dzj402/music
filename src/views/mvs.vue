<template>
	<div class="mvs">
		<div class="top">
			<ul class="diqu">
				<li>地区:</li>
				<li :class="{stylecolor:area=='全部'}" @click="area='全部'">全部</li>
				<li :class="{stylecolor:area=='内地'}" @click="area='内地'">内地</li>
				<li :class="{stylecolor:area=='港台'}" @click="area='港台'">港台</li>
				<li :class="{stylecolor:area=='欧美'}" @click="area='欧美'">欧美</li>
				<li :class="{stylecolor:area=='日本'}" @click="area='日本'">日本</li>
				<li :class="{stylecolor:area=='韩国'}" @click="area='韩国'">韩国</li>
			</ul>
			<ul class="leixing">
				<li>类型:</li>
				<li :class="{stylecolor:type=='全部'}" @click="type='全部'">全部</li>
				<li :class="{stylecolor:type=='官方版'}" @click="type='官方版'">官方版</li>
				<li :class="{stylecolor:type=='原生'}" @click="type='原生'">原生</li>
				<li :class="{stylecolor:type=='现场版'}" @click="type='现场版'">现场版</li>
				<li :class="{stylecolor:type=='网易出品'}" @click="type='网易出品'">网易出品</li>
			</ul>
			<ul class="paixu">
				<li>排序:</li>
				<li :class="{stylecolor:order=='上升最快'}" @click="order='上升最快'">上升最快</li>
				<li :class="{stylecolor:order=='最热'}" @click="order='最热'">最热</li>
				<li :class="{stylecolor:order=='最新'}" @click="order='最新'">最新</li>
			</ul>
		</div>
		<div class="mvlist">
			<ul>
				<li v-for="(item,index) in list" :key="index">
					<img :src="item.cover" alt="">
					<i class="el-icon-video-play"></i>
					<i class="el-icon-caret-right">{{item.playCount}}</i>
					<em>{{item.name}}</em>
					<p>{{item.artistName}}</p>
				</li>
			</ul>
		</div>
		<div class="button">
		<el-pagination
		@current-change="handle"
		background
		layout="prev,pager,next"
		:total="total"
		:current-page="page"
		:page-size="10"
		:limit="limit"
		></el-pagination>
		
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
				area:"全部",
				type:"全部",
				order:"上升最快",
				limit:12,
				// offset:0
				list:[]
			}
		},
		watch:{
			area(){
				this.page=1
				this.getlist()
			},
			type(){
				this.page=1
				this.getlist()
			},
			order(){
				this.page=1
				this.getlist()
			}
		},
		created(){
			this.getlist()
		},
		methods:{
			getlist(){
				axios({
					url:"https://autumnfish.cn/mv/all",
					method:"get",
					params:{
						area:this.area,
						type:this.type,
						order:this.order,
						limit:this.limit,
						offset:(this.page-1)*this.limit,
					}
				}).then(res=>{
					//console.log(res)
					if(res.data.count){
						this.total=res.data.count
					}
					
					this.list=res.data.data
					for(let i=0;i<this.list.length;i++){
						if(this.list[i].playCount>100000){
							this.list[i].playCount=parseInt(this.list[i].playCount/10000)+'万'
						}
					}
					})
			},
			handle(val){
			// console.log(`当前页码:${val}`)
			// this.page=val
			this.page=val;
			this.getlist()
		}
		
		}
	}
</script>

<style scoped="scoped">
	
	li{
		cursor: pointer;
	}
	.button{
		text-align: center;
		margin: 10px auto;
	}
	em{
		font-style: normal;
		font-size: 13px;
	}
	.mvs{
		margin: 40px auto;
		width: 800px;
		height: 810px;	
	}
	.mvs ul{
		overflow: hidden;
	}
	.mvs .diqu li{
		float: left;
		padding: 5px 40px 20px 0;
		cursor: pointer;
		color: rgb(194, 191, 185);

	}
	.mvs .top ul li:nth-child(1){
		font-size: 16px;
		color: #000000;
	}
	.mvs .leixing li{
		float: left;
		color: rgb(194, 191, 185);
		padding: 5px 40px 20px 0;
	}
	.mvs .paixu li{
		float: left;
		color: rgb(194, 191, 185);
		padding: 5px 40px 20px 0;
	}
	.mvs .top .stylecolor{
		color: #FF0000;
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
		width: 240px;
		height: 185px;
		margin-right: 20px;
		margin-bottom: 20px;
		cursor: pointer;
		
	}
	.mvlist ul li img{
		width: 240px;
		height: 150px;
	}
	.el-icon-caret-right{
		color: white;
		position: absolute;
		top: 0;
		right: 0;
	}
	.mvlist ul li:hover .el-icon-video-play{
		display: block;
	}
	.el-icon-video-play{
		position: absolute;
		display: none;
		top: 50px;
		left: 100px;
		font-size: 60px;
		color: #87CEEB;
		opacity: .5;
	}
</style>
