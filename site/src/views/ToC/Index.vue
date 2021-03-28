<template lang="pug">
.rounded.pb-1.my-2.bg-gray-800.text-gray-400
  button.inline-block.w-full.text-black(@click.stop="visible = !visible") Table of Content
  .m-4(v-show="visible")
    ToC(:descendants="toc")
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import ToC from './ToC.vue'

interface ToC {
  id: string
  name: string
  descendants?: ToC[]
  level: number
}

const isSection = (el: HTMLAnchorElement) => el.href.startsWith(window.location.origin)
const toToC = (el: HTMLAnchorElement): ToC => {
  return {
    id: new URL(el.href).hash.slice(1),
    name: el.innerText,
    descendants: [],
    level: 0,
  }
}
const toToCTree = (tocTree: ToC[], toc: ToC) => {
  const level = toc.id.split('.').length
  toc = { ...toc, level }
  if (level === 1) {
    tocTree.push(toc)
  } else if (level === 2) {
    const descendants = (tocTree[tocTree.length - 1].descendants = tocTree[tocTree.length - 1].descendants ?? [])
    descendants.push(toc)
  } else {
    const descendants = (tocTree[tocTree.length - 1].descendants = tocTree[tocTree.length - 1].descendants ?? [])
    const subDescendants = (descendants[descendants.length - 1].descendants =
      descendants[descendants.length - 1].descendants ?? [])
    subDescendants.push(toc)
  }
  return tocTree
}

export default defineComponent({
  components: {
    ToC,
  },
  setup() {
    const visible = ref(false)

    const toc = ref<ToC[]>([])
    onMounted(async () => {
      await nextTick()

      toc.value = Array.from(document.querySelectorAll('a'))
        .filter(isSection)
        .map(toToC)
        .reduce(toToCTree, [] as ToC[])

      await nextTick()
    })

    return {
      visible,
      toc,
    }
  },
})
</script>
