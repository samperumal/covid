<template>
  <div class="columns">
    <div class="column">
      <section>
        <div class="title has-text-centered">Assessment</div>
        <b-field :message="assessmentPointText">
          <b-field expanded>
            <b-radio-button
              v-model="assessmentPoint"
              @input="updateStore"
              native-value="initial"
              type="is-info"
              expanded
            >
              <span>Initial</span>
            </b-radio-button>

            <b-radio-button
              v-model="assessmentPoint"
              @input="updateStore"
              native-value="hour48"
              type="is-info"
              expanded
            >
              <span>48-hour</span>
            </b-radio-button>

            <b-radio-button
              v-model="assessmentPoint"
              @input="updateStore"
              native-value="hour120"
              type="is-info"
              expanded
            >
              <span>120-hour</span>
            </b-radio-button>

            <b-radio-button
              v-model="assessmentPoint"
              @input="updateStore"
              native-value="recurring"
              type="is-info"
              expanded
            >
              <span>Recurring 24-hour</span>
            </b-radio-button>
          </b-field>
        </b-field>
      </section>
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
import * as ENUMS from "../enums"

import { mapState, mapGetters } from "vuex"

import Sofa from "./Sofa.vue"
import AgeAndFunction from "./AgeAndFunction.vue"
import Comorbidities from "./Comorbidities.vue"
import PrioritySummary from "./PrioritySummary.vue"

export default {
  data() {
    return {
      assessmentPoint: ENUMS.INITIAL,
      basePriorityScore: 1,
      baseSofaScore: 1,
      hour48SofaScore: 1,
    }
  },
  computed: {
    ...mapState([]),
    ...mapGetters(["assessmentResult"]),
    assessmentPointText() {
      switch (this.assessmentPoint) {
        case ENUMS.HOUR48:
          return "In-ICU re-assessment of patient 48 hours after admission"
        case ENUMS.HOUR120:
          return "In-ICU re-assessment of patient 120 hours after admission"
        case ENUMS.INITIAL:
          return "Initial assessment of patient prior to ICU admission"
        case ENUMS.RECURRING:
          return "Recurring assessment of patient in ICU at 24-hour intervals"
        default:
          throw new Error()
      }
    },
  },
  methods: {
    updateStore() {
      this.$store.commit("setAssessmentPoint", this.assessmentPoint)
    },
  },
  mounted() {
    this.updateStore()
  },
  components: {
    Sofa,
    AgeAndFunction,
    Comorbidities,
    PrioritySummary,
  },
}
</script>
