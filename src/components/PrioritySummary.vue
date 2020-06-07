<template>
  <section>
    <div class="box has-text-centered" :class="priorityScore.bucket">
      <div class="bucket">{{ priorityScore.bucket }}</div>
      <div class="priority-score">
        Priority Score: {{ priorityScore.score }}
      </div>
      <div class="priority-score">Baseline Sofa Score: {{ scores.sofa }}</div>
      <div class="ventilator">{{ priorityScore.ventilator }}</div>
      <div class="prioritisation">{{ priorityScore.prioritisation }}</div>
    </div>
    <div class="box has-text-centered">
      <section class="summary">
        <div class="subtitle">Priority Score Calculation</div>
        <div class="summary-table">
          <div class="left">Age</div>
          <div>{{ priorityScore.age }}</div>
          <div class="left">Functionality</div>
          <div>{{ priorityScore.functionality }}</div>
          <div class="left">SOFA</div>
          <div>{{ priorityScore.sofa }}</div>
          <div class="left">Co-morbidities</div>
          <div>{{ priorityScore.comorbidities }}</div>
          <hr />
          <div class="left"><strong>Priority Score</strong></div>
          <div>
            <strong>{{ priorityScore.score }}</strong>
          </div>
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
      functionality: 0,
    },
  },
  computed: {
    priorityScore() {
      return this.$store.getters.initialPriorityScore
    },
  },
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
