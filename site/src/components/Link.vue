<template lang="pug">
a(:href="`#${label}`")
  h1.mt-5.mb-1.text-black(v-if="level == 1" :id="label") {{ label }}
  h2.mt-5.mb-1.text-black(v-else-if="level == 2" :id="label") {{ label }}
  h3.mt-5.mb-1.text-black(v-else-if="level == 3" :id="label") {{ label }}
  h4.mt-5.mb-1.text-black(v-else-if="level == 4" :id="label") {{ label }}
  h5.mt-5.mb-1.text-black(v-else-if="level == 5" :id="label") {{ label }}
  h6.mt-5.mb-1.text-black(v-else-if="level == 6" :id="label") {{ label }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    level: {
      required: true,
      type: [String, Number],
    },
    label: {
      required: true,
      type: String,
    },
  },
})
</script>
