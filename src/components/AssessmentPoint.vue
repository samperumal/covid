<template>
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
</template>

<script>
import * as ENUMS from "../enums"

export default {
  data() {
    return {
      assessmentPoint: ENUMS.HOUR48,
    }
  },
  methods: {
    updateStore() {
      this.$store.commit("setAssessmentPoint", this.assessmentPoint)
    },
  },
  computed: {
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
  mounted() {
    this.updateStore()
  },
}
</script>
