<template lang="pug">
Link(label="Seed" level="1")
button.text-black.border.border-gray-400.rounded.px-2.mb-2(@click="reloadToResetSeedValue") Reload to reset seed value
Preview(:fake="fake" :snippet="snippet" :data="data")
</template>

<script lang="ts">
import { fake } from '../faker'
import { defineComponent, ref } from 'vue'
import * as yup from 'yup'

export default defineComponent({
  setup() {
    const snippet = `
yup.array().of(
  yup.object({
    boolean: yup.boolean(),
    number: yup.number(),
    string: yup.string(),
    date: yup.date(),
  })
)
    `.trim()
    const data = ref()
    const reloadToResetSeedValue = () => {
      window.location.reload()
    }
    const doFake = () => {
      data.value = fake(
        yup.array().of(
          yup.object({
            boolean: yup.boolean(),
            number: yup.number(),
            string: yup.string(),
            date: yup.date(),
          }),
        ),
      )
    }
    doFake()

    return {
      reloadToResetSeedValue,
      snippet,
      data,
      fake: doFake,
    }
  },
})
</script>
