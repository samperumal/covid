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
          <div class="left">
            <strong>Priority Score</strong>
          </div>
          <div>
            <strong>{{ priorityScore.score }}</strong>
          </div>
        </div>
      </section>
    </div>
    <div class="block instructions">
      <div>
        Admit referrals sequentially from red to orange to yellow to green
        priority categories. If there are ties within a specific category,
        tiebreakers will be used to prioritize patients:
      </div>
      <div>
        <ol>
          <li>
            Number of co-morbidities: Preference to the patient with the least
            number of co-morbidities.
          </li>
          <li>
            Patient age groups (years) in following order: 12-40; 41-60; 61-75;
            >75. Preference to the patient who have completed the least number
            of life-cycles.
          </li>
          <li>
            Individuals whose work supports provision of healthcare and
            essential services to others.
          </li>
        </ol>
      </div>
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

.instructions {
  font-size: 0.75em;
}

.instructions ol {
  list-style: default;
  padding-left: 1em;
  margin-top: 0.5em;
}
</style>
