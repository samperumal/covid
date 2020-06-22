<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <p class="modal-card-title">NYHA Cardiovascular Scale</p>
      <p class="modal-card-subtitle">New York Heart Association</p>
    </header>
    <section class="modal-card-body">
      <p class="subtitle">
        This score should be used for patients diagnosed with heart failure
      </p>
      <ul>
        <li v-for="level in scaleData" :key="level.score">
          <span>{{ level.score }}</span> : {{ level.description }}
        </li>
      </ul>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
    </footer>
  </div>
</template>

<script>
import { nyhaScaleData } from "../staticData"

export default {
  computed: {
    scaleData() {
      return nyhaScaleData()
    },
  },
}
</script>

<style scoped>
li {
  margin-bottom: 1em;
}
li span {
  font-weight: bold;
  font-size: 1.25em;
}
</style>
