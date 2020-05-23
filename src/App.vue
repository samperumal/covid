<template>
  <div id="app">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <b-field :label="'Respiration' + (this.respiration != null ? ` (${this.respiration})` : '')">
          <b-field>
            <span class="control">
              <button class="button">
                FaO
                <sub class="subscript">2</sub>
                <span>&nbsp;/&nbsp;</span>FiO
                <span class="subscript">2</span>
              </button>
            </span>
            <b-select
              v-model="respiration"
              expanded
              type="is-primary"
              placeholder="Select a value..."
            >
              <option value="0">&geq; 400</option>
              <option value="1">300 to 399</option>
              <option value="2">200 to 299</option>
              <option value="3">100 to 199 (with respiratory support)</option>
              <option value="4">&le; 100 (with respiratory support)</option>
            </b-select>
            <span class="control">
              <button class="button">kPa</button>
            </span>
          </b-field>
        </b-field>
        <b-field label="Coagulation">
          <b-field>
            <span class="control">
              <button class="button">Platelets</button>
            </span>
            <b-select v-model="coagulation" expanded placeholder="Select a value...">
              <option value="0">&geq; 150</option>
              <option value="1">100 to 150</option>
              <option value="2">50 to 99</option>
              <option value="3">20 to 49</option>
              <option value="4">&le; 20</option>
            </b-select>
            <span class="control">
              <button class="button">
                &times;10
                <span class="superscript">3</span>&nbsp;/ &mu;L
              </button>
            </span>
          </b-field>
        </b-field>
        <b-field label="Liver">
          <b-field>
            <span class="control">
              <button class="button">Bilirubin</button>
            </span>
            <b-select class="is-primary" v-model="liver" expanded placeholder="Select a value...">
              <option value="0">&lt; 20</option>
              <option value="1">20 to 32</option>
              <option value="2">33 to 101</option>
              <option value="3">102 to 204</option>
              <option value="4">&gt; 204</option>
            </b-select>
            <span class="control">
              <button class="button">&mu;mol/L</button>
            </span>
          </b-field>
        </b-field>
        <b-field label="Cardiovascular"></b-field>
        <b-field>
          <span class="control">
            <button class="button">MAP</button>
          </span>
          <b-select class="is-primary" v-model="cardioMap" expanded placeholder="Select a value...">
            <option value="0">&geq; 70</option>
            <option value="1">&lt; 70</option>
          </b-select>
          <span class="control">
            <button class="button">mm Hg</button>
          </span>
        </b-field>
        <b-field>
          <span class="control">
            <button class="button">Dopamine</button>
          </span>
          <b-select class="is-primary" v-model="cardioDop" expanded placeholder="Select a value...">
            <option value="2">&lt; 5</option>
            <option value="3">5.1 to 15</option>
            <option value="4">&gt; 15</option>
          </b-select>
          <span class="control">
            <button class="button">&mu;g/kg/min</button>
          </span>
        </b-field>
        <b-field>
          <span class="control">
            <button class="button">Adrenaline</button>
          </span>
          <b-select class="is-primary" v-model="cardioEpi" expanded placeholder="Select a value...">
            <option :value="null">N/A</option>
            <option value="3">&leq; 0.1</option>
            <option value="4">&gt; 0.1</option>
          </b-select>
          <span class="control">
            <button class="button">&mu;g/kg/min</button>
          </span>
        </b-field>
        <b-field>
          <span class="control">
            <button class="button">Dobutamine</button>
          </span>
          <b-select class="is-primary" v-model="cardioDob" expanded placeholder="Select a value...">
            <option selected value="0">Not administered</option>
            <option value="2">Any dose</option>
          </b-select>
        </b-field>
        <b-field
          label="Nervous"
          title="Glasgow Coma Scale scores range from 3-15; higher score indicates better neurological function."
        >
          <b-field>
            <span class="control">
              <button class="button">Glasgox Coma Scale score</button>
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
        <b-field label="Renal"></b-field>
        <b-field>
          <span class="control">
            <button class="button">Creatinine</button>
          </span>
          <b-select class="is-primary" v-model="renalCreat" expanded placeholder="Select a value...">
            <option value="0">&lt; 110</option>
            <option value="1">110 to 170</option>
            <option value="2">171 to 299</option>
            <option value="3">300 to 440</option>
            <option value="4">&gt; 440</option>
          </b-select>
          <span class="control">
            <button class="button">&mu;mol/L</button>
          </span>
        </b-field>
        <b-field>
          <span class="control">
            <button class="button">Urine output</button>
          </span>
          <b-select class="is-primary" v-model="renalUrine" expanded placeholder="Select a value...">
            <option value="0">&geq; 500</option>
            <option value="3">200 to 500</option>
            <option value="4">&lt; 200</option>
          </b-select>
          <span class="control">
            <button class="button">mL/day</button>
          </span>
        </b-field>
        <div>Score {{ score }}: {{ respiration }} (Respiration) + {{ coagulation }} (Coagulation) + {{ liver }} (Liver) + {{ cardio }} (Cardiovascular) + {{ nervous }} (Nervous) + {{ renalScore }} (Renal)</div>
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
      respiration: null,
      coagulation: null,
      liver: null,
      cardiovascular: null,
      cardioMap: null,
      cardioDop: null,
      cardioEpi: null,
      cardioDob: 0,
      nervous: null,
      renalCreat: null,
      renalUrine: null
    };

    return data;
  },
  components: {},
  props: {},
  watch: {},
  mounted: function() {},
  methods: {},
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
    cardio() {
      return Math.max(
        this.cardioMap,
        this.cardioDop,
        this.cardioEpi,
        this.cardioDob
      );
    },
    renal() {
      return Math.max(this.renalCreat, this.renalUrine)
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
