<template lang="pug">
.rounded.pb-1.my-2.bg-gray-800.text-gray-400
  button.inline-block.w-full.text-black(@click.stop="visible = !visible") Table of Content
  .m-4(v-show="visible")
    ToC(:descendants="toc")
</template>

<script>
import { defineComponent, nextTick, onMounted, ref, computed, watchEffect } from 'vue'
import ToC from './ToC.vue'
import Contents from 'contents'

window.global = {
  ...window,
  window,
}

export default defineComponent({
  components: {
    ToC,
  },
  setup() {
    const visible = ref(false)

    const toc = ref([])
    onMounted(async () => {
      await nextTick()
      toc.value = Contents().tree()
    })

    return {
      visible,
      toc,
    }
  },
})
</script>
