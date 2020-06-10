import Vue from "vue"
import Router from "vue-router"
import Home from "../components/Home.vue"
import Assessment from "../components/Assessment.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: [{ to: "/", text: "Home" }],
    },
    {
      path: "/assessment",
      name: "Assessment",
      component: Assessment,
      meta: [
        { to: "/", text: "Home" },
        { to: "/assessment", text: "Assessment" },
      ],
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})
