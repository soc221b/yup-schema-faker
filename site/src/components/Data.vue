<template lang="pug">
pre
  code.rounded.javascript(ref="snippet" v-bind="$attrs" :contenteditable="contenteditable" @input.native="e => emit('input', e)") {{ normalizedData }}
</template>

<script>
import { computed, defineComponent, onMounted, onUpdated, ref, watchEffect } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default defineComponent({
  name: 'Data',
  inheritAttrs: false,
  props: {
    data: {
      required: true,
    },
    isSnippet: {
      default: false,
      type: Boolean,
    },
    contenteditable: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const snippet = ref()
    const highlight = () => {
      hljs.highlightBlock(snippet.value)
    }
    onMounted(highlight)
    onUpdated(highlight)

    const normalizedData = computed(() => {
      if (props.data === undefined) return 'undefined'
      if (props.data === null) return 'null'
      if (props.data instanceof Date) return `[object Date] ("${props.data.toISOString()}")`
      if (props.isSnippet) return props.data
      return JSON.stringify(props.data, null, 2)
    })

    return {
      snippet,
      normalizedData,
      emit,
    }
  },
})
</script>
