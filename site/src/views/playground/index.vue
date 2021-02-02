<template lang="pug">
h1 Playground
br
Wrapper
  pre.my-1
    code.js.block.rounded.border.bg-gray-300.text-gray-800.p-2.overflow-auto(contenteditable @input.native="handleInput") {{ defaultCode }}
  fake-button.my-1(@click="custom.fake")
  copy-button(:modelValue="custom.data")
  Preview(:modelValue="custom.data")
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { mixed, bool, boolean, string, number, date, array, object, ref, lazy } from 'yup'
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

export default defineComponent({
  name: 'Playground',
  setup() {
    const defaultCode = `
// Hint:
// 1. You could edit this to use your schema and context (optional)
// 2. You could access \`yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy and its methods\`

const registerForm = object()
  .strict()
  .required()
  .noUnknown()
  .shape({
    name: string().strict().required().trim(),
    emails: array().required().min(1).of(string().defined().email()),
    password: string().required().min(8),
    confirmPassword: ref('password'),
  })

const node = mixed().when('value', {
  is: value => value > 60,
  then: lazy(() => tree),
  otherwise: mixed().defined().oneOf([null]),
})
const tree = object()
  .strict()
  .required()
  .noUnknown()
  .shape({
    value: number().strict().required().min(0).max(100),
    left: node,
    right: node,
  })

const schema = mixed().when('$isRegisterForm', {
  is: value => value,
  then: registerForm,
  otherwise: tree,
})

const context = { isRegisterForm: true }
    `.trim()

    const custom = reactive({
      fake() {
        const [schema, context] = new Function(
          'yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy',
          '"use strict"; ' + custom.code + '; return [schema, context];',
        )(yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy)
        custom.data = fake(schema, { context })
      },
      data: undefined,
      code: defaultCode,
    })
    custom.fake()

    const handleInput = (e: any) => {
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
