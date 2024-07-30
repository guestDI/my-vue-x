import { createWebHistory, createRouter } from "vue-router";

import MainPage from "../components/MainPage.vue";
import ProfilePage from "../components/ProfilePage.vue";
import ExplorePage from "../components/ExplorePage.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/profile/users/:id", component: ProfilePage, props: true },
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
