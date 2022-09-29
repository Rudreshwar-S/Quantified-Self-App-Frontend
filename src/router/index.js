import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import TrackerLog from "../views/TrackerLog.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard },
  { path: "/about", component: About },
  { path: "/registration", component: Registration },
  { path: "/Login", component: Login },
  { path: "/dashboard/:id", component: TrackerLog },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
