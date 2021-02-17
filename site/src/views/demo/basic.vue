<template lang="pug">
h1.text-black.mb-2 Basic

Preview(:fake="boolean.fake" :snippet="boolean.snippet" :data="boolean.data")

Preview(:fake="date.fake" :snippet="date.snippet" :data="date.data")

Preview(:fake="number.fake" :snippet="number.snippet" :data="number.data")

Preview(:fake="string.fake" :snippet="string.snippet" :data="string.data")

Preview(:fake="array.fake" :snippet="array.snippet" :data="array.data")

Preview(:fake="object.fake" :snippet="object.snippet" :data="object.data")
</template>

<script>
import { fake } from 'yup-schema-faker'
import { defineComponent, onMounted, ref, computed, reactive, toRefs } from 'vue'
import * as yup from 'yup'

export default defineComponent({
  name: 'Basic',
  setup() {
    const types = ['boolean', 'date', 'number', 'string', 'array', 'object']
    const modelValues = reactive(
      types.reduce((accu, type) => {
        return Object.assign(accu, {
          [type]: {
            schema: computed(() => eval(modelValues[type].snippet)),
            snippet: `yup.${type}()`,
            data: undefined,
            fake: computed(() => {
              return () => {
                modelValues[type].data = fake(modelValues[type].schema)
              }
            }),
          },
        })
      }, {}),
    )

    const basicTypes = ['boolean', 'date', 'number', 'string']
    modelValues.object.snippet = `
yup.object().shape({
${basicTypes.map(type => '  ' + type + ': ' + modelValues[type].snippet).join(',\n')}
})
    `.trim()

    modelValues.array.snippet = `
yup.array().min(1).max(5).of(
${modelValues.object.snippet
  .split('\n')
  .map(line => '  ' + line)
  .join('\n')}
)
    `.trim()

    onMounted(() => {
      types.forEach(type => modelValues[type].fake())
    })

    return {
      ...toRefs(modelValues),
    }
  },
})
</script>
