<template>
  <section>
    <div class="title has-text-centered">In-ICU re-assessment</div>
    <div class="block instructions">
      <p>
        Re-assess all patients admitted to ICU at 48 hours and at 120 hours
        after admission.
      </p>
      <p>Reclassify the PRIORITY CATEGORY using:</p>
      <ol>
        <li>Baseline PRIORITY score and SOFA score at admission.</li>
        <li>SOFA after 48 hours.</li>
        <li>SOFA after 120 hours.</li>
      </ol>
      <p>Principles of re-assessment:</p>
      <ol>
        <li>
          Once a patient has been accepted into the ICU (guided by the PRIORITY
          CALCULATOR FOR ADMISSION above), progression IN-ICU is now monitored
          by using the initial SOFA score as baseline in relation to the
          follow-up SOFA scores (delta-SOFA). The SOFA score can
          <strong>STAY THE SAME</strong> (not ideal),
          <strong>IMPROVE</strong> (desired) or
          <strong>DETERIORATE</strong> (worst).
        </li>
        <li>
          After re-assessment (at 48 hours and 120 hours after admission) the
          patient can only stay in the
          <strong>SAME</strong> PRIORITY CATEGORY if the SOFA has
          <strong>IMPROVED</strong>.
        </li>
        <li>
          If the SOFA score stays
          <strong>THE SAME</strong> in a re-assessment, the patient must move to
          the next <strong>LOWER</strong> PRIORITY CATEGORY.
        </li>
        <li>
          If the SOFA
          <strong>IMPROVES</strong>, the patient can either stay in the
          <strong>SAME</strong> PRIORITY CATEGORY, or move into a
          <strong>HIGHER</strong> PRIORITY CATEGORY, depending on the amount of
          SOFA score improvement.
        </li>
      </ol>
    </div>
    <hr />
    <div class="block"></div>
    <b-field label="Baseline Priority Score">
      <b-input
        v-model="basePriorityScore"
        @input="updateStore"
        type="number"
        min="1"
      ></b-input>
    </b-field>
    <b-field label="Baseline SOFA Score">
      <b-input
        v-model="baseSofaScore"
        @input="updateStore"
        type="number"
        min="1"
      ></b-input>
    </b-field>
    <b-field label="48-hour SOFA Score">
      <b-input
        v-model="hour48SofaScore"
        @input="updateStore"
        type="number"
        min="1"
      ></b-input>
    </b-field>
    <b-field label="120-hour SOFA Score">
      <b-input
        v-model="hour120SofaScore"
        @input="updateStore"
        type="number"
        min="1"
      ></b-input>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      basePriorityScore: 1,
      baseSofaScore: 1,
      hour48SofaScore: 1,
      hour120SofaScore: 1,
    }
  },
  methods: {
    updateStore() {
      this.$store.commit("setReassessmentInputs", {
        basePriorityScore: +this.basePriorityScore,
        baseSofaScore: +this.baseSofaScore,
        hour48SofaScore: +this.hour48SofaScore,
        hour120SofaScore: +this.hour120SofaScore,
      })
    },
  },
}
</script>
