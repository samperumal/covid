import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import * as ENUMS from "../enums"

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

function initComorbidityData() {
  return {
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
  }
}

function resetData() {
  return {
    assessmentPoint: ENUMS.INITIAL,
    scoring: {
      age: 0,
      functionality: {
        ecog: 0,
        frailty: 0,
      },
      sofa: initSofaData(),
      comorbidities: initComorbidityData(),
    },
    historic: {
      baselinePriorityScore: 1,
      baselineSofaScore: 1,
      hour48SofaScore: 1,
      prevSofaScore: 1,
    },
  }
}

export const store = new Vuex.Store({
  state: {
    data: resetData(),
  },
  mutations: {
    setAgeAndFunction(state, newFrailty) {
      state.data.scoring.age = +newFrailty.age
      state.data.scoring.functionality.ecog = +newFrailty.ecog
      state.data.scoring.functionality.frailty = +newFrailty.frailty
    },
    setComorbidities(state, newComorbidities) {
      for (var key in newComorbidities)
        Vue.set(state.data.scoring.comorbidities, key, +newComorbidities[key])
    },
    setSofa(state, newSofa) {
      for (var key in newSofa)
        Vue.set(state.data.scoring.sofa, key, +newSofa[key])
    },
    setAssessmentPoint(state, newAssessmentPoint) {
      switch (newAssessmentPoint) {
        case ENUMS.INITIAL:
        case ENUMS.HOUR48:
        case ENUMS.HOUR120:
        case ENUMS.RECURRING:
          state.data.assessmentPoint = newAssessmentPoint
          break

        default:
          throw new Error("Unknown assessment point")
      }
    },
    setHistoric(state, newHistoric) {
      state.data.historic.baselinePriorityScore = Math.max(
        1,
        newHistoric.baselinePriorityScore
      )
      state.data.historic.baselineSofaScore = Math.max(
        1,
        newHistoric.baselineSofaScore
      )
      state.data.historic.hour48SofaScore = Math.max(
        1,
        newHistoric.hour48SofaScore
      )
      state.data.historic.prevSofaScore = Math.max(1, newHistoric.prevSofaScore)
    },
    reset(state) {
      state.data = resetData()
    },
  },
  getters: {
    assessmentResult(state, getters) {
      const result = {
        assessmentPoint: null,
        initial: false,
        hour48: false,
        hour120: false,
        recurring: false,

        ageScore: 0,
        functionalityScore: 0,
        sofaPoints: 1,
        comorbidityScore: 0,

        priorityScore: 0,
      }

      if (state.data.assessmentPoint == ENUMS.INITIAL) {
        result.assessmentPoint = state.data.assessmentPoint
        result.initial = true

        result.ageScore = state.data.scoring.age
        result.functionalityScore = Math.max(
          state.data.scoring.functionality.ecog,
          state.data.scoring.functionality.frailty
        )
        result.sofaPoints = getters.sofaPoints
        result.comorbidityScore = getters.comorbidityScore

        result.priorityScore =
          result.ageScore +
          result.functionalityScore +
          result.sofaPoints +
          result.comorbidityScore

        //result.currentAction = getters.priorityScoreBucket(result.priorityScore)
      }

      return result
    },
    priorityScoreBucket: () => (pScore) => {
      const priorityScoreResult = {}

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
    comorbidityScore(state) {
      var totalScore = 0
      for (var comorbidity in state.data.scoring.comorbidities)
        totalScore = Math.max(
          totalScore,
          +state.data.scoring.comorbidities[comorbidity]
        )
      return totalScore
    },
    sofaScore: () => (sofaPoints) => {
      if (sofaPoints < 6) return 1
      else if (sofaPoints < 9) return 2
      else if (sofaPoints < 12) return 3
      else if (sofaPoints >= 12) return 4
      else throw new Error("Unrecognised sofa point total: " + sofaPoints)
    },
    sofaPoints(state) {
      const sofa = state.data.scoring.sofa
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
