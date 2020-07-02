<template>
  <div class="modal-card" style="width: auto;">
    <header class="modal-card-head">
      <p class="modal-card-title">Clinical Frailty Scale</p>
      <p class="modal-card-subtitle">Fitness and frailty in elderly people</p>
    </header>
    <section class="modal-card-body">
      <p class="subtitle">
        Global clinical measure of fitness and frailty in elderly people
      </p>
      <ul>
        <li v-for="level in scaleData" :key="level.score">
          <span class="score">{{ level.score }}</span> :
          <span v-html="level.description"></span>
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
import { frailtyScaleData } from "../staticData"

export default {
  computed: {
    scaleData() {
      return frailtyScaleData()
    },
  },
}
</script>

<style scoped>
li {
  margin-bottom: 1em;
}
li span.score {
  font-weight: bold;
  font-size: 1.25em;
}
</style>
