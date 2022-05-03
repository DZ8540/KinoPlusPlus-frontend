<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
// * Types

import { onMounted, reactive } from 'vue'
import { FontSizeTypes, FontWeightTypes } from '@/contracts/fonts'
import { castFontClass, FONT_SIZES, FONT_WEIGHTS } from '@/config/fonts'

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

const defaultClassNames: string[] = reactive(['Link', 'Font', 'transition'])

function addClassName(className: string): void {
  defaultClassNames.push(castFontClass(className))
}

onMounted(() => {
  addClassName(props.size)
  addClassName(props.weight)
})
</script>

<template>
  <router-link :to="props.to" :class="defaultClassNames">
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