<template>
  <section>
    <div class="title has-text-centered">Co-morbidities</div>
    <b-field label="Alzheimer's or related dementia" :message="alzheimerHelpText">
      <b-field>
        <b-radio-button v-model="alzheimer" native-value="0" expanded type="is-info">
          <span>N/A</span>
        </b-radio-button>

        <b-radio-button v-model="alzheimer" native-value="2" expanded type="is-info">
          <span>Moderate</span>
        </b-radio-button>

        <b-radio-button v-model="alzheimer" native-value="4" expanded type="is-info">
          <span>Severe</span>
        </b-radio-button>
      </b-field>
    </b-field>
    <b-field label="Heart failure" :message="heartHelpText">
      <b-field>
        <b-radio-button v-model="heart" native-value="0" expanded type="is-info">
          <span>N/A</span>
        </b-radio-button>

        <b-radio-button v-model="heart" native-value="2" expanded type="is-info">
          <span>Class III</span>
        </b-radio-button>

        <b-radio-button v-model="heart" native-value="4" expanded type="is-info">
          <span>Class IV</span>
        </b-radio-button>
      </b-field>
    </b-field>
    <b-field label="End-stage renal disease" :message="renalHelpText">
      <b-field>
        <b-radio-button v-model="renalDisease" native-value="0" expanded type="is-info">
          <span>N/A</span>
        </b-radio-button>

        <b-radio-button v-model="renalDisease" native-value="2" expanded type="is-info">
          <span>Patients &leq; 75</span>
        </b-radio-button>

        <b-radio-button v-model="renalDisease" native-value="4" expanded type="is-info">
          <span>Patients &gt; 75</span>
        </b-radio-button>
      </b-field>
    </b-field>
    <b-field label="Cancer" :message="cancerHelpText">
      <b-field>
        <b-radio-button v-model="cancer" native-value="0" expanded type="is-info">
          <span>N/A</span>
        </b-radio-button>

        <b-radio-button v-model="cancer" native-value="2" expanded type="is-info">
          <span>&lt;10 year survival</span>
        </b-radio-button>

        <b-radio-button v-model="cancer" native-value="4" expanded type="is-info">
          <span>Paliative only</span>
        </b-radio-button>
      </b-field>
    </b-field>
    <b-field label="Chronic lung disease" :message="lungHelpText">
      <b-field>
        <b-radio-button v-model="lung" native-value="0" expanded type="is-info">
          <span>N/A</span>
        </b-radio-button>

        <b-radio-button v-model="lung" native-value="2" expanded type="is-info">
          <span>Moderate</span>
        </b-radio-button>

        <b-radio-button v-model="lung" native-value="4" expanded type="is-info">
          <span>Severe, frailty</span>
        </b-radio-button>
      </b-field>
    </b-field>
    <b-field label="Liver cirrhosis" :message="cirrhosisHelpText">
      <b-field>
        <b-radio-button v-model="cirrhosis" native-value="0" expanded type="is-info">
          <span>N/A</span>
        </b-radio-button>

        <b-radio-button v-model="cirrhosis" native-value="2" expanded type="is-info">
          <span>Decompensation</span>
        </b-radio-button>

        <b-radio-button v-model="cirrhosis" native-value="4" expanded type="is-info">
          <span>MELD ≥ 20</span>
        </b-radio-button>
      </b-field>
    </b-field>
    <b-field label="Other conditions"></b-field>
    <b-field>
      <b-checkbox-button v-model="otherConditions" native-value="CAD" expanded type="is-info">
        <span>Severe multi-vessel CAD</span>
      </b-checkbox-button>
    </b-field>
    <b-field :message="aidsHelpText">
      <b-checkbox-button v-model="otherConditions" native-value="AIDS" expanded type="is-info">
        <span>AIDS defining illness</span>
      </b-checkbox-button>
    </b-field>
    <div class="has-text-centered priority-score">Co-Morbidity Points: {{ morbidityScore }}</div>
  </section>
</template>

<script>
export default {
  data: function() {
    const data = {
      alzheimer: "0",
      cancer: "0",
      heart: "0",
      lung: "0",
      renalDisease: "0",
      cirrhosis: "0",
      otherConditions: []
    }

    return data
  },
  computed: {
    morbidityScore() {
      var mscore = Math.max(
        this.alzheimer,
        this.cancer,
        this.heart,
        this.lung,
        this.renalDisease,
        this.cirrhosis,
        this.otherConditions.length > 0 ? 4 : 0
			)
			
			this.$emit("morbidity-score-changed", mscore)

			return mscore
    },
    alzheimerHelpText() {
      if (this.alzheimer == "2")
        return "Moderate Alzheimer's disease or related dementia.";

      if (this.alzheimer == "4")
        return "Severe Alzheimer's disease or related dementia.";
      return null;
    },
    renalHelpText() {
      if (this.renalDisease == "2")
        return "End-stage renal disease in patients younger than 75 years.";

      if (this.renalDisease == "4")
        return "End-stage renal disease in patients older than 75 years.";
      return null;
    },
    lungHelpText() {
      if (this.lung == "2")
        return "Moderately severe chronic lung disease (e.g. COPD, IPF).";

      if (this.lung == "4")
        return "Severe chronic lung disease plus evidence of frailty.";
      return null;
    },
    cirrhosisHelpText() {
      if (this.cirrhosis == "2")
        return "Cirrhosis with history of decompensation.";

      if (this.cirrhosis == "4")
        return "Cirrhosis with MELD score ≥ 20, ineligible for transplant.";
      return null;
    },
    heartHelpText() {
      if (this.heart == "2")
        return "New York Heart Association Class III heart failure.";

      if (this.heart == "4")
        return "New York Heart Association Class IV heart failure, plus evidence of frailty.";
      return null;
    },
    cancerHelpText() {
      if (this.cancer == "2")
        return "Malignancy with a < 10 year expected survival.";
      if (this.cancer == "4")
        return "Cancer being treated with only palliative interventions (incl. chemotherapy and radiation).";
      return null;
    },
    aidsHelpText() {
      if (this.otherConditions.includes("AIDS"))
        return "AIDS defining illness, or viral load > 10,000 despite Rx.";
      return null;
    }
  }
}
</script>

<style>
</style>