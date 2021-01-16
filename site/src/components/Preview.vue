<template lang="pug">
pre.w-100(v-show="modelValue !== undefined" ref="visualizer")
pre.object-visualizer(v-show="modelValue === undefined")
  span.null
    span.key $
    span.separator :&nbsp;
    span.value undefined
</template>

<script>
import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import { mount } from 'object-visualizer'

export default defineComponent({
  name: 'Preview',
  props: {
    modelValue: {
      required: true,
    },
  },
  setup(props) {
    const mounted = ref(false)
    onMounted(() => (mounted.value = true))

    const visualizer = ref()
    watchEffect(() => {
      if (mounted.value === false) return
      mount(props.modelValue, visualizer.value, { rootName: '$', expandOnCreatedAndUpdated: () => true })
    })
    return {
      visualizer,
    }
  },
})
</script>
