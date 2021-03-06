<template lang="pug">
Link(label="Custom" level="1")
template(v-for="schemas, type of schemasOfType" :key="type")
  Link(:label="type" level="2")

  template(v-for="schema, label of schemas" :key="schema")
    demo-generator(:label="label" :snippet="schema")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './string-json'
import './custom-mixed'

export default defineComponent({
  setup() {
    const schemasOfType = {
      fakeDedicatedTest: {
        'yup.string.json': `
// fake a list of emails and stringify it.
const schema = string()
  .defined()
  .strict()
  .json(
    array()
      .defined()
      .of(
        string()
          .defined()
          .email()
      )
  )
`.trim(),
      },
      addFaker: {
        customMixed: `
// just like yup.mixed
const schema = customMixed()
  .defined()
  .strict()
  .oneOf([42])
`.trim(),
      },
    }

    return {
      schemasOfType,
    }
  },
})
</script>
