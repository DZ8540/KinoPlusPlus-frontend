<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
// * Types

import State from './index'
import { FONT_SIZES, FONT_WEIGHTS } from '@/config/fonts'
import { FontSizeTypes, FontWeightTypes } from '@/contracts/fonts'

const state = new State()
const props = defineProps({
  weight: {
    type: String as PropType<typeof FONT_WEIGHTS[number]>,
    default: FONT_WEIGHTS[FontWeightTypes.REGULAR],
  },
  size: {
    type: String as PropType<typeof FONT_SIZES[number]>,
    default: FONT_SIZES[FontSizeTypes.TEXT],
  },
  to: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: '#'
  },
})

state.addClassName(props.weight)
state.addClassName(props.size)
</script>

<template>
  <router-link :to="props.to" :class="state.defaultClassNames">
    <slot>Link</slot>
  </router-link>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Link
  text-decoration: underline !important
  &--active, &:hover
    color: $yellow !important
</style>