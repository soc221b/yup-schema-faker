<template lang="pug">
.app.bg-white.p-2
  .mx-auto.w-screen-96.max-w-1080
    Header
    br
    hr
    Playground
    br
    hr
    Demo
</template>

<script>
import { defineComponent } from 'vue'
import Header from './views/header/index.vue'
import Demo from './views/demo/index.vue'
import Playground from './views/playground/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Demo,
    Playground,
  },
})
</script>

<style scoped>
.app {
  min-width: 320px;
  min-height: 3000px;
}

.w-screen-96 {
  width: 96vw;
}

.max-w-1080 {
  max-width: 1080px;
}
</style>
