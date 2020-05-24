import Vue from 'vue'
import Router from 'vue-router'
import FrailtyAssessment from '../components/FrailtyAssessment.vue'
import PriorityScoring from '../components/PriorityScoring.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Frailty',
			component: FrailtyAssessment,
			meta: [
        { to: "/", text: "Home" },
        { to: "/", text: "Frailty Assessment" },
      ]
		},
		{
			path: '/sofa',
			name: 'PriorityScoring',
			component: PriorityScoring,
			meta: [
        { to: "/", text: "Home" },
				{ to: "/", text: "Frailty Assessment" },
				{ to: "/sofa", text: "SOFA Prioritisation" },
      ]
		}
  ]
})