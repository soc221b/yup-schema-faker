<template lang="pug">
h1 Basic
br
Wrapper
  fake-button(@click="boolean.fake")
  copy-button(:modelValue="boolean.data")
  Code(:modelValue="boolean.code")
  Preview(:modelValue="boolean.data")

Wrapper
  fake-button(@click="date.fake")
  copy-button(:modelValue="date.data")
  Code(:modelValue="date.code")
  Preview(:modelValue="date.data === undefined ? undefind : '[object Date]'")

Wrapper
  fake-button(@click="number.fake")
  copy-button(:modelValue="number.data")
  Code(:modelValue="number.code")
  Preview(:modelValue="number.data")

Wrapper
  fake-button(@click="string.fake")
  copy-button(:modelValue="string.data")
  Code(:modelValue="string.code")
  Preview(:modelValue="string.data")

Wrapper
  fake-button(@click="array.fake")
  copy-button(:modelValue="array.data")
  Code(:modelValue="array.code")
  Preview(:modelValue="array.data")

Wrapper
  fake-button(@click="object.fake")
  copy-button(:modelValue="object.data")
  Code(:modelValue="object.code")
  Preview(:modelValue="object.data")
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
            schema: computed(() => eval(modelValues[type].code)),
            code: `yup.${type}()`,
            data: undefined,
            fake: computed(() => {
              return () => {
                modelValues[type].data = fake(modelValues[type].schema)
                if (type === 'date') {
                  console.log(modelValues[type].data)
                }
              }
            }),
          },
        })
      }, {}),
    )

    const basicTypes = ['boolean', 'date', 'number', 'string']
    modelValues.object.code = `
yup.object().shape({
${basicTypes.map(type => '  ' + type + ': ' + modelValues[type].code).join(',\n')}
})
    `.trim()

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
