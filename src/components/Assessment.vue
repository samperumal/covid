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
    </div>
    <div class="column" v-if="assessmentResult.initial">
      <priority-summary></priority-summary>
    </div>
    <div class="column">
      <pre style="position: fixed;">{{ assessmentResult }}</pre>
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
      basePriorityScore: 1,
      baseSofaScore: 1,
      hour48SofaScore: 1,
    }
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
