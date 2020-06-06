import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function resetData() {
	return {
		data: {
			priorityScore: {
				age: 0,
				functionality: 0,
				sofa: 0,
				morbidity: 0
			},
			initialAssessment: {
				ecog: 0,
				frailty: 0
			}
		}
	}
}

export const store = new Vuex.Store({
	state: resetData(),
	mutations: {
		changePriorityScore(state, newPriorityScore) {
			// if (+newPriorityScore.age >= 0) state.data.age = newPriorityScore.age
			// if (+newPriorityScore.functionality >= 0) state.data.functionality = newPriorityScore.functionality
			// if (+newPriorityScore.sofa >= 0) state.data.sofa = newPriorityScore.sofa
			// if (+newPriorityScore.morbidity >= 0) state.data.morbidity = newPriorityScore.morbidity
		},
		setFrailty(state, newFrailty) {
			state.data.initialAssessment.ecog = +newFrailty.ecog
			state.data.initialAssessment.frailty = +newFrailty.frailty
		},
		reset() {
			state.data = resetData().data
		}
	},
	getters: {
		priorityScore: state => state.priorityScore
	}
})
