<template lang="pug">
transition(name="fade")
  button.flex.items-center.justify-center.fixed.z-10.rounded-full.h-12.w-12.border.right-5.bottom-5.border-gray-400.bg-gray-200(v-show="isVisible" @click="backToTop") Top
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export default defineComponent({
  setup() {
    const backToTop = () => {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
    }

    const isVisible = ref(false)
    useEventListener(window, 'scroll', () => {
      isVisible.value = window.scrollY > 300
    })

    return {
      backToTop,
      isVisible,
    }
  },
})
</script>
