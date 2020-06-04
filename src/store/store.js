import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function resetData() {
	return {
    priorityScore: {
			age: 0,
			functionality: 0,
			sofa: 0,
			morbidity: 0
		}
  }
}

export const store = new Vuex.Store({
  state: resetData(),
  mutations: {
    changePriorityScore(state, newPriorityScore) {
			if (+newPriorityScore.age >= 0) state.age = newPriorityScore.age
			if (+newPriorityScore.functionality >= 0) state.functionality = newPriorityScore.functionality
			if (+newPriorityScore.sofa >= 0) state.sofa = newPriorityScore.sofa
			if (+newPriorityScore.morbidity >= 0) state.morbidity = newPriorityScore.morbidity
    }
  },
  getters: {
    priorityScore: state => state.priorityScore
  }
})
