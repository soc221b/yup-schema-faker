<template lang="pug">
Basic
Seed
</template>

<script>
import { defineComponent } from 'vue'
import Basic from './basic.vue'
import Seed from './seed.vue'

export default defineComponent({
  name: 'Demo',
  components: {
    Basic,
    Seed,
  },
})
</script>
