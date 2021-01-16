<template lang="pug">
Wrapper
  button.text-blue-400.px-2.m-0.rounded.border.border-blue-400(@click="boolean.fake") Fake
  Code(:modelValue="boolean.code")
  Preview(:modelValue="boolean.data")

Wrapper
  button.text-blue-400.px-2.m-0.rounded.border.border-blue-400(@click="date.fake") Fake
  Code(:modelValue="date.code")
  Preview(:modelValue="date.data")

Wrapper
  button.text-blue-400.px-2.m-0.rounded.border.border-blue-400(@click="number.fake") Fake
  Code(:modelValue="number.code")
  Preview(:modelValue="number.data")

Wrapper
  button.text-blue-400.px-2.m-0.rounded.border.border-blue-400(@click="string.fake") Fake
  Code(:modelValue="string.code")
  Preview(:modelValue="string.data")

Wrapper
  button.text-blue-400.px-2.m-0.rounded.border.border-blue-400(@click="array.fake") Fake
  Code(:modelValue="array.code")
  Preview(:modelValue="array.data")

Wrapper
  button.text-blue-400.px-2.m-0.rounded.border.border-blue-400(@click="object.fake") Fake
  Code(:modelValue="object.code")
  Preview(:modelValue="object.data")
</template>

<script>
import { fake } from 'yup-schema-faker'
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
import * as yup from 'yup'

export default defineComponent({
  name: 'Basic',
  setup() {
    const types = ['boolean', 'date', 'number', 'string', 'array', 'object']
    const modelValues = reactive(
      types.reduce((accu, type) => {
        return Object.assign(accu, {
          [type]: {
            schema: yup[type](),
            code: `yup.${type}()`,
            data: undefined,
            fake: () => {
              modelValues[type].data = fake(modelValues[type].schema)
            },
          },
        })
      }, {}),
    )

    const basicTypes = ['boolean', 'date', 'number', 'string']
    modelValues.object.schema = yup.object().shape(
      basicTypes.reduce((shape, type) => {
        return Object.assign(shape, {
          [type]: modelValues[type].schema,
        })
      }, {}),
    )
    modelValues.object.code = `
yup.object().shape({
${basicTypes.map(type => '  ' + type + ': ' + modelValues[type].code).join(',\n')}
})
    `.trim()

    modelValues.array.schema = yup.array().min(1).max(5).of(modelValues.object.schema)
    modelValues.array.code = `
yup.array().min(1).max(5).of(
${modelValues.object.code
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

<style scoped>
button {
  outline: none !important;
}
</style>
