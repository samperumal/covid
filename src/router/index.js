import Vue from "vue"
import Router from "vue-router"
import PriorityScoring from "../components/PriorityScoring.vue"
import Home from "../components/Home.vue"
import ManagementPlan from "../components/ManagementPlan.vue"
import Reassessment from "../components/Reassessment.vue"

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
      path: "/management-plan",
      name: "ManagementPlan",
      component: ManagementPlan,
      meta: [
        { to: "/", text: "Home" },
        { to: "/management-plan", text: "Management Plan" },
      ],
    },
    {
      path: "/priority",
      name: "PriorityScoring",
      component: PriorityScoring,
      meta: [
        { to: "/", text: "Home" },
        { to: "/priority", text: "Priority Scoring" },
      ],
    },
    {
      path: "/reassessment",
      name: "Re-assessment",
      component: Reassessment,
      meta: [
        { to: "/", text: "Home" },
        { to: "/reassessment", text: "Re-assessment" },
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
