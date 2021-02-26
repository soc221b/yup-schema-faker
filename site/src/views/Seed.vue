<template lang="pug">
Link(label="Seed" level="1")
button.text-black.border.border-gray-400.rounded.px-2.mb-2(id="reset-seed-value" @click="resetSeedValue") Reset seed value
Preview(:fake="fake" :snippet="snippet" :data="data")
</template>

<script>
import { fake, seed } from 'yup-schema-faker'
import { defineComponent, onMounted, ref, computed, reactive, toRefs } from 'vue'
import * as yup from 'yup'

const seedValue = fake(yup.number().defined())

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
    const resetSeedValue = () => {
      seed(seedValue)
      doFake()
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

    onMounted(() => {
      resetSeedValue()
    })

    return {
      resetSeedValue,
      snippet,
      data,
      fake: doFake,
    }
  },
})
</script>
