<template lang="pug">
button.font-bold.px-2.m-0.rounded.border.border-gray-400(v-bind="$attrs" @click="() => handleClick()") {{ text }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['click'],
  setup(_, context) {
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
