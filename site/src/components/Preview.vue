<template lang="pug">
Link(v-if="label" :label="label" level="3")
div.mb-5
  fake-button(@click="() => fake()")
  copy-button(:text="data")
  Data.mt-1(:data="snippet" is-snippet :contenteditable="contenteditable" @change="value => emit('update:snippet', value)")
  Data.mt-1(:data="data")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FakeButton from './FakeButton.vue'
import CopyButton from './CopyButton.vue'
import Data from './Data.vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    FakeButton,
    CopyButton,
    Data,
  },
  props: {
    label: {
      default: '',
      type: String,
    },
    fake: {
      required: true,
      type: Function,
    },
    snippet: {
      required: true,
      type: String,
    },
    data: {
      required: true,
    },
    contenteditable: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:snippet'],
  setup(_, { emit }) {
    return {
      emit,
    }
  },
})
</script>
