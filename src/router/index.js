import Vue from 'vue'
import VueRouter from 'vue-router'
import discovery from '../views/discovery.vue'
// import mvs from "../views/mvs.vue"
// import playList from "../views/playList.vue"
// import songs from "../views/songs.vue"
// const discovery=()=>('../views/discovery.vue')
const mvs=()=>import('../views/mvs.vue')
const playList=()=>import('../views/playList.vue')
const songs=()=>import('../views/songs.vue')
const result=()=>import('../views/result.vue')
const playlists=()=>import('../views/playlists.vue')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    // name: 'discovery',
    component: discovery
  },
	// {
	//   path:'/',
	//   redirect:'/discovery'
	// },
	{
		path:'/discovery',
		component:discovery
	},
	{
		path:'/mvs',
		component:mvs
	},
	{
		path:'/playList',
		component:playList
	},
	{
		path:'/songs',
		component:songs
	},
	{
		path:'/result',
		component:result
	},
	{
		path:'/playlists',
		component:playlists
	}
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
