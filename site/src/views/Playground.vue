<template lang="pug">
Link(label="Playground" level="1")
Preview(:fake="custom.fake" :snippet="custom.snippet" :data="custom.data" contenteditable @update:snippet="onUpdateSnippet")
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from 'vue'
import { mixed, bool, boolean, string, number, date, array, object, ref, lazy } from 'yup'
import * as yup from 'yup'
import { fake } from '../faker'
import { query } from '../utils'

export default defineComponent({
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
    email: string().defined().email(),
    phone: string().matches(/(^\\([0-9]{3}\\)[0-9]{3}-[0-9]{4}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$)/),
    birthday: date().min('1900-01-01T00:00:00Z').max(new Date()),
    password: string().defined().matches(/\\w{8,20}/),
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

    const searchParamKey = 'playground.snippet'
    custom.snippet = query.get(searchParamKey) ?? custom.snippet
    watchEffect(() => {
      query.set(searchParamKey, custom.snippet)
    })

    custom.fake()

    const onUpdateSnippet = (value: string) => {
      custom.snippet = value
    }

    return {
      custom,
      defaultCode,
      onUpdateSnippet,
      query,
    }
  },
})
</script>
