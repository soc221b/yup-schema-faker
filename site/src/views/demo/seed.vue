<template lang="pug">
label.mx-1.text-black(for="reset") Reset seed value
input(id="reset" v-model="resetSeedValue" type="checkbox")
Preview(:fake="fake" :snippet="snippet" :data="data")
</template>

<script>
import { fake, seed } from 'yup-schema-faker'
import { defineComponent, onMounted, ref, computed, reactive, toRefs } from 'vue'
import * as yup from 'yup'

const seedValue = fake(yup.number().defined())

export default defineComponent({
  name: 'Basic',
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
    const resetSeedValue = ref(true)
    const doFake = () => {
      if (resetSeedValue.value) seed(seedValue)
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
      doFake()
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
