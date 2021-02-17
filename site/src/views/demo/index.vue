<template lang="pug">
Basic
Full
Seed
</template>

<script>
import { defineComponent } from 'vue'
import Basic from './basic.vue'
import Full from './full.vue'
import Seed from './seed.vue'

export default defineComponent({
  name: 'Demo',
  components: {
    Basic,
    Full,
    Seed,
  },
})
</script>
