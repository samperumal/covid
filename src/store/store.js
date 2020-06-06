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
		},
		initialAssessment: {
			age: 0,
			ecog: 0,
			frailty: 0,
			sofa: {
				respPaO2: 0,
				respFiO2: 0,
				coagulation: 0,
				liver: 0,
				cardiovascular: 0,
				cardioMap: 0,
				cardioDop: 0,
				cardioEpi: 0,
				cardioDob: 0,
				nervous: 0,
				renalCreat: 0,
				renalUrine: 0
			},
			comorbidities: {
				renal: 0, 
				cancer: 0, 
				lung: 0, 
				cardiac: 0, 
				burns: 0, 
				physical: 0, 
				vascular: 0, 
				surgery: 0, 
				hypertension: 0, 
				diabetes: 0, 
				bmi: 0, 
				drugs: 0, 
				hiv: 0, 
				liver: 0
			}
		},
	}
}

export const store = new Vuex.Store({
	state: {
		data: resetData()
	},
	mutations: {
		setAgeAndFunction(state, newFrailty) {
			state.data.initialAssessment.age = +newFrailty.age
			state.data.initialAssessment.ecog = +newFrailty.ecog
			state.data.initialAssessment.frailty = +newFrailty.frailty
		},
		setInitialComorbidities(state, newComorbidities) {
			for (var key in newComorbidities)
				newComorbidities[key] = +newComorbidities[key]

			state.data.initialAssessment.comorbidities = newComorbidities
		},
		setInitialSofa(state, newSofa) {
			for (var key in newSofa)
				newSofa[key] = +newSofa[key]

			state.data.initialAssessment.sofa = newSofa
		},
		reset() {
			state.data = resetData()
		}
	},
	getters: {
	}
})
