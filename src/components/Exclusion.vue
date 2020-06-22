<template>
  <section class>
    <div class="title has-text-centered">Exclusion Check</div>
    <div class="subtitle has-text-centered">
      Exclusion criteria for admission to ICU
    </div>
    <div class="section">
      <ul>
        <li>
          Patient expressed wish not to be admitted to ICU / advance directive
        </li>
        <li>
          Clinical Frailty Scale ≥ 6
          <span
            class="icon has-text-info is-medium"
            @click="frailtyDetails = true"
          >
            <i class="mdi mdi-help-box mdi-24px"></i>
          </span>
        </li>
        <li>
          ECOG score of 4
          <span
            class="icon has-text-info is-medium"
            @click="ecogDetails = true"
          >
            <i class="mdi mdi-help-box mdi-24px"></i>
          </span>
        </li>
        <li>&lt; 6 months life-expectancy</li>
        <li>Unwitnessed cardiac arrest</li>
        <li>
          Severe and irreversible neurological injury (GCS &lt; 6: motor score
          &lt; 4)
        </li>
        <li>
          Irreversible age-specific hypotension unresponsive to fluid
          resuscitation and vasopressor therapy
        </li>
        <li>Severe baseline cognitive impairment (inability to perform ADL)</li>
        <li>
          Chronic respiratory disease with poor functional capacity – mMRC 4
        </li>
        <li>
          Cardiovascular disease - NYHA 4 or known poor ejection fraction on
          maximal medical therapy
        </li>
        <li>HIV/AIDS with an AIDS defining illness</li>
        <li>CD4 ≤100 and/or VL ≥10 000 c/ml</li>
        <li>Severe burns with high predicted mortality (ABSI ≥ 12)</li>
        <li>Liver cirrhosis - Child Pugh ≥7 or MELD ≥20</li>
        <li>Advanced untreatable neuromuscular disease</li>
        <li>Chronic kidney failure in patient not eligible for dialysis</li>
        <li>End stage organ failure and not a candidate for transplantation</li>
      </ul>
    </div>
    <div>
      <div class="title has-text-centered">
        Does the patient meet any of the above criteria?
      </div>
      <div class="has-text-centered container">
        <div class="field">
          <router-link
            to="/assessment"
            class="button level-item is-info is-large"
            >No, patient meets none of the criteria</router-link
          >
        </div>
        <div class="field">
          <router-link
            to="/management"
            class="button level-item is-danger is-large"
            >Yes, patient meets at least one of the criteria</router-link
          >
        </div>
      </div>
    </div>

    <b-modal
      :active.sync="ecogDetails"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <ecog-modal></ecog-modal>
    </b-modal>

    <b-modal
      :active.sync="frailtyDetails"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <frailty-modal></frailty-modal>
    </b-modal>
  </section>
</template>

<script>
import EcogModal from "./EcogModal.vue"
import FrailtyModal from "./FrailtyModal.vue"

export default {
  data() {
    return {
      ecogDetails: false,
      frailtyDetails: false,
    }
  },
  components: {
    EcogModal,
    FrailtyModal,
  },
}
</script>

<style scoped>
div.section {
  padding-top: 0.5rem;
}
li {
  list-style: disc;
  margin-bottom: 0.2em;
}

li span {
  cursor: pointer;
}
</style>
