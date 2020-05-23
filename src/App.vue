<template>
  <div id="app">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <b-field label="Respiration">
          <b-field>
            <span class="control">
              <button class="button">FaO<sub class="subscript">2</sub><span>&nbsp;/&nbsp;</span>FiO<span class="subscript">2</span></button>
            </span>
            <b-select 
              v-model="respiration" expanded
              placeholder="Patient's respiratory function"
            >
              <option value="0">&geq; 400 kPa</option>
              <option value="1">300 kPa to 399 kPa</option>
              <option value="2">200 kPa to 299 kPa</option>
              <option value="3">100 kPa to 199 kPa (with respiratory support)</option>
              <option value="4">&le; 100 kPa (with respiratory support)</option>
            </b-select>
          </b-field>
        </b-field>
        <b-field label="Coagulation">
          <b-input v-model="coagulation">
          </b-input>
        </b-field>
        <b-field label="Liver">
          <b-input v-model="liver">
          </b-input>
        </b-field>
        <b-field label="Nervous">
          <b-input v-model="nervous">
          </b-input>
        </b-field>
        <b-field label="Renal">
          <b-input v-model="renal">
          </b-input>
        </b-field>
        <div>
          Score: {{ respiration }} (Respiration) + {{ coagulationScore }} (Coagulation) + {{ liverScore }} (Liver) + {{ nervousScore }} (Nervous) + {{ renalScore }} (Renal)
        </div>
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
      nervous: null,
      renal: null
    }

    return data
  },
  components: {
    
  },
  props: {},
  watch: {
    
  },
  mounted: function() {
    
  },
  methods: {
    
  },
  computed: {    
    respirationScore() {
      if (this.respiration < 13.3)
        return 4
      else if (this.respiration < 26.7)
        return 3
      else if (this.respiration < 40)
        return 2
      else if (this.respiration < 53.3)
        return 1
      return 0
    },
    coagulationScore() {
      if (this.coagulation < 20)
        return 4
      else if (this.coagulation < 50)
        return 3
      else if (this.coagulation < 100)
        return 2
      else if (this.coagulation < 150)
        return 1
      return 0
    },
    liverScore() {
      if (this.liver >= 204)
        return 4
      else if (this.liver >= 102)
        return 3
      else if (this.liver >= 33)
        return 2
      else if (this.liver >= 20)
        return 1
      return 0
    },
    nervousScore() {
      if (this.nervous < 6)
        return 4
      else if (this.nervous <= 9)
        return 3
      else if (this.nervous <= 12)
        return 2
      else if (this.nervous <= 14)
        return 1
      return 0
    },
    renalScore() {
      if (this.renal >= 440)
        return 4
      else if (this.renal >= 300)
        return 3
      else if (this.renal >= 171)
        return 2
      else if (this.renal >= 110)
        return 1
      return 0
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
</style>
