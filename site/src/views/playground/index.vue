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
import { mixed, bool, boolean, string, number, date, array, object, ref, lazy } from 'yup'
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

export default defineComponent({
  name: 'Playground',
  setup() {
    const defaultCode = `
// Hint:
// 1. You could edit this to use your schema
// 2. You could access \`yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy and its methods\`

const schema = object()
  .strict()
  .required()
  .noUnknown()
  .shape({
    // basic
    name: string().strict().required().trim(),
    password: string().required().min(8),
    emails: array().required().min(1).of(
      string().defined().email(),
    ),

    // ref
    confirmPassword: ref('password'),

    // lazy
    children: lazy(() => schema.notRequired().default(undefined)),
  })
    `.trim()
    const custom = reactive({
      fake() {
        const schema = new Function(
          'yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy',
          '"use strict"; ' + custom.code + '; return schema;',
        )(yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy)
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
