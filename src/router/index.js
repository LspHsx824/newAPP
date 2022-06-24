import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    redirect:{
      name:'content'
    },
    component:()=>import('@/views/home'),
    children:[
      {
        path:"content",
        name:"content",
        component:()=>import("@/views/my")
      },
      {
        path:"store",
        name:"store",
        component:()=>import("@/views/store")
      },
      {
        path:"NFTBackPack",
        name:"NFTBackPack",
        component:()=>import("@/views/NFTBackPack")
      },
      {
        path:"PersonalInformation",
        name:"PersonalInformation",
        component:()=>import("@/views/PersonalInformation")
      },
      {
        path:"HowToPlay",
        name:"HowToPlay",
        component:()=>import("@/views/HowToPlay")
      }
    ]
  },
];

const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => {});
};

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {});
};

export default new VueRouter({
  // mode: 'history',
  routes,
});
