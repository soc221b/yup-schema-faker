<template lang="pug">
header
  a(href="https://github.com/iendeavor/yup-schema-faker") Yup Schema Faker
  .float-right {{ VERSION }}
</template>

<script>
import { defineComponent } from 'vue'
import { __VERSION__ } from 'yup-schema-faker'

export default defineComponent({
  name: 'Header',
  setup() {
    return {
      VERSION: 'v' + __VERSION__,
    }
  },
})
</script>
