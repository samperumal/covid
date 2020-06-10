<template>
  <div class="box has-text-centered" :class="action.bucket">
    <div class="bucket">{{ action.bucket }}</div>
    <div class="ventilator">{{ action.ventilator }}</div>
    <div class="prioritisation">{{ action.prioritisation }}</div>
  </div>
</template>

<script>
export default {
  props: {
    action: {
      bucket: String,
      ventilator: String,
      prioritisation: String,
    },
  },
}
</script>
