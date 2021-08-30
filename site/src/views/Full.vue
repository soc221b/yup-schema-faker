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
  .noUnknown()
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
      'yup.mixed': {
        'yup.mixed.default': `const schema = mixed()
  .default("A default value")`,
        'yup.mixed.nullable': `const schema = mixed()
  .nullable()`,
        'yup.mixed.required': `const schema = mixed()
  .required()`,
        'yup.mixed.notRequired': `const schema = mixed()
  .notRequired()`,
        'yup.mixed.defined': `const schema = mixed()
  .defined()`,
        'yup.mixed.oneOf': `const schema = mixed()
  .oneOf(['foo', 42])`,
        'yup.mixed.notOneOf': `const schema = number()
  .notOneOf([1, 2])
  .integer().min(1).max(5)`,
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
  .isTrue()`,
        'yup.boolean.isFalse': `const schema = boolean()
  .isFalse()`,
      },
      'yup.number': {
        'yup.number.min': `const schema = number()
  .min(20)
  .max(100)`,
        'yup.number.max': `const schema = number()
  .max(-20)
  .min(-100)`,
        'yup.number.moreThan': `const schema = number()
  .moreThan(20)
  .lessThan(100)`,
        'yup.number.lessThan': `const schema = number()
  .lessThan(-20)
  .moreThan(-100)`,
        'yup.number.positive': `const schema = number()
  .positive()`,
        'yup.number.negative': `const schema = number()
  .negative()`,
        'yup.number.integer': `const schema = number()
  .integer()`,
      },
      'yup.date': {
        'yup.date.min': `const schema = date()
  .min(new Date())`,
        'yup.date.max': `const schema = date()
  .max(new Date())`,
      },
      'yup.string': {
        'yup.string.required': `const schema = string()
  .required()`,
        'yup.string.length': `const schema = string()
  .length(10)`,
        'yup.string.min': `const schema = string()
  .min(10)`,
        'yup.string.max': `const schema = string()
  .max(10)`,
        'yup.string.matches': `const schema = string()
  .matches(/(foo|bar|baz)/)`,
        'yup.string.email': `const schema = string()
  .email()`,
        'yup.string.url': `const schema = string()
  .url()`,
        'yup.string.uuid': `const schema = string()
  .uuid()`,
        'yup.string.trim': `const schema = string()
  .trim()
  .strict()`,
        'yup.string.lowercase': `const schema = string()
  .lowercase()
  .strict()`,
        'yup.string.uppercase': `const schema = string()
  .uppercase()
  .strict()`,
      },
      'yup.array': {
        'yup.array.of': `const schema = array()
  .of(mixed())`,
        'yup.array.min': `const schema = array()
  .min(5)`,
        'yup.array.max': `const schema = array()
  .max(5)`,
      },
      'yup.object': {
        'yup.object.shape': `const schema = object()
  .shape({ key: mixed() })`,
        'yup.object.noUnknown': `const schema = object()
  .noUnknown()
  .shape({ key: mixed() })`,
      },
    }

    return {
      schemasOfType,
    }
  },
})
</script>
