<template lang="pug">
button.text-blue-400.px-2.m-0.rounded.border.border-blue-400(v-bind="$attrs" @click="handleClick") {{ text }}
</template>

<script>
import { defineComponent, nextTick, ref } from 'vue'

export default defineComponent({
  name: 'fake-button',
  emits: ['click'],
  setup(props, context) {
    const text = ref('Fake')
    const handleClick = async () => {
      context.emit('click')
      text.value = 'Faked!'
      setTimeout(() => {
        text.value = 'Fake'
      }, 500)
    }
    return {
      text,
      handleClick,
    }
  },
})
</script>
