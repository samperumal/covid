<template>
  <section>
    <div class="box has-text-centered" :class="priorityScore.bucket">
      <div class="bucket">{{ priorityScore.bucket}}</div>
      <div class="priority-score">Priority Score: {{ priorityScore.score }}</div>
      <div class="ventilator">{{ priorityScore.ventilator }}</div>
      <div class="prioritisation">{{ priorityScore.prioritisation }}</div>
    </div>
  </section>
</template>

<script>
export default {
	props: {
      sofaScore: null,
      morbidityScore: null
	},
	computed: {
    priorityScore() {
      var pScore = this.sofaScore + this.morbidityScore      
      
      if (pScore < 4)
        return { 
          score: pScore,
          bucket: "red",
          ventilator: "Highest priority for ventilator",
          prioritisation: "Receive priority over all other groups in face of scarce resources."
        }
      else if (pScore < 6) 
        return {
          score: pScore,
          bucket: "orange",
          ventilator: "Intermediate priority for ventilator",
          prioritisation: "Receive resources if available after all patients in red group allocated."
        }
      else return {
        score: pScore,
        bucket: "yellow",
        ventilator: "Lowest priority for ventilator",
        prioritisation: "Receive resources if available after all patients in red and orange groups allocated."
      }
    },
	}
}
</script>