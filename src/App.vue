<template>
  <div id="app">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li v-for="(item, index) in navbarItems" :key="index">
          <router-link :to="item.to">{{ item.text }}</router-link>
        </li>
      </ul>
    </nav>
    <hr />
    <div class="columns is-centered">
      <div class="column">
        <router-view></router-view>
        <hr />
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column">
        <section class="has-text-centered is-size-7">
          <div><strong>References</strong></div>
          <div class="reference">
          <div>[1] THE SOUTH AFRICAN MEDICAL ASSOCIATION</div>
          <div>SARS-CoV-2 (COVID-19)</div> 
          <div>Guidance for Managing Ethical Issues</div>
          <div>
            <a href="https://www.saheart.org/cms/attachment/163">https://www.saheart.org/cms/attachment/163</a>
          </div>
          </div>
          <div class="reference">
            [2] Subbe, Christian Peter & Burford, Caroline & Le Jeune, Ivan & Masterton-Smith, Charlotte & Ward, David. (2015). Relationship between input and output in acute medicine - Secondary analysis of the Society for Acute Medicine's benchmarking audit 2013 (SAMBA '13). Clinical medicine (London, England). 15. 15-9. 10.7861/clinmedicine.15-1-15. 
          </div>
        </section>
        <hr />
        <section class="has-text-centered is-size-7"  style="font-size: 0.85em;">
          <div>Developed by Sameshan Perumal</div>
          <div><a href="https://datacartographer.com">https://datacartographer.com</a></div>
          <div>Contact: <a href="mailto:info@datacartographer.com">info@datacartographer.com</a></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  data: function() {
    const data = {
    }

    return data
  },
  components: {
  },
  methods: {
  },
  computed: {
    navbarItems() {
      return this.$route.meta
    }
  }
});
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// @import "./styles/styles.scss";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  margin: 1em;
}

.subscript {
  position: relative;
  top: +0.5em;
  font-size: 80%;
}

.superscript {
  position: relative;
  top: -0.5em;
  font-size: 80%;
}

.bucket {
  font-size: 1.5em;
  text-transform: uppercase;
  margin-bottom: 1em;
  font-weight: bolder;
}

.priority-score {
  font-size: larger;
  font-weight: bold;
  margin-bottom: 1em;
}

.ventilator {
  font-size: large;
  margin-bottom: 1em;
}

.red {
  background-color: darkred;
  color: white;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: #fff455;
}

.title {
  color: #3273dc;
}

.label {
  color: #4f7ec7;
  font-variant: small-caps;
}

.reference {
  margin-top: 1em;
}
</style>
