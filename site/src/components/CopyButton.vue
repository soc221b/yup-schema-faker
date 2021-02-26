<template lang="pug">
button.text-black.px-2.m-0.ml-1.rounded.border.border-gray-400(@click="handleClick") {{ buttonLabel }}
input(v-show="inputVisible" ref="input" :value="text === undefined ? 'undefined' : JSON.stringify(text)")
</template>

<script>
import { defineComponent, nextTick, ref } from 'vue'

export default defineComponent({
  props: {
    text: {
      required: true,
    },
  },
  setup(props) {
    const buttonLabel = ref('Copy')

    const input = ref()
    const inputVisible = ref(false)
    const handleClick = async () => {
      inputVisible.value = true
      await nextTick()
      input.value.select()
      input.value.setSelectionRange(0, 99999)
      document.execCommand('copy')
      inputVisible.value = false

      buttonLabel.value = 'Copied!'
      setTimeout(() => {
        buttonLabel.value = 'Copy'
      }, 500)
    }
    return {
      input,
      inputVisible,
      buttonLabel,
      handleClick,
    }
  },
})
</script>
