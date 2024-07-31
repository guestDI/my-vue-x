import { createWebHistory, createRouter } from "vue-router";

import MainPage from "../views/MainPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import ExplorePage from "../views/ExplorePage.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/profile/:id", component: ProfilePage, props: true },
  {
    path: "/explore",
    name: "Explore",
    component: ExplorePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
