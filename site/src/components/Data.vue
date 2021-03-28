<template lang="pug">
pre
  code.rounded.javascript(ref="snippet" v-bind="$attrs" :contenteditable="contenteditable" @input.native="onInput" @blur.native="onBlur") {{ normalizedData }}
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated, ref, watchEffect } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default defineComponent({
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
  emits: ['change'],
  setup(props, { emit }) {
    const snippet = ref()
    const highlight = () => {
      // @ts-ignore
      hljs.highlightElement(snippet.value)
    }
    onMounted(highlight)
    onUpdated(highlight)

    const normalizedData = computed(() => {
      if (props.data === undefined) return 'undefined'
      if (props.data === null) return 'null'
      if (props.data instanceof Date) return new Date(props.data).toString()
      if (props.isSnippet) return props.data
      return JSON.stringify(
        props.data,
        (_, value) => {
          if (value === undefined) return '__undefined'
          try {
            if (new Date(value).toISOString() === value) return new Date(value).toString()
          } catch (error) {}
          return value
        },
        2,
      ).replace(/"__undefined"/g, 'undefined')
    })

    const changedSnippet = ref()
    watchEffect(() => {
      changedSnippet.value = props.data
    })
    const onInput = (e: any) => {
      changedSnippet.value = e.target.innerText
    }
    const onBlur = () => {
      emit('change', changedSnippet.value ?? props.data)
    }

    return {
      snippet,
      normalizedData,
      onInput,
      onBlur,
    }
  },
})
</script>
