import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import store from '../store/index'
import {ifRoleCanAdmin, ifRoleCanCred, ifRoleCanVerify, ifRoleCanWearAndTear} from "@/accessControl";
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    { path: '/', redirect:  {path:'/home' } },
    {
      path: '/antiqueDetail/:id',
      name: 'AntiqueDetail',
      component: ()=>import('../views/home/AntiqueDetail.vue'),
      props: true
    },
  {
    path: '/home',
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
      },
      {
        path: 'wearAndTear',
        name: 'WearAndTear',
        component: ()=>import('../views/home/WearAndTear.vue')
      },
      {
        path: 'cred',
        name: 'Cred',
        component: ()=>import('../views/home/Cred.vue')
      },
      {
        path: 'admin',
        name: 'Admin',
        component: ()=>import('../views/Admin.vue'),
      },
      {
        path: 'log',
        name: 'Log',
        component: ()=>import('../views/Log.vue'),
      },
      {
        path: 'newAntique',
        name: 'NewAntique',
        component: ()=>import('../views/NewAntiqueDialog.vue'),
      },
      {
        path: 'batchImport',
        name: 'BatchImport',
        component: ()=>import('../components/BatchImportPage.vue'),
      },
    ]
  },
    {
      path: '/search/:key',
      name: 'Search',
      component: ()=>import('../views/Search.vue'),
      children:[
        { path: '', redirect:  { name: 'AntiqueSearch'} },
        {
          path: 'antique',
          name: 'AntiqueSearch',
          component: ()=>import('../views/search/AntiqueSearch.vue')
        },
        {
          path: 'verification',
          name: 'VerificationSearch',
          component: ()=>import('../views/search/VerificationSearch.vue')
        }
      ]
    },
    {
      path: '/newAntique',
      name: 'NewAntique',
      component: ()=>import('../views/NewAntiqueDialog.vue')
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

router.beforeEach((to, from, next) => {
// @ts-ignore
  if(to.name === 'Verification' && !ifRoleCanVerify(store.state.userObj.type)){
    next(new Error())
  }else{
    next()
  }
})

router.beforeEach((to, from, next) => {
  // @ts-ignore
  if((to.name === 'Admin' || to.name === 'Log') && !ifRoleCanAdmin(store.state.userObj.type)){
    next(new Error())
  }else{
    next()
  }
})

router.beforeEach((to, from, next) => {
// @ts-ignore
  if(to.name === 'WearAndTear' && !ifRoleCanWearAndTear(store.state.userObj.type)){
    next(new Error())
  }else{
    next()
  }
})

router.beforeEach((to, from, next) => {
// @ts-ignore
  if(to.name === 'Cred' && !ifRoleCanCred(store.state.userObj.type)){
    next(new Error())
  }else{
    next()
  }
})
