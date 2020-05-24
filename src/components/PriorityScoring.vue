<template>
	<div>
		<sofa v-on:sofa-changed="sofaChanged"></sofa>
		<hr />
		<comorbidities v-on:morbidity-score-changed="morbidityScoreChanged"></comorbidities>
		<hr />
		<priority-summary :sofaScore="sofaScore" :morbidityScore="morbidityScore"></priority-summary>
		<hr />
		<section class="container has-text-centered">
			<div class="title">
			<router-link to="/">Start a new evaluation</router-link>
			</div>
		</section>
	</div>
</template>

<script>
import Sofa from "./Sofa.vue"
import Comorbidities from "./Comorbidities.vue"
import PrioritySummary from "./PrioritySummary.vue"

export default {
  data: function() {
    const data = {
      sofaScore: null,
      morbidityScore: null 
    }

    return data
  },
  methods: {
    sofaChanged(newSofaScore) {
      this.sofaScore = newSofaScore
    },
    morbidityScoreChanged(newMorbidityScore) {
      this.morbidityScore = newMorbidityScore
    }
  },
	components: {
		Sofa,
		Comorbidities,
		PrioritySummary
	}	
}
</script>