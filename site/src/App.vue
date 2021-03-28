<template lang="pug">
.app.bg-white.p-2
  .mx-auto.w-screen-96.max-w-1080
    Header
    br
    hr
    ToC
    hr
    Playground
    hr
    Seed
    hr
    Full
    hr
    Custom
BackToTop
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToC from './views/ToC/Index.vue'
import Header from './views/Header.vue'
import Playground from './views/Playground.vue'
import Seed from './views/Seed.vue'
import Full from './views/Full.vue'
import Custom from './views/Custom/index.vue'
import BackToTop from './views/BackToTop.vue'

export default defineComponent({
  components: {
    ToC,
    Header,
    Playground,
    Seed,
    Full,
    Custom,
    BackToTop,
  },
})
</script>

<style scoped>
.app {
  min-width: 320px;
  min-height: 10000px;
}

.w-screen-96 {
  width: 96vw;
}

.max-w-1080 {
  max-width: 1080px;
}
</style>
