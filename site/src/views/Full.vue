<template lang="pug">
Link(label="yup" level="1")
template(v-for="schemas, type of schemasOfType" :key="type")
  Link(:label="type" level="2")

  template(v-for="schema, label of schemas" :key="schema")
    demo-generator(:label="label + ''" :snippet="schema")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const schemasOfType = {
      'yup.ref': {
        '': `
const schema = object({
  key: mixed(),
  ref: ref('key')
})
  .defined().strict().noUnknown()
`.trim(),
      },
      'yup.lazy': {
        '': `
const schema = object()
  .strict().required().noUnknown().shape({
    value: number().strict().required().min(0).max(100),
    left: mixed().when('value', {
      is: value => value > 60,
      then: lazy(() => schema),
      otherwise: mixed().defined().oneOf([undefined]),
    }),
    right: mixed().when('value', {
      is: value => value > 60,
      then: lazy(() => schema),
      otherwise: mixed().defined().oneOf([undefined]),
    }),
  })
`.trim(),
      },
      'yup.mixed': {
        'yup.mixed.default': `const schema = mixed()
  .default("A default value")`,
        'yup.mixed.nullable': `const schema = mixed()
  .nullable()
  .defined()`,
        'yup.mixed.required': `const schema = mixed()
  .required()`,
        'yup.mixed.notRequired': `const schema = mixed()
  .notRequired()`,
        'yup.mixed.defined': `const schema = mixed()
  .defined()`,
        'yup.mixed.oneOf': `const schema = mixed()
  .oneOf(['foo', 42])
  .defined()`,
        'yup.mixed.notOneOf': `const schema = number()
  .notOneOf([1, 2])
  .defined().integer().min(1).max(5)`,
        'yup.mixed.when': `
const schema = object().defined().strict().noUnknown().shape({
  value: boolean().defined(),
  reverse: boolean().defined().when('value', {
    is: value => value,
    then: boolean().isFalse(),
    otherwise: boolean().isTrue(),
  })
})
`.trim(),
      },
      'yup.boolean': {
        'yup.boolean.isTrue': `const schema = boolean()
  .isTrue()
  .defined()`,
        'yup.boolean.isFalse': `const schema = boolean()
  .isFalse()
  .defined()`,
      },
      'yup.number': {
        'yup.number.min': `const schema = number()
  .min(1)
  .defined().integer().max(5)`,
        'yup.number.max': `const schema = number()
  .max(5)
  .defined().integer().min(1)`,
        'yup.number.moreThan': `const schema = number()
  .moreThan(1)
  .defined().integer().lessThan(5)`,
        'yup.number.lessThan': `const schema = number()
  .lessThan(5)
  .defined().integer().moreThan(1)`,
        'yup.number.positive': `const schema = number()
  .positive()
  .defined().max(5)`,
        'yup.number.negative': `const schema = number()
  .negative()
  .defined().min(-5)`,
        'yup.number.integer': `const schema = number()
  .integer()
  .defined().min(-5).max(5)`,
      },
      'yup.date': {
        'yup.date.min': `const schema = date()
  .min(new Date())
  .defined()`,
        'yup.date.max': `const schema = date()
  .max(new Date())
  .defined()`,
      },
      'yup.string': {
        'yup.string.required': `const schema = string()
  .required()`,
        'yup.string.length': `const schema = string()
  .length(5)
  .defined()`,
        'yup.string.min': `const schema = string()
  .min(5)
  .defined()`,
        'yup.string.max': `const schema = string()
  .max(5)
  .defined()`,
        'yup.string.matches': `const schema = string()
  .matches(/\\w{1,5}/)
  .defined()`,
        'yup.string.email': `const schema = string()
  .email()
  .defined()`,
        'yup.string.url': `const schema = string()
  .url()
  .defined()`,
        'yup.string.uuid': `const schema = string()
  .uuid()
  .defined()`,
        'yup.string.trim': `const schema = string()
  .trim()
  .defined().strict()`,
        'yup.string.lowercase': `const schema = string()
  .lowercase()
  .defined().strict()`,
        'yup.string.uppercase': `const schema = string()
  .uppercase()
  .defined().strict()`,
      },
      'yup.array': {
        'yup.array.of': `const schema = array()
  .of(mixed())
  .defined()`,
        'yup.array.length': `const schema = array()
  .length(5)
  .defined()`,
        'yup.array.min': `const schema = array()
  .min(5)
  .defined()`,
        'yup.array.max': `const schema = array()
  .max(5)
  .defined()`,
      },
      'yup.object': {
        'yup.object.shape': `const schema = object()
  .shape({ key: mixed() })
  .defined()`,
        'yup.object.noUnknown': `const schema = object()
  .noUnknown()
  .defined().strict().shape({ key: mixed() })`,
      },
    }

    return {
      schemasOfType,
    }
  },
})
</script>
