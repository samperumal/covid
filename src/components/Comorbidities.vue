<template>
	<section>
		<div class="title has-text-centered">Co-morbidities</div>
		<b-field v-for="option in optionsData()" :key="option.key" :label="option.Group + bracketScore(optionValues[option.Key])" label-position="default">
			<b-select class="is-primary" v-model="optionValues[option.Key]" expanded>
				<option v-for="(key, value) in option.Options" :key="key"
					:value="value" v-html="key"
				>
				</option>
			</b-select>
		</b-field>
		
		<div class="has-text-centered priority-score" style="margin-top: 1.5em;">Co-Morbidity Priority Points: {{ morbidityScore }}</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			optionValues: this.createData()
		}
	},
  computed: {
    morbidityScore() {
			var mscore = 0
			for (var option in this.optionValues)
				mscore = Math.max(mscore, this.optionValues[option])
			
			this.$emit("morbidity-score-changed", mscore)

			return mscore
		},
	},
  methods: {
		createData() {
			var data = {}
			for (var option of this.optionsData())
				data[option.Key] = "0"

			return data
		},
    bracketScore(score) {
      if (score != null && score != "0")
        return ` (${score})`
      else return ""
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
            "4": "GFR &leq; 15 ml/min (Stage 5) or dialysis"
          },
            Unit: "ml/min"
        },
        {
          Section: "Co-morbidity",
          Group: "Cancer/malignancy (expected survival)",
          Key: "cancer",
          Options: {
            "0": "N/A",
            "2": "&leq; 10 years",
            "3": "&leq; 5 years",
            "4": "&leq; 1 year"
          },
            Unit: "years"
        },
        {
          Section: "Co-morbidity",
          Group: "Chronic lung disease",
          Key: "lung",
          Options: {
            "0": "N/A",
            "1": "mMRC 1",
            "2": "mMRC 2",
            "3": "mMRC 3"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Chronic cardiac failure",
          Key: "cardiac",
          Options: {
            "0": "N/A",
            "1": "NYHA 1",
            "2": "NYHA 2",
            "4": "NYHA 3"
          }
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
            "4": "ABSI 10 to 11"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Physical impairment",
          Key: "physical",
          Options: {
            "0": "N/A",
            "1": "Chronic connective tissue disorders",
            "3": "> 75 years with hip fracture",
            "4": "High spinal lesion C5 and above"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Vascular disease",
          Key: "vascular",
          Options: {
            "0": "N/A",
            "1": "IHD (Angina), PVD, TIA, with symptoms",
            "2": "Severe PVD (including non-traumatic amputation), myocardial infarction, stroke"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Previous cardiac surgery requiring regular follow up",
          Key: "surgery",
          Options: {
            "0": "No",
            "2": "Yes"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Hypertension",
          Key: "hypertension",
          Options: {
            "0": "No",
            "1": "Yes"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Diabetes Mellitus",
          Key: "diabetes",
          Options: {
            "0": "No",
            "1": "Yes"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "BMI >= 35 in COVID-19",
          Key: "bmi",
          Options: {
            "0": "No",
            "1": "Yes"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Patient on chronic immunosuppressive drugs",
          Key: "drugs",
          Options: {
            "0": "No",
            "2": "Yes"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "HIV: Detectable viral load, CD4 <= 200",
          Key: "hiv",
          Options: {
            "0": "No",
            "3": "Yes"
          }
        },
        {
          Section: "Co-morbidity",
          Group: "Liver cirrhosis with history of decompensation",
          Key: "liver",
          Options: {
            "0": "No",
            "3": "Yes"
          }
        }
      ]
    }
  }
};
</script>