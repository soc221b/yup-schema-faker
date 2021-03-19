<template lang="pug">
Preview(:fake="fake" :snippet="snippet" :data="data" :label="label")
</template>

<script>
import { fake } from 'yup-schema-faker'
import { defineComponent, onMounted, ref as vueRef, computed, reactive, toRefs } from 'vue'
import { mixed, bool, boolean, string, number, date, array, object, ref, lazy } from 'yup'
import * as yup from 'yup'

export default defineComponent({
  props: {
    label: {
      default: '',
      type: String,
    },
    snippet: {
      required: true,
      type: String,
    },
    context: Object,
  },
  setup(props) {
    const data = vueRef()
    const schema = vueRef()
    const resetSeedValue = vueRef(true)
    const doFake = () => {
      try {
        schema.value = new Function(
          'yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy',
          '"use strict"; ' + props.snippet + '; return schema;',
        )(yup, mixed, bool, boolean, string, number, date, array, object, ref, lazy)
        data.value = fake(schema.value, { context: props.context })
      } catch (error) {
        alert('Syntax error, please open console to see more info.')
        console.error(error)
      }
    }

    onMounted(() => {
      doFake()
    })

    return {
      data,
      schema,
      fake: doFake,
    }
  },
})
</script>
