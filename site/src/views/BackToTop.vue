<template lang="pug">
button.flex.items-center.justify-center.fixed.z-10.rounded-full.h-12.w-12.border.text-black.right-5.bottom-5.border-gray-400.bg-gray-200(@click="backToTop") Top
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const backToTop = () => {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
    }

    return {
      backToTop,
    }
  },
})
</script>
