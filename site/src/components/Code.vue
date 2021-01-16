<template lang="pug">
pre.rounded.p-2.my-1.bg-gray-300.text-gray-500.overflow-y-auto {{ modelValue }}
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Code',
  props: {
    modelValue: {
      required: true,
      type: String,
    },
  },
})
</script>
