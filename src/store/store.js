import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

function resetData() {
  return {
    priorityScore: {
      age: 0,
      functionality: 0,
      sofa: 0,
      morbidity: 0,
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
        cardioMap: 0,
        cardioDop: 0,
        cardioEpi: 0,
        cardioDob: 0,
        nervous: 0,
        renalCreat: 0,
        renalUrine: 0,
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
        liver: 0,
      },
    },
  }
}

export const store = new Vuex.Store({
  state: {
    data: resetData(),
  },
  mutations: {
    setAgeAndFunction(state, newFrailty) {
      state.data.initialAssessment.age = +newFrailty.age
      state.data.initialAssessment.ecog = +newFrailty.ecog
      state.data.initialAssessment.frailty = +newFrailty.frailty
    },
    setInitialComorbidities(state, newComorbidities) {
      for (var key in newComorbidities)
        Vue.set(
          state.data.initialAssessment.comorbidities,
          key,
          +newComorbidities[key]
        )
    },
    setInitialSofa(state, newSofa) {
      for (var key in newSofa)
        Vue.set(state.data.initialAssessment.sofa, key, +newSofa[key])
    },
    reset(state) {
      state.data = resetData()
    },
  },
  getters: {
    initialPriorityScore: (state, getters) => {
      const ia = state.data.initialAssessment
      const functionalityScore = Math.max(ia.frailty, ia.ecog)

      var priorityScore = {
        age: ia.age,
        functionality: functionalityScore,
        sofa: getters.sofaScore(ia.sofa),
        comorbidities: getters.comorbidityScore(ia.comorbidities),
      }

      var pScore =
        priorityScore.sofa +
        priorityScore.comorbidities +
        priorityScore.age +
        priorityScore.functionality

      priorityScore.score = pScore

      if (pScore < 4) {
        priorityScore.bucket = "red"
        priorityScore.ventilator = "Highest priority for ventilator support."
        priorityScore.prioritisation =
          "Receive priority over all other groups in face of scarce resources."
      } else if (pScore < 6) {
        priorityScore.bucket = "orange"
        priorityScore.ventilator =
          "Intermediate priority for ventilator support."
        priorityScore.prioritisation =
          "Receive resources if available after all patients in red group allocated."
      } else if (pScore < 10) {
        priorityScore.bucket = "yellow"
        priorityScore.ventilator = "Low priority for ventilator support."
        priorityScore.prioritisation =
          "Receive resources if available after all patients in red and orange groups allocated."
      } else {
        priorityScore.bucket = "green"
        priorityScore.ventilator = "Lowest priority for ventilator support."
        priorityScore.prioritisation = "Palliation strongly suggested."
      }

      return priorityScore
    },
    comorbidityScore: () => (comorbidities) => {
      var totalScore = 0
      for (var comorbidity in comorbidities)
        totalScore = Math.max(totalScore, +comorbidities[comorbidity])
      return totalScore
    },
    sofaScore: () => (sofa) => {
      var totalScore = 0

      // Calculate and map respiration fraction
      const respirationFraction =
        Math.round((+sofa.respPaO2 / (+sofa.respFiO2 / 100)) * 100) / 100

      var respiration = 0
      if (respirationFraction == null) respiration = 0
      else if (respirationFraction < 13.3) respiration = 4
      else if (respirationFraction < 26.7) respiration = 3
      else if (respirationFraction < 40) respiration = 2
      else if (respirationFraction < 53.3) respiration = 1
      totalScore += respiration

      // Use the highest of the cardiovascular scores
      const cardiovascular = Math.max(
        0,
        sofa.cardioMap,
        sofa.cardioDop,
        sofa.cardioEpi,
        sofa.cardioDob
      )
      totalScore += cardiovascular

      // Use the highest of the renal scores
      totalScore += Math.max(sofa.renalCreat, sofa.renalUrine)

      totalScore += sofa.coagulation != null ? +sofa.coagulation : 0
      totalScore += sofa.liver != null ? +sofa.liver : 0
      totalScore += sofa.nervous != null ? +sofa.nervous : 0

      return +totalScore
    },
  },
})
