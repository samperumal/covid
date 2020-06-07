<template>
  <section>
    <div class="container has-text-centered">
      <div class="title">Western Cape Critical Care Triage Tool</div>
      <div class="subtitle">v1.2 as at 14 May 2020</div>
      <div class="box is-6">
        <div class="notice">
          <div>
            <p>
              <strong>
                This website is NOT affiliated with the Western Cape Dept. of
                Health, and has NOT been validated or approved by the
                <a href="https://www.samedical.org/"
                  >South African Medical Association (SAMA)</a
                >
                or the
                <a href="https://criticalcare.org.za/">
                  Critical Care Society of Southern Africa (CCSSA) </a
                >.
              </strong>
            </p>
            <p>
              It is intended solely for the use of qualified doctors who are
              already familiar with the guidelines, and who need an electronic
              aid to speed up the calculation of Priority Scores for triage
              management.
            </p>
            <p>
              This application provides an interactive version of the triage
              flowchart presented in the
              <strong>WESTERN CAPE CRITICAL CARE TRIAGE TOOL</strong>
              documentation.
            </p>
          </div>
        </div>
      </div>
      <router-link to="priority">
        <div class="button is-info is-large">Begin Priority Scoring</div>
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      fsm: this.resetData(),
    }
  },
  methods: {
    resetData() {
      return {}
    },
  },
  mounted() {
    this.fsm = this.resetData()
    if (process.env.NODE_ENV === "production") {
      // Only runs in production
      axios
        .get("https://tmscorebot.azurewebsites.net/api/log")
        .then(() => console.log("Home visit logged"))
        .catch(() => console.log("Unable to contact server"))
    }
  },
}
</script>

<style>
.notice p {
  margin-bottom: 1em;
  line-height: 1.15rem;
}

.notice {
  display: flex;
  text-align: justify;
}
</style>
