<template>
  <section>
    <div class="box has-text-centered" :class="currentAction.bucket">
      <div class="bucket">{{ currentAction.bucket }}</div>
      <div class="priority-score">
        Priority Score: {{ assessmentResult.scores.priorityScore }}
      </div>
      <div class="priority-score">
        Baseline SOFA Points: {{ assessmentResult.scores.sofaPoints }}
      </div>
      <div class="ventilator">{{ currentAction.ventilator }}</div>
      <div class="prioritisation">{{ currentAction.prioritisation }}</div>
    </div>
    <div class="box has-text-centered">
      <section class="summary">
        <div class="subtitle">Score breakdown</div>
        <div class="summary-table">
          <div class="summary-content">
            <div class="left">
              Age
              <span>{{ assessmentResult.scores.age }}</span>
            </div>
            <div class="left">
              Functionality
              <span>{{ assessmentResult.scores.functionality }}</span>
            </div>
            <div class="left">
              Acute Illness (SOFA)
              <span>{{ assessmentResult.scores.sofa }}</span>
            </div>
            <div class="left">
              Co-morbidities
              <span>{{ assessmentResult.scores.comorbidity }}</span>
            </div>
            <div class="left">
              <strong>Priority Score</strong>
              <span>
                <strong>{{ assessmentResult.scores.priorityScore }}</strong>
              </span>
            </div>
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
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["assessmentResult"]),
    currentAction() {
      return this.assessmentResult.currentAction
    },
  },
}
</script>

<style>
.summary-table {
  display: flex;
  justify-content: space-around;
}

.summary-content {
  text-align: right;
}

.summary-table div span {
  margin-left: 1em;
}
</style>
