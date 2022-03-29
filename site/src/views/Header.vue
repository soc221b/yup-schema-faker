<template lang="pug">
header
  h1 Yup-schema-faker{{ VERSION }}
  .float-right
    a.mr-1(href='https://github.com/iendeavor/yup-schema-faker' target="_blank") GitHub
  .mt-1
    button.mb-1.mr-1.inline-block.border.border-gray-400.rounded.px-2(@click='reloadToResetSeedValue') Reload to reset seed value
    button.mb-1.inline-block.border.border-gray-400.rounded.px-2(@click='reloadToGenerateNewSeedValue') Reload to generate new seed value
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { __VERSION__ } from 'yup-schema-faker'

export default defineComponent({
  setup() {
    const reloadToResetSeedValue = () => {
      location.reload()
    }
    const reloadToGenerateNewSeedValue = () => {
      location.search = ''
    }

    return {
      reloadToResetSeedValue,
      reloadToGenerateNewSeedValue,
      VERSION: '@' + __VERSION__,
    }
  },
})
</script>
