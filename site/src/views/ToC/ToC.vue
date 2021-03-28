<template lang="pug">
template(v-for="node of descendants" :key="node.id")
  a.block.mt-1.whitespace-nowrap.overflow-x-auto(:style="{ 'marginLeft': level * 24 + 'px' }" :href="`#${node.id}`") # {{ node.name }}
  ToC(v-if="node.descendants" :descendants="node.descendants" :level="node.level")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToC',
  props: ['descendants', 'level'],
})
</script>
