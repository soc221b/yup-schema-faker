<template lang="pug">
template(v-for="node of descendants" :key="node.id")
  a.block.mt-1(:class="`ml-${level * 4}`" :href="`#${node.id}`") # {{ node.name }}
  ToC(v-if="node.descendants" :descendants="node.descendants" :level="node.level")
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToC',
  props: ['descendants', 'level'],
})
</script>
