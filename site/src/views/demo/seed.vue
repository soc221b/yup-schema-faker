<template lang="pug">
Wrapper
  fake-button(@click="fake")
  copy-button(:modelValue="data")
  label.mx-1(for="reset") Reset seed value
  input(id="reset" v-model="resetSeedValue" type="checkbox")
  Code(:modelValue="code")
  Preview(:modelValue="data")
</template>

<script>
import { fake, seed } from 'yup-schema-faker'
import { defineComponent, onMounted, ref, computed, reactive, toRefs } from 'vue'
import * as yup from 'yup'

const seedValue = fake(yup.number().defined())

export default defineComponent({
  name: 'Basic',
  setup() {
    const code = `
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
      code,
      data,
      fake: doFake,
    }
  },
})
</script>
