<template>
  <div class="columns">
    <div class="column">
      <assessment-point></assessment-point>
      <hr />
      <section v-if="assessmentResult.initial">
        <age-and-function></age-and-function>
        <hr />
        <sofa></sofa>
        <hr />
        <comorbidities></comorbidities>
        <hr />
      </section>
      <section class v-if="assessmentResult.hour48">
        <div class="title has-text-centered">Previous Assessment Scores</div>
        <b-field
          label="Baseline Priority Score"
          message="Priority score calculated at initial admission"
        >
          <b-input
            v-model="baselinePriorityScore"
            @input="updateStore"
            type="number"
            min="1"
            max="100"
          ></b-input>
        </b-field>
        <b-field
          label="Baseline SOFA Points"
          message="Total SOFA points calculated at initial admission"
        >
          <b-input
            v-model="baselineSofaPoints"
            @input="updateStore"
            type="number"
            min="1"
            max="100"
          ></b-input>
        </b-field>
        <hr />
        <sofa></sofa>
        <hr />
      </section>

      <section class v-if="assessmentResult.hour120">
        <div class="title has-text-centered">Previous Assessment Score</div>
        <b-field
          label="Previous SOFA Points"
          message="Total SOFA points calculated at previous assessment"
        >
          <b-input
            v-model="baselineSofaPoints"
            @input="updateStore"
            type="number"
            min="1"
            max="100"
          ></b-input>
        </b-field>
        <hr />
        <sofa></sofa>
        <hr />
      </section>

      <section class="section has-text-centered">
        <b-button @click="viewResult" class="button is-info is-large"
          >View assessment result</b-button
        >
      </section>
    </div>
    <div class="column" id="assessmentResult">
      <management-plan v-if="assessmentResult.excluded"> </management-plan>
      <priority-summary v-else-if="assessmentResult.initial"></priority-summary>
      <section
        v-else-if="assessmentResult.hour48"
        style
        class="has-text-centered"
      >
        <div class="title">Assessment Result</div>

        <reassessment-instructions></reassessment-instructions>

        <div class="subtitle">Patient was in Priority Category:</div>

        <reassessment-category :action="previousAction"></reassessment-category>

        <div class="subtitle">
          Patient showed
          <strong>{{ assessmentResult.sofaText }}</strong> from
          <strong>{{ assessmentResult.scores.previousSofaPoints }}</strong> to
          <strong>{{ assessmentResult.scores.sofaPoints }}</strong
          >.
        </div>
        <div class="subtitle">
          Recommend Patient
          <strong>{{ assessmentResult.changeText }}</strong> Priority Category:
        </div>

        <reassessment-category :action="nextAction"></reassessment-category>
      </section>
      <section
        v-else-if="assessmentResult.hour120"
        style
        class="has-text-centered"
      >
        <div class="title">Assessment Result</div>

        <reassessment-instructions></reassessment-instructions>

        <div class="subtitle">Patient was in Priority Category:</div>

        <reassessment-category :action="previousAction"></reassessment-category>

        <div class="subtitle">
          Patient showed
          <strong>{{ assessmentResult.sofaText }}</strong> from
          <strong>{{ assessmentResult.scores.previousSofaPoints }}</strong> to
          <strong>{{ assessmentResult.scores.sofaPoints }}</strong
          >.
        </div>
        <div class="subtitle">
          Recommend Patient
          <strong>{{ assessmentResult.changeText }}</strong> Priority Category:
        </div>

        <reassessment-category :action="nextAction"></reassessment-category>
      </section>

      <section
        v-if="!assessmentResult.excluded"
        class="section has-text-centered"
      >
        <router-link to="assessment">
          <div class="button is-info is-large">Begin new Assessment</div>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import Sofa from "./Sofa.vue"
import AgeAndFunction from "./AgeAndFunction.vue"
import Comorbidities from "./Comorbidities.vue"
import PrioritySummary from "./PrioritySummary.vue"
import AssessmentPoint from "./AssessmentPoint.vue"
import ReassessmentInstructions from "./ReassessmentInstructions.vue"
import ReassessmentCategory from "./ReassessmentCategory.vue"
import ManagementPlan from "../components/ManagementPlan.vue"

export default {
  data() {
    return {
      baselinePriorityScore: 1,
      baselineSofaPoints: 1,
      hour48SofaScore: 1,
    }
  },
  methods: {
    updateStore() {
      this.$store.commit("setHistoric", {
        previousPriorityScore: this.baselinePriorityScore,
        previousSofaPoints: this.baselineSofaPoints,
      })
    },
    viewResult() {
      document.getElementById("assessmentResult").scrollIntoView()
    },
  },
  computed: {
    ...mapGetters(["assessmentResult"]),
    previousAction() {
      return this.assessmentResult.previousAction
    },
    nextAction() {
      return this.assessmentResult.nextAction
    },
  },
  components: {
    Sofa,
    AgeAndFunction,
    Comorbidities,
    PrioritySummary,
    AssessmentPoint,
    ReassessmentInstructions,
    ReassessmentCategory,
    ManagementPlan,
  },
}
</script>

<style>
pre {
  position: fixed;
  height: 40em;
  overflow: auto;
}
</style>
