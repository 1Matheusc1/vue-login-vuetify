import { createRouter, createWebHistory } from "vue-router";

import Guard from "../services/Guard.js";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/autenticacao/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: Guard.auth,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
