<template lang="pug">
button.px-2.m-0.ml-1.rounded.border.border-gray-400(@click="handleClick") {{ text }}
input(v-show="inputVisible" ref="input" :value="modelValue === undefined ? 'undefined' : JSON.stringify(modelValue)")
</template>

<script>
import { defineComponent, nextTick, ref } from 'vue'

export default defineComponent({
  name: 'copy-button',
  props: {
    modelValue: {
      required: true,
    },
  },
  setup(props) {
    const text = ref('Copy')

    const input = ref()
    const inputVisible = ref(false)
    const handleClick = async () => {
      inputVisible.value = true
      await nextTick()
      input.value.select()
      input.value.setSelectionRange(0, 99999)
      document.execCommand('copy')
      inputVisible.value = false

      text.value = 'Copied!'
      setTimeout(() => {
        text.value = 'Copy'
      }, 500)
    }
    return {
      input,
      inputVisible,
      text,
      handleClick,
    }
  },
})
</script>
