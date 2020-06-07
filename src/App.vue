<template>
  <div id="app">
    <div class="columns is-centered is-mobile">
      <div
        class="column is-full-mobile is-two-thirds-tablet is-half-desktop is-two-fifths-fullhd"
      >
        <nav id="navbar" class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li v-for="(item, index) in navbarItems" :key="index">
              <router-link :to="item.to">{{ item.text }}</router-link>
            </li>
          </ul>
        </nav>
        <hr />
        <router-view></router-view>
        <hr />
        <section class="has-text-centered is-size-7">
          <div>Developed by Sameshan Perumal</div>
          <div>
            <a href="https://datacartographer.com"
              >https://datacartographer.com</a
            >
          </div>
          <div class="reference">Contact</div>
          <div>
            <a href="mailto:info@datacartographer.com"
              >info@datacartographer.com</a
            >
          </div>
          <div class="reference">Source Code</div>
          <div>
            <a href="https://github.com/samperumal/covid"
              >https://github.com/samperumal/covid</a
            >
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  data: function () {
    const data = {}

    return data
  },
  components: {},
  methods: {},
  computed: {
    navbarItems() {
      return this.$route.meta
    },
  },
})
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

.green {
  background-color: rgb(55, 160, 55);
  color: white;
}

.label {
  color: #545d66;
  // font-variant: small-caps;
}

.reference {
  margin-top: 1em;
  // max-width: 10em;
}

.instructions {
  font-size: 0.85em;
}

.instructions p,
.instructions ol {
  margin-bottom: 0.5em;
}

.instructions ol {
  padding-left: 1em;
  margin-left: 1em;
}
</style>
