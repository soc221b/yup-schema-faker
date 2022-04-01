<template lang="pug">
Link(label="Playground" level="2")
pre(ref="playground")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Link from '../components/Link.vue'
import sdk from '@stackblitz/sdk'

export default defineComponent({
  components: {
    Link,
  },

  setup() {
    const playground = ref<HTMLPreElement>()
    onMounted(() => {
      if (!playground.value) return

      sdk.embedProjectId(playground.value, 'yup-schema-faker-playground', {
        forceEmbedLayout: true,
        openFile: 'index.ts',
      })
    })

    return {
      playground,
    }
  },
})
</script>
