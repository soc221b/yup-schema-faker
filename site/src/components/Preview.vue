<template lang="pug">
Link(v-if="label" :label="label" level="3")
div.mb-5
  fake-button(@click="fake")
  copy-button(:text="data")
  button.text-black.px-2.m-0.ml-1.rounded.border.border-gray-400(@click="() => visible = !visible" :class="{visible}") Show {{ visible ? 'result' : 'snippet' }}
  Data.mt-1(v-show="visible" :data="snippet" is-snippet :class="{visible}" :contenteditable="contenteditable" @change="value => emit('update:snippet', value)")
  Data.mt-1(v-show="!visible" :data="data")
</template>

<script>
import { computed, defineComponent, onMounted, onUpdated, ref, watchEffect } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
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
      type: Function,
    },
    snippet: {
      required: true,
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
  setup(props, { emit }) {
    return {
      visible: ref(false),
      emit,
    }
  },
})
</script>
