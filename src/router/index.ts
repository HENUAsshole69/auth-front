import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import store from '../store/index'
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    { path: '/', redirect:  { name: 'Home' } },
    {
      path: '/antiqueDetail/:id',
      name: 'AntiqueDetail',
      component: ()=>import('../views/home/AntiqueDetail.vue'),
      props: true
    },
  {
    path: '/home',
    name: 'Home',
    component: ()=>import('../views/Home.vue'),
    children:[
      { path: '', redirect:  { name: 'Antique' } },
      {
        path: 'antique',
        name: 'Antique',
        component: ()=>import('../views/home/Antique.vue')
      },
      {
        path: 'verification',
        name: 'Verification',
        component: ()=>import('../views/home/Verification.vue')
      }
    ]
  },
    {
      path: '/newAntique',
      name: 'NewAntique',
      component: ()=>import('../views/NewAntique.vue')
    },
    {
      path: '/login',
      name: 'LogIn',
      component: ()=>import('../views/Login.vue')
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if(to.name !== 'LogIn' && store.state.token === null){
    next('/login')
  }else{
    next()
  }
})
