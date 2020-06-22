<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <p class="modal-card-title">ECOG Performance Status</p>
      <p class="modal-card-subtitle">Eastern Cooperative Oncology Group</p>
    </header>
    <section class="modal-card-body">
      <p class="subtitle">
        This score should be used for patients diagnosed with a malignancy
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
import { ecogScaleData } from "../staticData"

export default {
  computed: {
    scaleData() {
      return ecogScaleData()
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
