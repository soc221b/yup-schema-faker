<template lang="pug">
Link(label="Yup" level="2")
template(v-for="schemas, type of schemasOfType" :key="type")
  Link(:label="type" level="3")

  template(v-for="schema, label of schemas" :key="schema")
    demo-generator(:label="label + ''" :snippet="schema")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const schemasOfType = {
      'Yup.ref': {
        '': `
const refSchema = ref('key')
const schema = object({
  key: mixed(),
  ref: refSchema
})
  .noUnknown()
`.trim(),
      },
      'Yup.lazy': {
        '': `
const schema = object()
  .strict().required().noUnknown().shape({
    value: number().strict().required().min(0).max(100),
    left: mixed().when('value', {
      is: value => value > 60,
      then: lazy(() => schema),
      otherwise: mixed().oneOf([undefined]),
    }),
    right: mixed().when('value', {
      is: value => value > 60,
      then: lazy(() => schema),
      otherwise: mixed().oneOf([undefined]),
    }),
  })
`.trim(),
      },
      'Yup.Schema': {
        'Yup.Schema.default': `const schema = mixed().default("A default value")`,
        'Yup.Schema.nullable': `const schema = mixed().nullable()`,
        'Yup.Schema.required': `const schema = mixed().required()`,
        'Yup.Schema.notRequired': `const schema = mixed().notRequired()`,
        'Yup.Schema.defined': `const schema = mixed().defined()`,
        'Yup.Schema.oneOf': `const schema = mixed().oneOf(['foo', 42])`,
        'Yup.Schema.notOneOf': `const schema = number().notOneOf([1, 2])
  .integer().min(1).max(5)`,
        'Yup.Schema.when': `
const oppositeSchema = boolean().when('value', {
  is: value => value,
  then: boolean().isFalse(),
  otherwise: boolean().isTrue(),
})
  .defined()
const schema = object().defined().strict().noUnknown().shape({
  value: boolean().defined(),
  opposite: oppositeSchema,
})
`.trim(),
      },
      'Yup.boolean': {
        'Yup.boolean.isTrue': `const schema = boolean().isTrue()`,
        'Yup.boolean.isFalse': `const schema = boolean().isFalse()`,
      },
      'Yup.number': {
        'Yup.number.min': `const schema = number().min(1)
  .integer().max(3)`,
        'Yup.number.max': `const schema = number().max(3)
  .integer().min(1)`,
        'Yup.number.moreThan': `const schema = number().moreThan(1)
  .integer().max(3)`,
        'Yup.number.lessThan': `const schema = number().lessThan(3)
  .integer().min(1)`,
        'Yup.number.positive': `const schema = number().positive()`,
        'Yup.number.negative': `const schema = number().negative()`,
        'Yup.number.integer': `const schema = number().integer()`,
      },
      'Yup.date': {
        'Yup.date.min': `const schema = date().min(new Date())`,
        'Yup.date.max': `const schema = date().max(new Date())`,
      },
      'Yup.string': {
        'Yup.string.required': `const schema = string().required()`,
        'Yup.string.length': `const schema = string().length(10)`,
        'Yup.string.min': `const schema = string().min(10)`,
        'Yup.string.max': `const schema = string().max(10)`,
        'Yup.string.matches': `const schema = string().matches(/(foo|bar|baz)/)`,
        'Yup.string.email': `const schema = string().email()`,
        'Yup.string.url': `const schema = string().url()`,
        'Yup.string.uuid': `const schema = string().uuid()`,
        'Yup.string.trim': `const schema = string().trim()
  .strict()`,
        'Yup.string.lowercase': `const schema = string().lowercase()
  .strict()`,
        'Yup.string.uppercase': `const schema = string().uppercase()
  .strict()`,
      },
      'Yup.array': {
        'Yup.array.of': `const schema = array().of(mixed())`,
        'Yup.array.length': `const schema = array().length(5)`,
        'Yup.array.min': `const schema = array().min(5)`,
        'Yup.array.max': `const schema = array().max(5)`,
      },
      'Yup.object': {
        'Yup.object.shape': `const schema = object().shape({
  key: mixed()
})`,
        'Yup.object.noUnknown': `const schema = object().noUnknown()
  .shape({ key: mixed() })`,
      },
    }

    return {
      schemasOfType,
    }
  },
})
</script>
