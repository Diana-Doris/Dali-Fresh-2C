import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    // path: "/",
    path: '*',
    redirect: '/home/classify',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('../views/Classify.vue'),
        children: [],
      },
      {
        path: 'shopping',
        name: 'Shopping',
        component: () => import('../views/Shopping.vue'),
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue'),
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/Search.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
