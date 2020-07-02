<template>
  <section>
    <div class="title has-text-centered">
      Co-morbidities {{ bracketScore(morbidityScore) }}
    </div>
    <div class="block" v-for="option in optionsData()" :key="option.key">
      <b-field
        :label="option.Group + bracketScore(optionValues[option.Key])"
        :message="getMessage(option)"
      >
        <b-select
          class="is-primary"
          v-model="optionValues[option.Key]"
          expanded
          @input="updateStore"
        >
          <option
            v-for="(key, value) in option.Options"
            :key="key"
            :value="value"
            v-html="key"
          >
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="block has-text-centered">
      <div class="subtitle">Co-morbidity score: {{ morbidityScore }}</div>
      <div>
        {{ morbidityScoreDescription }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      optionValues: this.createData(),
    }
  },
  computed: {
    morbidityScore() {
      var mscore = 0
      for (var option in this.optionValues)
        mscore = Math.max(mscore, +this.optionValues[option][0])

      return mscore + ""
    },
    morbidityScoreDescription() {
      switch (this.morbidityScore) {
        default:
          return ""
        case "1":
          return "Co-morbidities present"
        case "2":
          return "10 year mortality risk"
        case "3":
          return "5 year mortality risk"
        case "4":
          return "Severely life-limiting conditions (death likely within 1 year)"
      }
    },
  },
  methods: {
    createData() {
      var data = {}
      for (var option of this.optionsData()) data[option.Key] = "0"

      return data
    },
    getMessage(option) {
      const selectedKey = this.optionValues[option.Key]
      if (option.Messages != null) return option.Messages[selectedKey]
      else return null
    },
    bracketScore(score) {
      if (score != null && score != "0") return ` (${score[0]})`
      else return ""
    },
    updateStore() {
      var data = {}
      for (var option in this.optionValues)
        data[option] = +this.optionValues[option][0]

      this.$store.commit("setComorbidities", data)
    },
    optionsData() {
      return [
        {
          Section: "Co-morbidity",
          Group: "Chronic renal disease",
          Key: "renal",
          Options: {
            "0": "N/A",
            "2": "GFR 59 to 31 ml/min (Stage 3)",
            "3": "GFR 30 to 16 ml/min (Stage 4)",
            "4": "GFR &leq; 15 ml/min (Stage 5) or dialysis",
          },
          Messages: {
            "0": "",
            "2": "Chronic renal failure",
            "3": "Chronic end-stage renal disease",
            "4": "Chronic end-stage renal disease",
          },
          Unit: "ml/min",
        },
        {
          Section: "Co-morbidity",
          Group: "Cancer/malignancy",
          Key: "cancer",
          Options: {
            "0": "N/A",
            "2": "&leq; 10 years",
            "3": "&leq; 5 years",
            "4": "&leq; 1 year",
          },
          Messages: {
            "0": "",
            "2": "Malignancy with ≤10 year expected survival",
            "3": "Malignancies with ≤5 year expected survival",
            "4": "All cancers with ≤1 year expected survival",
          },
          Unit: "years",
        },
        {
          Section: "Co-morbidity",
          Group: "Chronic lung disease",
          Key: "lung",
          Options: {
            "0": "N/A",
            "1": "mMRC 1",
            "2": "mMRC 2",
            "3": "mMRC 3",
            "5": "mMRC 4 (Patient excluded from ICU)",
          },
          Messages: {
            "0": "",
            "1":
              "I get short of breath when hurrying on level ground or walking up a slight hill",
            "2":
              "On level ground, I walk slower than people of the same age because of breathlessness, or have to stop for breath when walking at my own pace",
            "3":
              "I stop for breath after walking about 100 yards (90 m) or after a few minutes on level ground",
            "5":
              "I am too breathless to leave the house or I am breathless when dressing",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Chronic cardiac failure",
          Key: "cardiac",
          Options: {
            "0": "N/A",
            "1": "NYHA 1",
            "2": "NYHA 2",
            "4": "NYHA 3",
            "5": "NYHA 4 (Patient excluded from ICU)",
          },
          Messages: {
            "0": "",
            "1":
              "No limitation of physical activity. Ordinary physical activity does not cause undue fatigue, palpitation, dyspnea (shortness of breath).",
            "2":
              "Slight limitation of physical activity. Comfortable at rest. Ordinary physical activity results in fatigue, palpitation, dyspnea (shortness of breath).",
            "4":
              "Marked limitation of physical activity. Comfortable at rest. Less than ordinary activity causes fatigue, palpitation, or dyspnea",
            "5":
              "Unable to carry on any physical activity without discomfort. Symptoms of heart failure at rest. If any physical activity is undertaken, discomfort increases",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Burns",
          Key: "burns",
          Options: {
            "0": "N/A",
            "1": "ABSI < 6",
            "2": "ABSI 6 to 7",
            "3": "ABSI 8 to 9",
            "4": "ABSI 10 to 11",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Physical impairment",
          Key: "physical",
          Options: {
            "0": "N/A",
            "1": "Chronic connective tissue disorders",
            "3": "> 75 years with hip fracture",
            "4": "High spinal lesion C5 and above",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Vascular disease",
          Key: "vascular",
          Options: {
            "0": "N/A",
            "1": "IHD (Angina), PVD, TIA, with symptoms",
            "2":
              "Severe PVD (including non-traumatic amputation), myocardial infarction, stroke",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Previous cardiac surgery requiring regular follow up",
          Key: "surgery",
          Options: {
            "0": "No",
            "2": "Yes",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Hypertension",
          Key: "hypertension",
          Options: {
            "0": "No",
            "1": "Yes",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Diabetes Mellitus",
          Key: "diabetes",
          Options: {
            "0": "No",
            "1": "Yes",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "BMI >= 35 in COVID-19",
          Key: "bmi",
          Options: {
            "0": "No",
            "1": "Yes",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Patient on chronic immunosuppressive drugs",
          Key: "drugs",
          Options: {
            "0": "No",
            "2": "Yes",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "HIV: Detectable viral load, CD4 <= 200",
          Key: "hiv",
          Options: {
            "0": "No",
            "3": "Yes",
          },
        },
        {
          Section: "Co-morbidity",
          Group: "Liver cirrhosis with history of decompensation",
          Key: "liver",
          Options: {
            "0": "No",
            "3": "Yes",
          },
        },
      ]
    },
  },
}
</script>
