import Vue from 'vue'
import Router from 'vue-router'
import FrailtyAssessment from '../components/FrailtyAssessment.vue'
import PriorityScoring from '../components/PriorityScoring.vue'
import Home from '../components/Home.vue'
import ManagementPlan from '../components/ManagementPlan.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
			component: Home,
			meta: [
        { to: "/", text: "Home" },
      ]
		},
		{
      path: '/management-plan',
      name: 'ManagementPlan',
			component: ManagementPlan,
			meta: [
        { to: "/", text: "Home" },
        { to: "/management-plan", text: "Management Plan" },
      ]
		},
		{
      path: '/frailty',
      name: 'Frailty',
			component: FrailtyAssessment,
			meta: [
        { to: "/", text: "Home" },
        { to: "/frailty", text: "Frailty Assessment" },
      ]
		},
		{
			path: '/frailty/sofa',
			name: 'PriorityScoring',
			component: PriorityScoring,
			meta: [
        { to: "/", text: "Home" },
				{ to: "/frailty", text: "Frailty Assessment" },
				{ to: "/frailty/sofa", text: "SOFA Prioritisation" },
      ]
		}
	], 
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			// savedPosition is only available for popstate navigations.
			return savedPosition
		} else {
			return { x: 0, y: 0}
		}
	}
})