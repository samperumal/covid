<template>
  <div id="app">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <section>
          <div class="title">Sequential Organ Failure Asessment Scoring</div>
          <div class="subtitle"> (Sepsis-related)</div>
          <b-field :label="'Respiration' + bracketScore(respiration)"></b-field>
          <b-field>
            <span class="control">
              <p class="button">
                PaO<sub class="subscript">2</sub>
              </p>
            </span>
            <b-input
              v-model="respPaO2"
              expanded type="number"
              placeholder="Enter a value..."
            >
            </b-input>
            <span class="control">
              <p class="button">kPa</p>
            </span>
          </b-field>
          <b-field>
            <span class="control">
              <p class="button">FiO
                <span class="subscript">2</span>
              </p>
            </span>
            <b-input
              v-model="respFiO2"
              expanded type="number"
              placeholder="Enter a value..."
            >
            </b-input>
            <span class="control">
              <p class="button">%</p>
            </span>
          </b-field>
          <b-field>
            <span class="control">
              <p class="button">
                PaO<span class="subscript">2</span>
                <span>&nbsp;/&nbsp;</span>
                FiO<span class="subscript">2</span>
                <span>&nbsp;=&nbsp;{{ respFrac }}</span>
              </p>
            </span>
          </b-field>
          <b-field :label="'Coagulation' + bracketScore(coagulation)">
            <b-field>
              <span class="control">
                <p class="button">Platelets</p>
              </span>
              <b-select v-model="coagulation" expanded placeholder="Select a value...">
                <option value="0">&geq; 150</option>
                <option value="1">100 to 150</option>
                <option value="2">50 to 99</option>
                <option value="3">20 to 49</option>
                <option value="4">&le; 20</option>
              </b-select>
              <span class="control">
                <p class="button">
                  &times;10
                  <span class="superscript">3</span>&nbsp;/ &mu;L
                </p>
              </span>
            </b-field>
          </b-field>
          <b-field :label="'Liver' + bracketScore(liver)">
            <b-field>
              <span class="control">
                <p class="button">Bilirubin</p>
              </span>
              <b-select class="is-primary" v-model="liver" expanded placeholder="Select a value...">
                <option value="0">&lt; 20</option>
                <option value="1">20 to 32</option>
                <option value="2">33 to 101</option>
                <option value="3">102 to 204</option>
                <option value="4">&gt; 204</option>
              </b-select>
              <span class="control">
                <p class="button">&mu;mol/L</p>
              </span>
            </b-field>
          </b-field>
          <b-field :label="'Cardiovascular' + bracketScore(cardio)"></b-field>
          <b-field>
            <span class="control">
              <p class="button">MAP</p>
            </span>
            <b-select class="is-primary" v-model="cardioMap" expanded placeholder="Select a value...">
              <option value="0">&geq; 70</option>
              <option value="1">&lt; 70</option>
            </b-select>
            <span class="control">
              <p class="button">mm Hg</p>
            </span>
          </b-field>
          <b-field>
            <span class="control">
              <p class="button">Dopamine</p>
            </span>
            <b-select class="is-primary" v-model="cardioDop" expanded placeholder="Select a value...">
              <option value="2">&lt; 5</option>
              <option value="3">5.1 to 15</option>
              <option value="4">&gt; 15</option>
            </b-select>
            <span class="control">
              <p class="button">&mu;g/kg/min</p>
            </span>
          </b-field>
          <b-field>
            <span class="control">
              <p class="button">Adrenaline</p>
            </span>
            <b-select class="is-primary" v-model="cardioEpi" expanded placeholder="Select a value...">
              <option :value="null">N/A</option>
              <option value="3">&leq; 0.1</option>
              <option value="4">&gt; 0.1</option>
            </b-select>
            <span class="control">
              <p class="button">&mu;g/kg/min</p>
            </span>
          </b-field>
          <b-field>
            <span class="control">
              <p class="button">Dobutamine</p>
            </span>
            <b-select class="is-primary" v-model="cardioDob" expanded placeholder="Select a value...">
              <option selected value="0">Not administered</option>
              <option value="2">Any dose</option>
            </b-select>
          </b-field>
          <b-field
            :label="'Nervous' + bracketScore(nervous)"
            title="Glasgow Coma Scale scores range from 3-15; higher score indicates better neurological function."
          >
            <b-field>
              <span class="control">
                <p class="button">Glasgow Coma Scale score</p>
              </span>
              <b-select class="is-primary" v-model="nervous" expanded placeholder="Select a value...">
                <option value="0">15</option>
                <option value="1">13 to 14</option>
                <option value="2">10 to 12</option>
                <option value="3">6 to 9</option>
                <option value="4">&lt; 6</option>
              </b-select>
            </b-field>
          </b-field>
          <b-field :label="'Renal' + bracketScore(renal)"></b-field>
          <b-field>
            <span class="control">
              <p class="button">Creatinine</p>
            </span>
            <b-select class="is-primary" v-model="renalCreat" expanded placeholder="Select a value...">
              <option value="0">&lt; 110</option>
              <option value="1">110 to 170</option>
              <option value="2">171 to 299</option>
              <option value="3">300 to 440</option>
              <option value="4">&gt; 440</option>
            </b-select>
            <span class="control">
              <p class="button">&mu;mol/L</p>
            </span>
          </b-field>
          <b-field>
            <span class="control">
              <p class="button">Urine output</p>
            </span>
            <b-select class="is-primary" v-model="renalUrine" expanded placeholder="Select a value...">
              <option value="0">&geq; 500</option>
              <option value="3">200 to 500</option>
              <option value="4">&lt; 200</option>
            </b-select>
            <span class="control">
              <p class="button">mL/day</p>
            </span>
          </b-field>
          <div>Score: {{ score }}</div>
        </section>
        <hr />
        <section>
          <div class="title">Co-morbidities</div>
          <b-field 
            label="Alzheimer's or related dementia"
          >
            <b-field>
              <b-radio-button v-model="alzheimer"
                native-value="0" expanded
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="alzheimer"
                native-value="1" expanded
              >
                <span>Moderate</span>
              </b-radio-button>
              
              <b-radio-button v-model="alzheimer"
                 native-value="2" expanded
              >
                <span>Severe</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="Cancer"
          >
            <b-field>
              <b-radio-button v-model="cancer"
                native-value="0" expanded
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="cancer"
                native-value="1" expanded
              >
                <span>Malignancy &lt; 10 year survival </span>
              </b-radio-button>
              
              <b-radio-button v-model="cancer"
                native-value="2" expanded
              >
                <span>Paliative only</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="New York Heart Association heart failure"
          >
            <b-field>
              <b-radio-button v-model="heart"
                native-value="0" expanded
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="heart"
                native-value="1" expanded
              >
                <span>Class III</span>
              </b-radio-button>
              
              <b-radio-button v-model="cancer"
                native-value="2" expanded
              >
                <span>Class IV</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="Chronic lung disease (e.g. COPD, IPF)"
          >
            <b-field>
              <b-radio-button v-model="lung"
                native-value="0" expanded
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="lung"
                native-value="1" expanded
              >
                <span>Moderately severe</span>
              </b-radio-button>
              
              <b-radio-button v-model="lung"
                native-value="2" expanded
              >
                <span>Severe, evidence of frailty</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="End-stage renal disease"
          >
            <b-field>
              <b-radio-button v-model="renalDisease"
                native-value="0" expanded
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="renalDisease"
                native-value="1" expanded
              >
                <span>Patients &leq; 75</span>
              </b-radio-button>
              
              <b-radio-button v-model="renalDisease"
                native-value="2" expanded
              >
                <span>Patients &gt; 75</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field 
            label="Liver cirrhosis"
          >
            <b-field>
              <b-radio-button v-model="cirrhosis"
                native-value="0" expanded
              >
                <span>N/A</span>
              </b-radio-button>
              
              <b-radio-button v-model="cirrhosis"
                native-value="1" expanded
              >
                <span>Decompensation history</span>
              </b-radio-button>
              
              <b-radio-button v-model="cirrhosis"
                native-value="2" expanded
              >
                <span>Meld >= 20, no transplant</span>
              </b-radio-button>
            </b-field>
          </b-field>
          <b-field label="Other conditions">
            <b-field>
              <b-checkbox-button v-model="otherConditions"
                native-value="CAD"
              >
                <span>Severe multi-vessel CAD</span>
              </b-checkbox-button>

              <b-checkbox-button v-model="otherConditions"
                native-value="AIDS"
              >
                <span>AIDS defining illness</span>
              </b-checkbox-button>
            </b-field>
          </b-field>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default Vue.extend({
  data: function() {
    const data = {
      respPaO2: null,
      respFiO2: null,
      coagulation: null,
      liver: null,
      cardiovascular: null,
      cardioMap: null,
      cardioDop: null,
      cardioEpi: null,
      cardioDob: "0",
      nervous: null,
      renalCreat: null,
      renalUrine: null,
      alzheimer: "0",
      cancer: "0",
      heart: "0",
      lung: "0",
      renalDisease: "0",
      cirrhosis: "0",
      otherConditions: [],
      
    };

    return data;
  },
  components: {},
  props: {},
  watch: {},
  mounted: function() {},
  methods: {
    bracketScore(score) {
      if (score != null)
        return ` (${score})`
      else return ""
    }
  },
  computed: {
    score() {
      var totalScore = 0;
      totalScore += this.respiration != null ? +this.respiration : 0;
      totalScore += this.coagulation != null ? +this.coagulation : 0;
      totalScore += this.liver != null ? +this.liver : 0;
      totalScore += this.cardio != null ? +this.cardio : 0;
      totalScore += this.nervous != null ? +this.nervous : 0;
      totalScore += this.renal != null ? +this.renal : 0;

      return totalScore;
    },
    respFrac() {
      if (this.respPaO2 != null && this.respFiO2 != null)
        return Math.round(+this.respPaO2 / (+this.respFiO2 / 100) * 100) / 100
      else return null
    },
    respiration() {
      if (this.respFrac == null) return null

      if (this.respFrac < 13.3) return 4
      if (this.respFrac < 26.7) return 3
      if (this.respFrac < 40) return 2
      if (this.respFrac < 53.3) return 1
      return 0
    },
    cardio() {
      if (this.cardioMap != null || 
          this.cardioDop != null ||
          this.cardioEpi != null ||
          this.cardioDob
      )
        return Math.max(
          this.cardioMap,
          this.cardioDop,
          this.cardioEpi,
          this.cardioDob
        )
      else return null
    },
    renal() {
      if (this.renalCreat != null || this.renalUrine != null)
        return Math.max(this.renalCreat, this.renalUrine)
      else return null
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
</style>
