<template lang="pug">
h1.text-black Playground
br
Preview(:fake="custom.fake" :snippet="custom.snippet" :data="custom.data" contenteditable @update:snippet="handleInput")
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { mixed, bool, boolean, string, number, date, array, object, ref, lazy } from 'yup'
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

export default defineComponent({
  name: 'Playground',
  inheritAttrs: false,
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
        try {
          const [schema, context] = new Function(
            'yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy',
            '"use strict"; ' + custom.snippet + '; return [schema, context];',
          )(yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy)

          custom.data = fake(schema, { context })
        } catch (error) {
          alert('Syntax error, please open console to see more info.')
          console.error(error)
        }
      },
      data: undefined,
      snippet: defaultCode,
    })
    custom.fake()

    const handleInput = (e: any) => {
      custom.snippet = e.target.innerText
    }

    return {
      custom,
      defaultCode,
      handleInput,
    }
  },
})
</script>
