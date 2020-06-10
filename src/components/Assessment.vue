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
      </section>
    </div>
    <div class="column" v-if="assessmentResult.initial">
      <priority-summary></priority-summary>
    </div>
    <div class="column" v-if="true">
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
