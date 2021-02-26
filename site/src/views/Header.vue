<template lang="pug">
header
  a.text-black(href="https://github.com/iendeavor/yup-schema-faker") Yup Schema Faker
  .float-right.text-black {{ VERSION }}
</template>

<script>
import { defineComponent } from 'vue'
import { __VERSION__ } from 'yup-schema-faker'

export default defineComponent({
  setup() {
    return {
      VERSION: 'v' + __VERSION__,
    }
  },
})
</script>
