<template lang="pug">
div
  slot
br
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'wrapper',
})
</script>
