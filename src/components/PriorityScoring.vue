<template>
	<div>
		<age-and-function 
			v-on:age-score-changed="ageScoreChanged"
			v-on:function-score-changed="functionScoreChanged"
		></age-and-function>
		<hr />
		<sofa v-on:sofa-changed="sofaChanged" storeMethod="setInitialSofa"></sofa>
		<hr />
		<comorbidities v-on:morbidity-score-changed="morbidityScoreChanged"></comorbidities>
		<hr />
		<priority-summary :scores="scores"></priority-summary>
		<hr />
		<section class="container has-text-centered">
			<router-link to="/"><div class="button is-info is-large">Start New Assessment</div></router-link>
		</section>
	</div>
</template>

<script>
import Sofa from "./Sofa.vue"
import AgeAndFunction from "./AgeAndFunction.vue"
import Comorbidities from "./Comorbidities.vue"
import PrioritySummary from "./PrioritySummary.vue"

export default {
  data: function() {
    const data = {
			scores: {
				sofa: 1,
				morbidity: 0,
				age: 0,
				functionality: 0
			}
    }

    return data
  },
  methods: {
    sofaChanged(newScore) {
			this.scores.sofa = newScore
			// this.$store.commit("changePriorityScore", this.scores)
    },
    morbidityScoreChanged(newScore) {
      this.scores.morbidity = newScore
		},
		ageScoreChanged(newScore) {
			this.scores.age = newScore
		},
		functionScoreChanged(newScore) {
			this.scores.functionality = newScore
		}
  },
	components: {
		Sofa,
		AgeAndFunction,
		Comorbidities,
		PrioritySummary
	}	
}
</script>