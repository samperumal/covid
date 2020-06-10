<template>
  <div class="columns">
    <div class="column">
      <section>
        <div class="title has-text-centered">Priority Assessment</div>
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
          </b-field>
        </b-field>
        <section v-if="assessmentPoint !== 'initial'">
          <div class="title has-text-centered">In-ICU re-assessment</div>
          <div v-if="false" class="block instructions">
            <p>
              Re-assess all patients admitted to ICU at 48 hours and at 120
              hours after admission.
            </p>
            <p>Reclassify the PRIORITY CATEGORY using:</p>
            <ol>
              <li>Baseline PRIORITY score and SOFA score at admission.</li>
              <li>SOFA after 48 hours.</li>
              <li>SOFA after 120 hours.</li>
            </ol>
            <p>Principles of re-assessment:</p>
            <ol>
              <li>
                Once a patient has been accepted into the ICU (guided by the
                PRIORITY CALCULATOR FOR ADMISSION above), progression IN-ICU is
                now monitored by using the initial SOFA score as baseline in
                relation to the follow-up SOFA scores (delta-SOFA). The SOFA
                score can
                <strong>STAY THE SAME</strong> (not ideal),
                <strong>IMPROVE</strong> (desired) or
                <strong>DETERIORATE</strong> (worst).
              </li>
              <li>
                After re-assessment (at 48 hours and 120 hours after admission)
                the patient can only stay in the
                <strong>SAME</strong> PRIORITY CATEGORY if the SOFA has
                <strong>IMPROVED</strong>.
              </li>
              <li>
                If the SOFA score stays
                <strong>THE SAME</strong> in a re-assessment, the patient must
                move to the next <strong>LOWER</strong> PRIORITY CATEGORY.
              </li>
              <li>
                If the SOFA
                <strong>IMPROVES</strong>, the patient can either stay in the
                <strong>SAME</strong> PRIORITY CATEGORY, or move into a
                <strong>HIGHER</strong> PRIORITY CATEGORY, depending on the
                amount of SOFA score improvement.
              </li>
            </ol>
          </div>
          <hr />
          <b-field label="Baseline Priority Score" horizontal>
            <b-input
              v-model="basePriorityScore"
              @input="updateStore"
              type="number"
              min="1"
            ></b-input>
          </b-field>
          <b-field label="Baseline SOFA Score" horizontal>
            <b-input
              v-model="baseSofaScore"
              @input="updateStore"
              type="number"
              min="1"
            ></b-input>
          </b-field>
          <b-field
            v-if="assessmentPoint === 'hour120'"
            label="48-hour SOFA Score"
            horizontal
          >
            <b-input
              v-model="hour48SofaScore"
              @input="updateStore"
              type="number"
              min="1"
            ></b-input>
          </b-field>
        </section>

        <hr />

        <sofa :storeMethod="sofaStoreMutation"></sofa>

        <hr />
      </section>
    </div>
    <div class="column">
      <section>
        <div class="block">
          <div class="title">Score Summary</div>
          <p>Baseline Sofa: {{ initialSofaPoints }}</p>
          <p>48-hour Sofa: {{ hour48SofaPoints }}</p>
          <p>120-hour Sofa: {{ hour120SofaPoints }}</p>
          <pre>{{ JSON.stringify(reassessmentResult, null, "  ") }}</pre>
        </div>

        <hr />

        <div
          v-if="false"
          class="box has-text-centered"
          :class="baselineResult.bucket"
        >
          <div class="bucket">{{ baselineResult.bucket }}</div>
          <div class="priority-score">
            Priority Score: {{ baselineResult.priorityScore }}
          </div>
          <div class="priority-score">
            Baseline Sofa Score: {{ baselineResult.sofaScore }}
          </div>
          <div class="ventilator">{{ baselineResult.ventilator }}</div>
          <div class="prioritisation">{{ baselineResult.prioritisation }}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Sofa from "./Sofa.vue"

export default {
  name: "Reassessment",
  data() {
    return {
      assessmentPoint: "hour48",
      basePriorityScore: 1,
      baseSofaScore: 1,
      hour48SofaScore: 1,
    }
  },
  computed: {
    ...mapGetters([
      "initialSofaPoints",
      "hour48SofaPoints",
      "hour120SofaPoints",
      "reassessmentResult",
    ]),
    sofaStoreMutation() {
      switch (this.assessmentPoint) {
        case "hour48":
          return "setHour48Sofa"
        case "hour120":
          return "setHour120Sofa"
        default:
          return "setInitialSofa"
      }
    },
    baselineResult() {
      return this.reassessmentResult.baseline
    },
    assessmentPointText() {
      switch (this.assessmentPoint) {
        case "hour48":
          return "In-ICU re-assessment of patient 48 hours after admission"
        case "hour120":
          return "In-ICU re-assessment of patient 120 hours after admission"
        default:
          return "Initial assessment of patient prior to ICU admission"
      }
    },
  },
  methods: {
    updateStore() {
      this.$store.commit("setReassessmentInputs", {
        assessmentPoint: this.assessmentPoint,
        basePriorityScore: +this.basePriorityScore,
        baseSofaScore: +this.baseSofaScore,
        hour48SofaScore: +this.hour48SofaScore,
      })
    },
  },
  mounted() {
    this.updateStore()
  },
  components: {
    Sofa,
  },
}
</script>
