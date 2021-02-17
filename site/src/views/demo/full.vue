<template lang="pug">
template(v-for="schemas, type of schemasOfType" :key="type")
  hr
  h1.text-black.mb-2 {{ type }}

  template(v-for="schema of schemas" :key="schema")
    demo-generator(:snippet="schema")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const schemasOfType = {
      Ref: [
        `
const schema = object({
  key: mixed(),
  ref: ref('key')
})
  .strict()
  .defined()
  .noUnknown()
`.trim(),
        `
const schema = object({
  value: string(),
  left: lazy(() => schema.optional()),
  right: lazy(() => schema.optional())
})
  .strict()
  .defined()
  .noUnknown()
`.trim(),
      ],
      Mixed: [
        'const schema = mixed().default("A default value")',
        'const schema = mixed().nullable()',
        'const schema = mixed().required()',
        'const schema = mixed().notRequired()',
        'const schema = mixed().defined()',
        'const schema = number().integer().min(1).max(5).oneOf([1, 2])',
        'const schema = number().integer().min(1).max(5).notOneOf([1, 2])',
        `
const schema = object().strict().defined().noUnknown().shape({
  value: boolean().defined(),
  reverse: boolean().defined().when('value', {
    is: value => value,
    then: boolean().isFalse(),
    otherwise: boolean().isTrue(),
  })
})
`.trim(),
      ],
      Boolean: ['const schema = boolean().isTrue()', 'const schema = boolean().isFalse()'],
      Number: [
        'const schema = number().min(10).max(20)',
        'const schema = number().moreThan(20).lessThan(10)',
        'const schema = number().positive()',
        'const schema = number().negative()',
        'const schema = number().integer()',
      ],
      Date: ['const schema = date().min(new Date())', 'const schema = date().max(new Date())'],
      String: [
        'const schema = string().required()',
        'const schema = string().length(10)',
        'const schema = string().min(10)',
        'const schema = string().max(10)',
        'const schema = string().matches(/\\w{5,10}/)',
        'const schema = string().email()',
        'const schema = string().url()',
        'const schema = string().uuid()',
        'const schema = string().strict().trim()',
        'const schema = string().strict().lowercase()',
        'const schema = string().strict().uppercase()',
      ],
      Array: [
        'const schema = array().of(mixed())',
        'const schema = array().length(10)',
        'const schema = array().min(10)',
        'const schema = array().max(10)',
      ],
      Object: [
        'const schema = object().shape({ key: mixed() })',
        'const schema = object().strict().noUnknown().shape({ key: mixed() })',
      ],
    }

    return {
      schemasOfType,
    }
  },
})
</script>
