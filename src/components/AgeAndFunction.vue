<template>
  <section class="function">
    <div class="title has-text-centered">Age {{ bracketScore(agePoints) }}</div>
    <b-field :label="'Age' + bracketScore(age)">
      <b-select v-model="age" expanded @input="updateStore">
        <option value="0">&lt; 65 years</option>
        <option value="2">65 to 75 years</option>
        <option value="3">&gt; 75 years</option>
      </b-select>
    </b-field>
    <div class="title has-text-centered">
      Function {{ bracketScore(functionalityPoints) }}
    </div>
    <b-field :label="'Clinical Frailty' + bracketScore(frailtyScore)">
      <b-field>
        <b-select v-model="frailty" expanded @input="updateStore">
          <option
            v-for="foption in frailtyScaleData"
            :key="foption.score"
            :value="foption.value"
            >{{ foption.score }} - {{ foption.group }}</option
          >
        </b-select>
        <p class="control">
          <button class="button" @click="frailtyDetails = true">
            <b-icon icon="help" type="is-info" size></b-icon>
          </button>
        </p>
      </b-field>
      <template slot="message">
        <div class="frailty" v-html="selectedFrailtyMessage"></div>
      </template>
    </b-field>
    <b-field
      :label="'ECOG Performance Status' + bracketScore(ecog)"
      :message="selectedEcogMessage"
    >
      <b-field>
        <b-select v-model="ecog" expanded @input="updateStore">
          <option
            v-for="eoption in ecogScaleData"
            :key="eoption.score"
            :value="eoption.value"
            >{{ eoption.score }} - {{ eoption.group }}</option
          >
        </b-select>
        <p class="control">
          <button class="button" @click="ecogDetails = true">
            <b-icon icon="help" type="is-info" size></b-icon>
          </button>
        </p>
      </b-field>
    </b-field>

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
  </section>
</template>

<script>
import { mapGetters } from "vuex"
import { frailtyScaleData, ecogScaleData } from "../staticData"
import EcogModal from "./EcogModal.vue"
import FrailtyModal from "./FrailtyModal.vue"

export default {
  data() {
    return {
      age: "0",
      frailty: "0a",
      ecog: "0",
      frailtyDetails: false,
      ecogDetails: false,
    }
  },
  computed: {
    ...mapGetters(["assessmentResult"]),
    agePoints() {
      return this.assessmentResult.scores.age
    },
    functionalityPoints() {
      return this.assessmentResult.scores.functionality
    },
    frailtyScore() {
      return +this.frailty[0]
    },
    selectedFrailtyMessage() {
      const data = this.frailtyScaleData
      return data.find((d) => d.value == this.frailty).description
    },
    selectedEcogMessage() {
      const data = this.ecogScaleData
      return data.find((d) => d.value == this.ecog).description
    },
    frailtyScaleData() {
      return frailtyScaleData()
    },
    ecogScaleData() {
      return ecogScaleData()
    },
  },
  methods: {
    updateStore() {
      this.$store.commit("setAgeAndFunction", {
        age: this.age,
        ecog: this.ecog,
        frailty: this.frailtyScore,
      })
    },
    bracketScore(score) {
      if (score != null && score != "0") return ` (${score})`
      else return ""
    },
  },
  components: {
    EcogModal,
    FrailtyModal,
  },
}
</script>

<style>
.frailty strong {
  text-decoration: underline;
  font-weight: normal;
}
</style>
