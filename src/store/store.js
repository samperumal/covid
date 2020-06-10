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
      previousPriorityScore: 1,
      previousSofaPoints: 1,
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
      state.data.historic.previousPriorityScore = Math.max(
        1,
        newHistoric.previousPriorityScore
      )
      state.data.historic.previousSofaPoints = Math.max(
        1,
        newHistoric.previousSofaPoints
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

        currentAction: null,
        previousAction: null,

        scores: {
          age: 0,
          functionality: 0,
          comorbidity: 0,

          sofaPoints: 0,
          sofa: 1,

          priority: 1,

          previousPriority: 1,
          previousSofaPoints: 0,
        },
      }

      if (state.data.assessmentPoint == ENUMS.INITIAL) {
        result.assessmentPoint = state.data.assessmentPoint
        result.initial = true

        result.scores.age = state.data.scoring.age
        result.scores.functionality = Math.max(
          state.data.scoring.functionality.ecog,
          state.data.scoring.functionality.frailty
        )
        result.scores.sofaPoints = getters.sofaPoints
        result.scores.sofa = getters.sofaScore(result.scores.sofaPoints)
        result.scores.comorbidity = getters.comorbidityScore

        result.scores.priorityScore =
          result.scores.age +
          result.scores.functionality +
          result.scores.sofaPoints +
          result.scores.comorbidity

        result.currentAction = getters.priorityScoreBucket(
          result.scores.priorityScore
        )
      } else if (state.data.assessmentPoint == ENUMS.HOUR48) {
        result.assessmentPoint = state.data.assessmentPoint
        result.hour48 = true

        result.scores.previousPriorityScore =
          state.data.historic.previousPriorityScore
        result.scores.previousSofaPoints =
          state.data.historic.previousSofaPoints

        result.previousAction = getters.priorityScoreBucket(
          result.scores.previousPriorityScore
        )
        result.nextAction = getters.sofaPointsBucket(
          result.scores.previousSofaPoints
        )
      }

      return result
    },
    priorityScoreBucket: () => (pScore) => {
      const priorityScoreResult = {}

      if (pScore < 4) {
        priorityScoreResult.order = 1
        priorityScoreResult.bucket = "red"
        priorityScoreResult.ventilator =
          "Highest priority for ventilator support."
        priorityScoreResult.prioritisation =
          "Receive priority over all other groups in face of scarce resources."
      } else if (pScore < 7) {
        priorityScoreResult.order = 2
        priorityScoreResult.bucket = "orange"
        priorityScoreResult.ventilator =
          "Intermediate priority for ventilator support."
        priorityScoreResult.prioritisation =
          "Receive resources if available after all patients in red group allocated."
      } else if (pScore < 10) {
        priorityScoreResult.order = 3
        priorityScoreResult.bucket = "yellow"
        priorityScoreResult.ventilator = "Low priority for ventilator support."
        priorityScoreResult.prioritisation =
          "Receive resources if available after all patients in red and orange groups allocated."
      } else {
        priorityScoreResult.order = 4
        priorityScoreResult.bucket = "green"
        priorityScoreResult.ventilator =
          "Lowest priority for ventilator support."
        priorityScoreResult.prioritisation = "Palliation strongly suggested."
      }

      return priorityScoreResult
    },
    sofaPointsBucket: () => (sofaPoints) => {
      var sofaPointsResult = {}

      if (sofaPoints < 6) {
        sofaPointsResult.order = 1
        sofaPointsResult.bucket = "red"
        sofaPointsResult.ventilator =
          "Highest priority for continued ICU support."
        sofaPointsResult.prioritisation =
          "Receive priority over all other groups in face of scarce resources."
      } else if (sofaPoints < 9) {
        sofaPointsResult.order = 2
        sofaPointsResult.bucket = "orange"
        sofaPointsResult.ventilator =
          "Intermediate priority for continued ICU support."
        sofaPointsResult.prioritisation =
          "Receive resources if available after all patients in red group allocated."
      } else if (sofaPoints < 12) {
        sofaPointsResult.order = 3
        sofaPointsResult.bucket = "yellow"
        sofaPointsResult.ventilator = "Low priority for continued ICU support."
        sofaPointsResult.prioritisation =
          "Receive resources if available after all patients in red and orange groups allocated."
      } else {
        sofaPointsResult.order = 4
        sofaPointsResult.bucket = "green"
        sofaPointsResult.ventilator =
          "Lowest priority for continued ICU support."
        sofaPointsResult.prioritisation = "Palliation strongly suggested."
      }

      return sofaPointsResult
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
