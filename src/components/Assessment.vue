<template>
  <div class="columns">
    <div class="column">
      <assessment-point></assessment-point>
      <section v-if="assessmentResult.initial">
        <age-and-function></age-and-function>
        <hr />
        <sofa></sofa>
        <hr />
        <comorbidities></comorbidities>
        <hr />
      </section>
      <section class="section" v-if="assessmentResult.hour48">
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
    </div>
    <div class="column">
      <priority-summary v-if="assessmentResult.initial"></priority-summary>
      <section
        v-if="assessmentResult.hour48"
        style=""
        class="has-text-centered"
      >
        <div class="title">Assessment Result</div>
        <div class="title">&nbsp;</div>
        <div class="subtitle">Patient was in Priority Category:</div>

        <div class="box has-text-centered" :class="previousAction.bucket">
          <div class="bucket">{{ previousAction.bucket }}</div>
          <div class="ventilator">{{ previousAction.ventilator }}</div>
          <div class="prioritisation">{{ previousAction.prioritisation }}</div>
        </div>

        <div class="subtitle">
          Patient showed <strong>{{ assessmentResult.sofaText }}</strong> from
          <strong>{{ assessmentResult.scores.previousSofaPoints }}</strong> to
          <strong>{{ assessmentResult.scores.sofaPoints }}</strong
          >.
        </div>
        <div class="subtitle">
          Recommend Patient {{ assessmentResult.changeText }} Priority Category:
        </div>

        <div class="box has-text-centered" :class="nextAction.bucket">
          <div class="bucket">{{ nextAction.bucket }}</div>
          <div class="ventilator">{{ nextAction.ventilator }}</div>
          <div class="prioritisation">{{ nextAction.prioritisation }}</div>
        </div>
      </section>
    </div>
    <div class="column" v-if="false">
      <pre>{{ assessmentResult }}</pre>
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
