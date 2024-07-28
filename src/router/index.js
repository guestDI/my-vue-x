import { createWebHistory, createRouter } from "vue-router";

import MainPage from "../components/MainPage.vue";
import ProfilePage from "../components/ProfilePage.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/profile/users/:id", component: ProfilePage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
