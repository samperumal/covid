<template>
	<section class="function">
		<div class="title has-text-centered">Age and Function</div>
		<b-field :label="'Age' + bracketScore(age)">
			<b-select v-model="age" expanded>
				<option value="0">&lt; 65 years</option>
				<option value="1">65 to 75 years</option>
				<option value="2">&gt; 75 years</option>
			</b-select>
		</b-field>
		<b-field label="Malignancy">
			<b-select v-model="malignancy" expanded>
				<option :value="false">No</option>
				<option :value="true">Yes</option>
			</b-select>
		</b-field>
		<b-field :label="'Clinical Frailty' + bracketScore(frailtyScore)" v-if="!malignancy">
			<b-select v-model="frailty" expanded>
				<option value="1">1 - Very Fit</option>
				<option value="2">2 - Well</option>
				<option value="3">3 - Managing Well</option>
				<option value="4">4 - Vulnerable</option>
				<option value="5">5 - Mildly Frail</option>
				<option value="6">6 - Moderately Frail</option>
				<option value="7">7 - Severely Frail</option>
				<option value="8">8 - Very Severely Frail</option>
				<option value="9">9 - Terminally Ill</option>
			</b-select>
		</b-field>
		<b-field :label="'ECOG Performance Status' + bracketScore(ecog)" v-if="malignancy">
			<b-select v-model="ecog" expanded>
				<option value="0">
					0 - Fully active, able to carry on all pre-disease performance 
					without restriction
				</option>
				<option value="2">
					1 - Restricted in physically strenuous activity but
					ambulatory and able to carry out work of a light or
					sedentary nature, e.g., light house work, office work
				</option>
				<option value="3">
					2 - Ambulatory and capable of all selfcare but unable
					to carry out any work activities; up and about more
					than 50% of waking hours
				</option>
				<option value="4">
					3 - Capable of only limited selfcare; confined to bed or
					chair more than 50% of waking hours
				</option>
				<option value="4">
					4 - Completely disabled; cannot carry on any selfcare;
					totally confined to bed or chair
				</option>
			</b-select>
		</b-field>
		
		<div class="has-text-centered priority-score" style="margin-top: 1.5em;">Age and Function Priority Points: {{ ageAndFunction }}</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			age: "0",
			frailty: "1",
			ecog: "0",
			malignancy: false
		}
	},
	computed: {
		ageAndFunction() {
			this.$emit("age-score-changed", +this.age)
			this.$emit("function-score-changed", +this.functionality)
			return +this.age + +this.functionality
		},
		frailtyScore() {
			if (!this.malignancy) {
				if (+this.frailty < 4) return 0
				else if (+this.frailty == 4) return 3
				else if (+this.frailty == 5) return 4
				else return -1
			}
			else return 0
		},
		functionality() {
			return this.malignancy ? (+this.ecog) : (+this.frailtyScore)
		}
	},
	methods: {
    bracketScore(score) {
      if (score != null && score != "0")
        return ` (${score})`
      else return ""
    }
	}
}
</script>