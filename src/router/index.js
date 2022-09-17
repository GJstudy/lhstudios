import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home/actor-list',//访问/时，直接重定向到/home/actor-list页面
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children:[
      {
      path:'actor-list',
      name:'actor-list',
      component:()=>import('../views/actor/ActorList.vue')
    },
    {
      path:'actor-add',
      name:'actor-add',
      component:()=>import('../views/actor/ActorAdd.vue')
    },
    {
      path:'director-list',
      name:'director-list',
      component:()=>import('../views/director/DirectorList.vue')
    },
    {
      path:'director-add',
      name:'director-add',
      component:()=>import('../views/director/DirectorAdd.vue')
    },
    {
      path:'movie-list',
      name:'movie-list',
      component:()=>import('../views/movie/MovieList.vue')
    },
    {
      path: 'movie-add',
      name: 'movie-add',
      component: () => import('../views/movie/MovieAdd.vue'),
    },
    {
      path: 'movie-update/:id',
      name: 'movie-update',
      component: () => import('../views/movie/MovieUpdate.vue'),
    },
    {
      path: 'thumb-list/:movie_id',
      name: 'thumb-list',
      component: () => import('../views/thumb/ThumbList.vue'),
    },
    {
      path: 'cinema-add',
      name: 'cinema-add',
      component: () => import('../views/cinema/CinemaAdd.vue'),
    },
    {
      path: 'cinema-list',
      name: 'cinema-list',
      component: () => import('../views/cinema/CinemaList.vue'),
    },
    {
      path: 'cinema-update/:id',
      name: 'cinema-update',
      component: () => import('../views/cinema/CinemaUpdate.vue'),
    },
    {
      path: 'cinema-room-list/:id',
      name: 'cinema-room-list',
      component: () => import('../views/cinema/CinemaRoomList.vue'),
    },
    {
      path: 'cinema-room-seat-template/:id',
      name: 'cinema-room-seat-template',
      component: () => import('../views/cinema/CinemaRoomSeatTemplate.vue'),
    },
    {
      path: 'showingon-plan/:id',
      name: 'showingon-plan',
      component: () => import('../views/plan/ShowingonPlanAdd.vue'),
    },
    {
      path: 'showingon-plan/list/:id',
      name: 'showingon-plan/list',
      component: () => import('../views/plan/ShowingonPlanList.vue'),
    },
  ]
  },
  {
    path: '/user/login',
    name: '/user/login',
    component: () => import('../views/user/Login.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
