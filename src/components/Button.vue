<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Type } from '@/contracts/button'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps({
  type: {
    type: String as PropType<Type>,
    required: true,
  },
  to: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: '#',
  }
})
</script>

<template>
  <button class="Button Font Font__bold Font__text transition" v-if="props.type == 'button'">
    <slot name="button">Button</slot>
  </button>

  <router-link :to="props.to" class="Button Font Font__bold Font__text transition Link__forButton" v-else>
    <slot name="anchor">Button</slot>
  </router-link>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Button
  display: inline-flex
  justify-content: center
  align-items: center
  height: 50px
  padding: 0 30px
  background-color: $yellow
  border-radius: 10px
  border: 5px solid $yellow
  text-decoration: none !important
  &:hover
    background-color: transparent

  @media (max-width: 1100px)
    height: 40px

  @media (max-width: 400px)
    padding: 0 20px

  @media (max-width: 350px)
    padding: 0 20px
</style>