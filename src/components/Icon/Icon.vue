<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { IconsTypes } from '../../contracts/fonts'
// * Types

import State from './index'

const state = new State()
const props = defineProps({
  type: {
    type: String as PropType<keyof typeof IconsTypes>,
    required: true,
  },
})

state.addNewClassNames(props.type)
</script>

<template>
  <i :class="state.defaultClassNames"></i>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

i.Icon
  /* use !important to prevent issues with browser extensions that change fonts
  font-family: 'icons' !important
  speak: never
  font-style: normal
  font-weight: normal
  font-variant: normal
  text-transform: none
  line-height: 1

  /* Better Font Rendering ===========
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  &__lock:before
    content: "\e910"
    color: $red
  &__unlock:before
    content: "\e911"
    color: $green
  &__triangle:before
    content: "\e90f"
  &__user:before
    content: "\e900"
  &__comments:before
    content: "\e901"
  &__bell:before
    content: "\e902"
  &__star
    &:before
      content: "\e903"
    &--solid:before
      content: "\e912"
  &__clock
    &:before
      content: "\e904"
    &--solid:before
      content: "\e915"
  &__heart
    &:before
      content: "\e905"
    &--solid:before
      content: "\e914"
  &__arrow
    display: inline-block
    &:before
      content: "\e906"
    &__top
      transform: rotate(90deg)
    &__bottom
      transform: rotate(-90deg)
    &__right
      transform: rotate(180deg)
  &__search:before
    content: "\e907"
  &__logout:before
    content: "\e908"
  &__sun:before
    content: "\e909"
  &__moon:before
    content: "\e90a"
  &__success:before
    content: "\e90b"
    color: $green
  &__error:before
    content: "\e90c"
    color: $red
  &__plus::before
    content: "\e90c"
    display: inline-block
    transform: rotate(45deg)
  &__play:before
    content: "\e90d"
  &__eye:before
    content: "\e90e"
  &__equals:before
    content: "\e913"
  &:hover
    color: $yellow
</style>