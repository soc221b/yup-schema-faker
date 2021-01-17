<template lang="pug">
.app.my-5.m-auto(class="w-1/2")
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
}
</style>
