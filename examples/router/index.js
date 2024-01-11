import Vue from 'vue'
import VueRouter  from "vue-router";
import Layout from "../layout/index.vue"
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: {
      path: '/page-start'
    },
    children: [
      {
        path: "/page-start",
        name: "page-start",
        component: () => import("../views/start.md"),
      },
      {
        path: "/page-editor",
        name: "page-editor",
        component: () => import("../views/editor.md"),
      },
      {
        path: "/page-builder",
        name: "page-builder",
        component: () => import("../views/builder.md"),
      },
      {
        path: "/page-button",
        name: "page-button",
        component: () => import("../views/button.md"),
      },
    ],
  }
]

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;