<template>
  <section>
    <div class="box has-text-centered" :class="priorityScore.bucket">
      <div class="bucket">{{ priorityScore.bucket}}</div>
      <div class="priority-score">Priority Score: {{ priorityScore.score }}</div>
      <div class="ventilator">{{ priorityScore.ventilator }}</div>
      <div class="prioritisation">{{ priorityScore.prioritisation }}</div>
    </div>
    <div class="box has-text-centered">
      <section class="summary">
        <div class="subtitle">Point Summary</div>
        <div class="summary-table">
          <div class="left">Age</div><div>{{ scores.age }}</div>
          <div class="left">Functionality</div><div>{{ scores.functionality }}</div>
          <div class="left">SOFA</div><div>{{ scores.sofa }}</div>
          <div class="left">Co-morbidities</div><div>{{ scores.morbidity }}</div>
          <hr />
          <div class="left"><strong>Total</strong></div><div><strong>{{ priorityScore.score }}</strong></div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
	props: {
      sofaScore: null,
      morbidityScore: null,
      scores: {
        sofa: 0,
        morbidity: 0,
        age: 0,
        functionality: 0
      }
	},
	computed: {
    priorityScore() {
      var pScore = this.scores.sofa + this.scores.morbidity + this.scores.age + this.scores.functionality
      
      if (pScore < 4)
        return { 
          score: pScore,
          bucket: "red",
          ventilator: "Highest priority for ventilator support.",
          prioritisation: "Receive priority over all other groups in face of scarce resources."
        }
      else if (pScore < 6) 
        return {
          score: pScore,
          bucket: "orange",
          ventilator: "Intermediate priority for ventilator support.",
          prioritisation: "Receive resources if available after all patients in red group allocated."
        }
      else if (pScore < 10) 
        return {
          score: pScore,
          bucket: "yellow",
          ventilator: "Low priority for ventilator support.",
          prioritisation: "Receive resources if available after all patients in red and orange groups allocated."
        }
      else 
        return {
          score: pScore,
          bucket: "green",
          ventilator: "Lowest priority for ventilator support.",
          prioritisation: "Palliation strongly suggested."
        }
    },
	}
}
</script>

<style>
.summary-table {
  display: flex;
  flex-wrap: wrap;
}

.summary-table div {
  min-width: 50%;
  text-align: left;
  padding-left: 1em;
}

.summary-table div.left {
  text-align: right;
  padding-right: 1em;
}
</style>