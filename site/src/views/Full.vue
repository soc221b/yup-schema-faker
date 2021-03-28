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
  .defined()
  .strict()
  .noUnknown()
`.trim(),
      },
      'yup.lazy': {
        '': `
const schema = object()
  .strict()
  .required()
  .noUnknown()
  .shape({
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
        'yup.mixed.default': 'const schema = mixed().default("A default value")',
        'yup.mixed.nullable': 'const schema = mixed().defined().nullable()',
        'yup.mixed.required': 'const schema = mixed().required()',
        'yup.mixed.notRequired': 'const schema = mixed().notRequired()',
        'yup.mixed.defined': 'const schema = mixed().defined()',
        'yup.mixed.oneOf': "const schema = mixed().defined().oneOf(['foo', 42])",
        'yup.mixed.notOneOf': 'const schema = number().defined().notOneOf([1, 2]).integer().min(1).max(5)',
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
        'yup.boolean.isTrue': 'const schema = boolean().defined().isTrue()',
        'yup.boolean.isFalse': 'const schema = boolean().defined().isFalse()',
      },
      'yup.number': {
        'yup.number.min': 'const schema = number().defined().min(1).integer().max(5)',
        'yup.number.max': 'const schema = number().defined().max(5).integer().min(1)',
        'yup.number.moreThan': 'const schema = number().defined().moreThan(1).integer().lessThan(5)',
        'yup.number.lessThan': 'const schema = number().defined().lessThan(5).integer().moreThan(1)',
        'yup.number.positive': 'const schema = number().defined().positive().max(5)',
        'yup.number.negative': 'const schema = number().defined().negative().min(-5)',
        'yup.number.integer': 'const schema = number().defined().integer().min(-5).max(5)',
      },
      'yup.date': {
        'yup.date.min': 'const schema = date().defined().min(new Date())',
        'yup.date.max': 'const schema = date().defined().max(new Date())',
      },
      'yup.string': {
        'yup.string.required': 'const schema = string().required()',
        'yup.string.length': 'const schema = string().defined().length(5)',
        'yup.string.min': 'const schema = string().defined().min(5)',
        'yup.string.max': 'const schema = string().defined().max(5)',
        'yup.string.matches': 'const schema = string().defined().matches(/\\w{1,5}/)',
        'yup.string.email': 'const schema = string().defined().email()',
        'yup.string.url': 'const schema = string().defined().url()',
        'yup.string.uuid': 'const schema = string().defined().uuid()',
        'yup.string.trim': 'const schema = string().defined().strict().trim()',
        'yup.string.lowercase': 'const schema = string().defined().strict().lowercase()',
        'yup.string.uppercase': 'const schema = string().defined().strict().uppercase()',
      },
      'yup.array': {
        'yup.array.of': 'const schema = array().defined().of(mixed())',
        'yup.array.length': 'const schema = array().defined().length(5)',
        'yup.array.min': 'const schema = array().defined().min(5)',
        'yup.array.max': 'const schema = array().defined().max(5)',
      },
      'yup.object': {
        'yup.object.shape': 'const schema = object().defined().shape({ key: mixed() })',
        'yup.object.noUnknown': 'const schema = object().defined().strict().noUnknown().shape({ key: mixed() })',
      },
    }

    return {
      schemasOfType,
    }
  },
})
</script>
