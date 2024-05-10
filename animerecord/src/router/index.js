import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/main" },
  {
    path: "/main",
    component: () => import("@/views/main/Main"),
    redirect: "/main/home",
    children: [
      { path: "home", component: () => import("@/views/home/Home") }, // 主页
      {
        path: "directory",
        component: () => import("@/views/directory/Directory"),
      }, // 归档
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
