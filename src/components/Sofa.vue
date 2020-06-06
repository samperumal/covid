<template>
  <section class="sofa">
    <div id="sofa-title" class="title has-text-centered">Sequential Organ Failure Assessment {{ bracketScore(sofaPoints) }}</div>
    <b-field :label="'Respiration' + bracketScore(respiration)"></b-field>
    <b-field type="is-danger" :message="respPaO2Value.msg">
      <b-field grouped>
        <p class="control">
          <span class="">
            PaO<sub class="subscript">2</sub>
          </span>
        </p>
        <b-input v-model="respPaO2" expanded placeholder="Enter a value..."></b-input>

        <p class="control">
          kPa
        </p>
      </b-field>
    </b-field>
    <b-field type="is-danger" :message="respFiO2Value.msg">
      <b-field grouped>
        <p class="control">
          <span class="">
            FiO<sub class="subscript">2</sub>
          </span>
        </p>
        <b-input v-model="respFiO2" expanded placeholder="Enter a value..."></b-input>
        <p class="control">
          %
        </p>
      </b-field>
    </b-field>
    <b-field class="has-text-centered" v-if="respFrac != null" grouped>
      <div class="control is-expanded has-text-centered">
        <span class="button">
          PaO
          <span class="subscript">2</span>
          <span>&nbsp;/&nbsp;</span>
          FiO
          <span class="subscript">2</span>
          <span>&nbsp;=&nbsp;{{ respFrac }} kPa</span>
        </span>
      </div>
    </b-field>
    <b-field :label="'Coagulation' + bracketScore(coagulation)">
      <b-field grouped>
        <p class="control">
          <span class="">Platelets</span>
        </p>
        <b-select v-model="coagulation" expanded placeholder="Select a value..." @input="updateStore">
          <option value="0">&geq; 150</option>
          <option value="1">149 to 100</option>
          <option value="2">99 to 50</option>
          <option value="3">49 to 20</option>
          <option value="4">&lt; 20</option>
          <option :value="null">N/A</option>
        </b-select>
        <p class="control">
            &times;10
            <span class="superscript">3</span>&nbsp;/ &mu;L
        </p>
      </b-field>
    </b-field>
    <b-field :label="'Liver' + bracketScore(liver)">
      <b-field grouped>
        <p class="control">
          <span class="">Bilirubin</span>
        </p>
        <b-select class="is-primary" v-model="liver" expanded placeholder="Select a value..." @input="updateStore">
          <option value="0">&lt; 20</option>
          <option value="1">20 to 32</option>
          <option value="2">33 to 101</option>
          <option value="3">102 to 204</option>
          <option value="4">&gt; 204</option>
          <option :value="null">N/A</option>
        </b-select>
        <p class="control">
          &mu;mol / L
        </p>
      </b-field>
    </b-field>
    <b-field :label="'Cardiovascular' + bracketScore(cardio)"></b-field>
    <b-field grouped>
      <p class="control">
        MAP
      </p>
      <b-select class="is-primary" v-model="cardioMap" expanded placeholder="Select a value..." @input="updateStore">
        <option value="0">&geq; 70</option>
        <option value="1">&lt; 70</option>
        <option :value="null">N/A</option>
      </b-select>
      <p class="control">
        mm Hg
      </p>
    </b-field>
    <b-field grouped>
      <p class="control">
        <span class="">Adrenaline</span>
      </p>
      <b-select class="is-primary" v-model="cardioEpi" expanded placeholder="Select a value..." @input="updateStore">
        <option value="3">&leq; 0.1</option>
        <option value="4">&gt; 0.1</option>
        <option :value="null">N/A</option>
      </b-select>
      <p class="control">
        &mu;g / kg / min
      </p>
    </b-field>
    <b-field grouped>
      <p class="control">
        <span class="">Dobutamine</span>
      </p>
      <b-select class="is-primary" v-model="cardioDob" expanded placeholder="Select a value..." @input="updateStore">
        <option selected value="0">Not administered</option>
        <option value="2">Any dose</option>
      </b-select>
      <p class="control"></p>
    </b-field>
    <b-field :label="'Renal' + bracketScore(renal)"></b-field>
    <b-field grouped>
      <p class="control">
        <span class="">Creatinine</span>
      </p>
      <b-select class="is-primary" v-model="renalCreat" expanded placeholder="Select a value..." @input="updateStore">
        <option value="0">&lt; 110</option>
        <option value="1">110 to 170</option>
        <option value="2">171 to 299</option>
        <option value="3">300 to 440</option>
        <option value="4">&gt; 440</option>
        <option :value="null">N/A</option>
      </b-select>
      <p class="control">
        &mu;mol / L
      </p>
    </b-field>
    <b-field grouped>
      <p class="control">
        <span class="">Urine output</span>
      </p>
      <b-select class="is-primary" v-model="renalUrine" expanded placeholder="Select a value..." @input="updateStore">
        <option value="0">&geq; 500</option>
        <option value="3">500 to 200</option>
        <option value="4">&lt; 200</option>
        <option :value="null">N/A</option>
      </b-select>
      <p class="control">
        mL / day
      </p>
    </b-field>
    <b-field
      :label="'Nervous' + bracketScore(nervous)"
      title="Glasgow Coma Scale scores range from 3-15; higher score indicates better neurological function."
       @input="updateStore"
    >
      <b-field grouped>
        <p class="control">
          <span class="">Glasgow Coma Scale score</span>
        </p>
        <b-select class="is-primary" v-model="nervous" expanded placeholder="Select a value..." @input="updateStore">
          <option value="0">15</option>
          <option value="1">14 to 13</option>
          <option value="2">12 to 10</option>
          <option value="3">9 to 6</option>
          <option value="4">&lt; 6</option>
          <option :value="null">N/A</option>
        </b-select>        
        <p class="control"></p>
      </b-field>
    </b-field>
  </section>
