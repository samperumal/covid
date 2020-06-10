import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

function initSofaData() {
  return {
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
  }
}

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
      sofa: initSofaData(),
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
    reassessment: {
      assessmentPoint: "initial",
      basePriorityScore: 1,
      baseSofaScore: 1,
      hour48Sofa: initSofaData(),
      hour48SofaScore: 1,
      hour120Sofa: initSofaData(),
      hour120SofaScore: 1,
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
    setHour48Sofa(state, newSofa) {
      for (var key in newSofa)
        Vue.set(state.data.reassessment.hour48Sofa, key, +newSofa[key])
    },
    setHour120Sofa(state, newSofa) {
      for (var key in newSofa)
        Vue.set(state.data.reassessment.hour120Sofa, key, +newSofa[key])
    },
    setReassessmentInputs(state, newReassessment) {
      state.data.reassessment.assessmentPoint = newReassessment.assessmentPoint
      state.data.reassessment.basePriorityScore =
        newReassessment.basePriorityScore
      state.data.reassessment.baseSofaScore = newReassessment.baseSofaScore
      state.data.reassessment.hour48SofaScore = newReassessment.hour48SofaScore
    },
    reset(state) {
      state.data = resetData()
    },
  },
  getters: {
    initialPriorityScore: (state, getters) => {
      const ia = state.data.initialAssessment
      const functionalityScore = Math.max(ia.frailty, ia.ecog)

      var sofaPoints = getters.sofaPoints(ia.sofa)

      var priorityScoreResult = {
        age: ia.age,
        functionality: functionalityScore,
        sofa: getters.sofaScore(sofaPoints),
        comorbidities: getters.comorbidityScore(ia.comorbidities),
        sofaPoints: sofaPoints,
      }

      var pScore =
        priorityScoreResult.sofa +
        priorityScoreResult.comorbidities +
        priorityScoreResult.age +
        priorityScoreResult.functionality

      priorityScoreResult.score = pScore

      priorityScoreResult = getters.priorityScoreBucket(
        pScore,
        priorityScoreResult
      )

      return priorityScoreResult
    },
    priorityScoreBucket: () => (pScore, priorityScoreResult) => {
      if (pScore < 4) {
        priorityScoreResult.bucket = "red"
        priorityScoreResult.ventilator =
          "Highest priority for ventilator support."
        priorityScoreResult.prioritisation =
          "Receive priority over all other groups in face of scarce resources."
      } else if (pScore < 6) {
        priorityScoreResult.bucket = "orange"
        priorityScoreResult.ventilator =
          "Intermediate priority for ventilator support."
        priorityScoreResult.prioritisation =
          "Receive resources if available after all patients in red group allocated."
      } else if (pScore < 10) {
        priorityScoreResult.bucket = "yellow"
        priorityScoreResult.ventilator = "Low priority for ventilator support."
        priorityScoreResult.prioritisation =
          "Receive resources if available after all patients in red and orange groups allocated."
      } else {
        priorityScoreResult.bucket = "green"
        priorityScoreResult.ventilator =
          "Lowest priority for ventilator support."
        priorityScoreResult.prioritisation = "Palliation strongly suggested."
      }

      return priorityScoreResult
    },
    sofaScoreBucket: () => (sofaScore) => {
      var sofaScoreResult = {}

      if (sofaScore < 6) {
        sofaScoreResult.bucket = "red"
        sofaScoreResult.ventilator =
          "Highest priority for continued ICU support."
        sofaScoreResult.prioritisation =
          "Receive priority over all other groups in face of scarce resources."
      } else if (sofaScore < 9) {
        sofaScoreResult.bucket = "orange"
        sofaScoreResult.ventilator =
          "Intermediate priority for continued ICU support."
        sofaScoreResult.prioritisation =
          "Receive resources if available after all patients in red group allocated."
      } else if (sofaScore < 12) {
        sofaScoreResult.bucket = "yellow"
        sofaScoreResult.ventilator = "Low priority for continued ICU support."
        sofaScoreResult.prioritisation =
          "Receive resources if available after all patients in red and orange groups allocated."
      } else {
        sofaScoreResult.bucket = "green"
        sofaScoreResult.ventilator =
          "Lowest priority for continued ICU support."
        sofaScoreResult.prioritisation = "Palliation strongly suggested."
      }

      return sofaScoreResult
    },
    comorbidityScore: () => (comorbidities) => {
      var totalScore = 0
      for (var comorbidity in comorbidities)
        totalScore = Math.max(totalScore, +comorbidities[comorbidity])
      return totalScore
    },
    sofaScore: () => (sofaPoints) => {
      if (sofaPoints < 6) return 1
      else if (sofaPoints < 9) return 2
      else if (sofaPoints < 12) return 3
      else if (sofaPoints >= 12) return 4
      else throw new Error("Unrecognised sofa point total: " + sofaPoints)
    },
    sofaPoints: () => (sofa) => {
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
        +sofa.cardioMap,
        +sofa.cardioDop,
        +sofa.cardioEpi,
        +sofa.cardioDob
      )
      totalScore += cardiovascular

      // Use the highest of the renal scores
      totalScore += Math.max(sofa.renalCreat, sofa.renalUrine)

      totalScore += sofa.coagulation != null ? +sofa.coagulation : 0
      totalScore += sofa.liver != null ? +sofa.liver : 0
      totalScore += sofa.nervous != null ? +sofa.nervous : 0

      return +totalScore
    },
    initialSofaPoints(state, getters) {
      return getters.sofaPoints(state.data.initialAssessment.sofa)
    },
    hour48SofaPoints(state, getters) {
      return getters.sofaPoints(state.data.reassessment.hour48Sofa)
    },
    hour120SofaPoints(state, getters) {
      return getters.sofaPoints(state.data.reassessment.hour120Sofa)
    },
    reassessmentResult(state, getters) {
      const result = {
        assessmentPoint: state.data.reassessment.assessmentPoint,
        baseline: {
          debug: 0,
          priorityScore: -1,
          sofaScore: -1,
          sofaPoints: -1,
        },
        hour48: {
          debug: 0,
          priorityScore: -10,
          sofaScore: state.data.reassessment.hour48SofaScore,
          sofaPoints: getters.hour48SofaPoints,
        },
        hour120: {
          priorityScore: -1,
          sofaScore: -1,
          sofaPoints: getters.hour120SofaPoints,
        },
      }

      if (result.assessmentPoint === "initial") {
        result.baseline = getters.initialPriorityScore
        result.baseline.debug = 1
      } else {
        result.baseline = {
          priorityScore: state.data.reassessment.basePriorityScore,
          sofaScore: state.data.reassessment.baseSofaScore,
          sofaPoints: getters.initialSofaPoints,
        }
        result.baseline = getters.priorityScoreBucket(
          result.baseline.priorityScore,
          result.baseline
        )
        result.baseline.debug = 2
      }

      if (result.assessmentPoint === "hour48") {
        const sofaPoints = getters.sofaPoints(
          state.data.reassessment.hour48Sofa
        )
        result.hour48 = {
          priorityScore: -3,
          sofaPoints: sofaPoints,
          sofaScore: getters.sofaScoreBucket(sofaPoints),
        }
        result.hour48.debug = 4
      } else {
        result.hour48 = {
          priorityScore: -2,
          sofaPoints: state.data.reassessment.hour48SofaScore,
          sofaScore: getters.sofaScoreBucket(
            state.data.reassessment.hour48SofaScore
          ),
        }
        result.hour48.debug = 8
      }

      if (result.assessmentPoint === "hour120") {
        const sofaPoints = getters.sofaPoints(
          state.data.reassessment.hour120Sofa
        )
        result.hour120 = {
          priorityScore: -2,
          sofaPoints: sofaPoints,
          sofaScore: getters.sofaScoreBucket(sofaPoints),
        }
      } else {
        result.hour120 = {
          priorityScore: -1,
          sofaPoints: -1,
          sofaScore: -1,
        }
      }

      return result
    },
  },
})
