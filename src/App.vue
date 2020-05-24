<template>
  <div id="app">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <sofa v-on:sofa-changed="sofaChanged"></sofa>
        <hr />
        <section>
          <div class="title has-text-centered">Co-morbidities</div>
          <b-field 
            label="Alzheimer's or related dementia"
            :message="alzheimerHelpText"
          >
            <b-field>
              <b-radio-button v-model="alzheimer"
                native-value="0" expanded type="is-info"
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="alzheimer"
                native-value="2" expanded type="is-info"
              >
                <span>Moderate</span>
              </b-radio-button>
              
              <b-radio-button v-model="alzheimer"
                 native-value="4" expanded type="is-info"
              >
                <span>Severe</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="Heart failure"
            :message="heartHelpText"
          >
            <b-field>
              <b-radio-button v-model="heart"
                native-value="0" expanded type="is-info"
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="heart"
                native-value="2" expanded type="is-info"
              >
                <span>Class III</span>
              </b-radio-button>
              
              <b-radio-button v-model="heart"
                native-value="4" expanded type="is-info"
              >
                <span>Class IV</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="End-stage renal disease" :message="renalHelpText"
          >
            <b-field>
              <b-radio-button v-model="renalDisease"
                native-value="0" expanded type="is-info"
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="renalDisease"
                native-value="2" expanded type="is-info"
              >
                <span>Patients &leq; 75</span>
              </b-radio-button>
              
              <b-radio-button v-model="renalDisease"
                native-value="4" expanded type="is-info"
              >
                <span>Patients &gt; 75</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="Cancer" :message="cancerHelpText"
          >
            <b-field>
              <b-radio-button v-model="cancer"
                native-value="0" expanded type="is-info"
              >
                <span>N/A</span>
              </b-radio-button>

              <b-radio-button v-model="cancer"
                native-value="2" expanded type="is-info" 
              >
                <span>&lt;10 year survival</span>
              </b-radio-button>

              <b-radio-button v-model="cancer"
                native-value="4" expanded type="is-info" 
              >
                <span>Paliative only</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="Chronic lung disease" :message="lungHelpText"
          >
            <b-field>
              <b-radio-button v-model="lung"
                native-value="0" expanded type="is-info"
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="lung"
                native-value="2" expanded type="is-info"
              >
                <span>Moderate</span>
              </b-radio-button>
              
              <b-radio-button v-model="lung"
                native-value="4" expanded type="is-info"
              >
                <span>Severe, frailty</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="Liver cirrhosis" :message="cirrhosisHelpText"
          >
            <b-field>
              <b-radio-button v-model="cirrhosis"
                native-value="0" expanded type="is-info"
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="cirrhosis"
                native-value="2" expanded type="is-info"
              >
                <span>Decompensation</span>
              </b-radio-button>
              
              <b-radio-button v-model="cirrhosis"
                native-value="4" expanded type="is-info"
              >
                <span>MELD ≥ 20</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field label="Other conditions"></b-field>
          <b-field>
              <b-checkbox-button v-model="otherConditions"
                native-value="CAD" expanded type="is-info"
              >
                <span>Severe multi-vessel CAD</span>
              </b-checkbox-button>
            </b-field>
            <b-field
              :message="aidsHelpText"
            >
              <b-checkbox-button v-model="otherConditions"
                native-value="AIDS" expanded type="is-info"
              >
                <span>AIDS defining illness</span>
              </b-checkbox-button>
          </b-field>
          <div class="has-text-centered priority-score">Co-Morbidity Score: {{ morbidityScore }}</div>
        </section>
        <hr />
        <section>
          <div class="box has-text-centered" :class="priorityScore.bucket">
            <div class="bucket">{{ priorityScore.bucket}}</div>
            <div class="priority-score">Priority Score: {{ priorityScore.score }}</div>
            <div class="ventilator">{{ priorityScore.ventilator }}</div>
            <div class="prioritisation">{{ priorityScore.prioritisation }}</div>
          </div>
        </section>
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

export default Vue.extend({
  data: function() {
    const data = {
      sofaScore: null,
      alzheimer: "0",
      cancer: "0",
      heart: "0",
      lung: "0",
      renalDisease: "0",
      cirrhosis: "0",
      otherConditions: [],

    }

    return data;
  },
  components: {
    Sofa
  },
  props: {},
  watch: {},
  mounted: function() {},
  methods: {
    bracketScore(score) {
      if (score != null)
        return ` (${score})`
      else return ""
    },
    sofaChanged(newSofaScore) {
      this.sofaScore = newSofaScore
      console.log(this.sofaScore)
    }
  },
  computed: {
    morbidityScore() {
      return Math.max(
        this.alzheimer,
        this.cancer,
        this.heart,
        this.lung,
        this.renalDisease,
        this.cirrhosis,
        this.otherConditions.length > 0 ? 4 : 0
      )
    },
    priorityScore() {
      var sofaPts = 0
      if (this.sofaScore < 6) sofaPts = 1
      else if (this.sofaScore < 9) sofaPts = 2
      else if (this.sofaScore < 12) sofaPts = 3
      else if (this.sofaScore >= 12) sofaPts = 4

      var pScore = sofaPts + this.morbidityScore      
      
      if (pScore < 4)
        return { 
          score: pScore,
          bucket: "red",
          ventilator: "Highest priority for ventilator",
          prioritisation: "Receive priority over all other groups in face of scarce resources."
        }
      else if (pScore < 6) 
        return {
          score: pScore,
          bucket: "orange",
          ventilator: "Intermediate priority for ventilator",
          prioritisation: "Receive resources if available after all patients in red group allocated."
        }
      else return {
        score: pScore,
        bucket: "yellow",
        ventilator: "Lowest priority for ventilator",
        prioritisation: "Receive resources if available after all patients in red and orange groups allocated."
      }
    },
    alzheimerHelpText() {
      if (this.alzheimer == "2")
        return "Moderate Alzheimer's disease or related dementia."
        
      if (this.alzheimer == "4")
        return "Severe Alzheimer's disease or related dementia."
      return null
    },
    renalHelpText() {
      if (this.renalDisease == "2")
        return "End-stage renal disease in patients younger than 75 years."
        
      if (this.renalDisease == "4")
        return "End-stage renal disease in patients older than 75 years."
      return null
    },
    lungHelpText() {
      if (this.lung == "2")
        return "Moderately severe chronic lung disease (e.g. COPD, IPF)."
        
      if (this.lung == "4")
        return "Severe chronic lung disease plus evidence of frailty."
      return null
    },
    cirrhosisHelpText() {
      if (this.cirrhosis == "2")
        return "Cirrhosis with history of decompensation."
        
      if (this.cirrhosis == "4")
        return "Cirrhosis with MELD score ≥ 20, ineligible for transplant."
      return null
    },
    heartHelpText() {
      if (this.heart == "2")
        return "New York Heart Association Class III heart failure."
        
      if (this.heart == "4")
        return "New York Heart Association Class IV heart failure, plus evidence of frailty."
      return null
    },
    cancerHelpText() {
      if (this.cancer == "2")
        return "Malignancy with a < 10 year expected survival."
      if (this.cancer == "4")
        return "Cancer being treated with only palliative interventions (incl. chemotherapy and radiation)."
      return null
    },
    aidsHelpText() {
      if (this.otherConditions.includes("AIDS"))
        return "AIDS defining illness, or viral load > 10,000 despite Rx."
      return null
    }
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
