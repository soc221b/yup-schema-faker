<template lang="pug">
h1 Playground
br
Wrapper
  fake-button(@click="custom.fake")
  copy-button(:modelValue="custom.data")
  pre.my-1
    code.js.block.rounded.border.bg-gray-300.text-gray-800.p-2.overflow-scroll(contenteditable @input="handleInput") {{ custom.code }}
  Preview(:modelValue="custom.data")
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { mixed, bool, boolean, number, string, date, array, object } from 'yup'
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

export default defineComponent({
  name: 'Playground',
  setup() {
    const custom = reactive({
      fake() {
        custom.data = fake(eval(custom.code))
      },
      data: undefined,
      code: `
array().length(5).required().of(
  object()
    .required()
    .noUnknown()
    .shape({
      name: string().required().min(4).max(20),
      age: number().required().min(18).max(100).positive().integer(),
      email: string().nullable().email(),
      website: string().required().url(),
      createdOn: date().default(() => new Date()),
    })
)
      `.trim(),
    })

    const handleInput = e => {
      custom.code = e.target.innerText
    }

    return {
      custom,
      handleInput,
    }
  },
})
</script>
