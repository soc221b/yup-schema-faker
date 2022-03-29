<template lang="pug">
.app.p-2.pb-5.mb-5(class="text-[#24292f] bg-[#ffffff] dark:text-[#c9d1d9] dark:bg-[#0d1117]")
  .mx-auto.w-screen-96.max-w-1080
    Header
    br
    hr
    main
      section
        Playground
      br
      hr
      section
        Full
      br
      hr
      section
        Custom
BackToTop
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './views/Header.vue'
import Playground from './views/Playground.vue'
import Full from './views/Full.vue'
import Custom from './views/Custom/index.vue'
import BackToTop from './views/BackToTop.vue'

export default defineComponent({
  components: {
    Header,
    Playground,
    Full,
    Custom,
    BackToTop,
  },
})
</script>

<style scoped>
.app {
  min-width: 320px;
}

.w-screen-96 {
  width: 96vw;
}

.max-w-1080 {
  max-width: 1080px;
}
</style>
