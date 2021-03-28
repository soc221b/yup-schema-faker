<template lang="pug">
header
  a.text-black(href="https://github.com/iendeavor/yup-schema-faker") Yup Schema Faker
  .float-right.text-black
    button.inline-block.mr-2.border.border-gray-400.rounded.px-2.mb-2(@click="reloadToClearSeedValue") Reload to clear seed value
    span {{ VERSION }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { __VERSION__ } from 'yup-schema-faker'

export default defineComponent({
  setup() {
    const reloadToClearSeedValue = () => {
      location.search = ''
    }

    return {
      reloadToClearSeedValue,
      VERSION: 'v' + __VERSION__,
    }
  },
})
</script>
