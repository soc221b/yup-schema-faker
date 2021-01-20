<template lang="pug">
h1 Playground
br
Wrapper
  fake-button(@click="custom.fake")
  copy-button(:modelValue="custom.data")
  pre.my-1
    code.js.block.rounded.border.bg-gray-300.text-gray-800.p-2.overflow-auto(contenteditable @input.native="handleInput") {{ defaultCode }}
  Preview(:modelValue="custom.data")
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { mixed, bool, boolean, string, number, date, array, object } from 'yup'
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

export default defineComponent({
  name: 'Playground',
  setup() {
    const defaultCode = `
// Hint:
// 1. You could edit this to use your schema
// 2. You could access \`yup, mixed, bool, boolean, string, number, date, array, object and its methods\`

yup.array().length(5).required().of(
  yup.object()
    .required()
    .noUnknown()
    .shape({
      name: yup.string().required().min(4).max(20),
      age: yup.number().required().min(18).max(100).positive().integer(),
      email: yup.string().nullable().email(),
      website: yup.string().required().url(),
    })
)
    `.trim()
    const custom = reactive({
      fake() {
        const schema = new Function(
          'yup, mixed, bool, boolean, string, number, date, array, object',
          '"use strict";return (' + custom.code + ')',
        )(yup, mixed, bool, boolean, string, number, date, array, object)
        custom.data = fake(schema)
      },
      data: undefined,
      code: defaultCode,
    })
    custom.fake()

    const handleInput = e => {
      custom.code = e.target.innerText
    }

    return {
      custom,
      defaultCode,
      handleInput,
    }
  },
})
</script>