</template>

<script>
export default {
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
      renalUrine: null
    }

    return data
  },
  props: {
    storeMethod: String
  },
	methods: {
    bracketScore(score) {
      if (score != null && score != "0")
        return ` (${score})`
      else return ""
    },
		updateStore() {
      var data = {
        respPaO2: this.respPaO2,
        respFiO2: this.respFiO2,
        coagulation: this.coagulation,
        liver: this.liver,
        cardiovascular: this.cardiovascular,
        cardioMap: this.cardioMap,
        cardioDop: this.cardioDop,
        cardioEpi: this.cardioEpi,
        cardioDob: this.cardioDob,
        nervous: this.nervous,
        renalCreat: this.renalCreat,
        renalUrine: this.renalUrine,
      }
      this.$store.commit(this.storeMethod, data)
		}
	},
  computed: {
    sofaScore() {
      var totalScore = 0;

      totalScore += this.respiration != null ? +this.respiration : 0
      totalScore += this.coagulation != null ? +this.coagulation : 0
      totalScore += this.liver != null ? +this.liver : 0
      totalScore += this.cardio != null ? +this.cardio : 0
      totalScore += this.nervous != null ? +this.nervous : 0
      totalScore += this.renal != null ? +this.renal : 0
      
      return +totalScore
    },
    sofaPoints() {
      var pts = 0
      if (this.sofaScore < 6) pts =  1
      else if (this.sofaScore < 9) pts =  2
      else if (this.sofaScore < 12) pts =  3
      else if (this.sofaScore >= 12) pts =  4
			
			this.$emit("sofa-changed", +pts)

      return pts
    },
    respFrac() {
      if (this.respPaO2Value.valid && this.respFiO2Value.valid)
        return Math.round(+this.respPaO2 / (+this.respFiO2 / 100) * 100) / 100
      else return null
    },
    respPaO2Value() {
      const populated = this.respPaO2 != null && this.respPaO2.trim() != ""
      const valid = populated && (+this.respPaO2) > 0 && (+this.respPaO2) < 100
      const value = valid ? this.respPaO2 : 0
      var msg = (populated && !valid) ? "Enter a positive number" : ""
      return { populated, valid, value, msg }
    },
    respFiO2Value() {
      const populated = this.respFiO2 != null && this.respFiO2.trim() != ""
      const valid = populated && (+this.respFiO2) > 0 && (+this.respFiO2) < 100
      const value = valid ? this.respFiO2 : 0
      var msg = (populated && !valid) ? "Enter a positive number" : ""
      return { populated, valid, value, msg }
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
          this.cardioDob != "0"
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
		},
	}
}
</script>

<style>
</style>