<template>
  <div id="app">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <sofa v-on:sofa-changed="sofaChanged"></sofa>
        <hr />
        <comorbidities v-on:morbidity-score-changed="morbidityScoreChanged"></comorbidities>
        <hr />
        <priority-summary :sofaScore="sofaScore" :morbidityScore="morbidityScore"></priority-summary>
        <hr />
        <section class="has-text-centered is-size-7">
          <div><strong>References</strong></div>
          <div class="reference">
          <div>[1] THE SOUTH AFRICAN MEDICAL ASSOCIATION</div>
          <div>SARS-CoV-2 (COVID-19)</div> 
          <div>Guidance for Managing Ethical Issues</div>
          <div>
            <a href="https://www.saheart.org/cms/attachment/163">https://www.saheart.org/cms/attachment/163</a>
          </div>
          </div>
          <div class="reference">
            [2] Subbe, Christian Peter & Burford, Caroline & Le Jeune, Ivan & Masterton-Smith, Charlotte & Ward, David. (2015). Relationship between input and output in acute medicine - Secondary analysis of the Society for Acute Medicine's benchmarking audit 2013 (SAMBA '13). Clinical medicine (London, England). 15. 15-9. 10.7861/clinmedicine.15-1-15. 
          </div>
        </section>
        <hr />
        <section class="has-text-centered is-size-7"  style="font-size: 0.85em;">
          Developed by Sameshan Perumal
          <a href="https://datacartographer.com">https://datacartographer.com</a>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import Sofa from "./components/Sofa.vue"
import Comorbidities from "./components/Comorbidities.vue"
import PrioritySummary from "./components/PrioritySummary.vue"

export default Vue.extend({
  data: function() {
    const data = {
      sofaScore: null,
      morbidityScore: null
    }

    return data
  },
  components: {
    Sofa,
    Comorbidities,
    PrioritySummary
  },
  methods: {
    bracketScore(score) {
      if (score != null)
        return ` (${score})`
      else return ""
    },
    sofaChanged(newSofaScore) {
      this.sofaScore = newSofaScore
    },
    morbidityScoreChanged(newMorbidityScore) {
      this.morbidityScore = newMorbidityScore
    }
  },
  computed: {
  }
});
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// @import "./styles/styles.scss";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  margin: 1em;
}

.subscript {
  position: relative;
  top: +0.5em;
  font-size: 80%;
}

.superscript {
  position: relative;
  top: -0.5em;
  font-size: 80%;
}

.bucket {
  font-size: 1.5em;
  text-transform: uppercase;
  margin-bottom: 1em;
  font-weight: bolder;
}

.priority-score {
  font-size: larger;
  font-weight: bold;
  margin-bottom: 1em;
}

.ventilator {
  font-size: large;
  margin-bottom: 1em;
}

.red {
  background-color: darkred;
  color: white;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: #fff455;
}

.title {
  color: #3273dc;
}

.label {
  color: #4f7ec7;
  font-variant: small-caps;
}

.reference {
  margin-top: 1em;
}
</style>
