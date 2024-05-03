import { createRouter, createWebHistory } from "vue-router";

import Main from "@/views/main/Main";
import Home from "@/views/home/Home";
import Directory from "@/views/directory/Directory";

const routes = [
  { path: "/", redirect: "/main" },
  {
    path: "/main",
    component: Main,
    redirect: "/main/home",
    children: [
      { path: "home", component: Home }, // 主页
      { path: "directory", component: Directory }, // 归档
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
