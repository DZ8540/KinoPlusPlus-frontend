<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { MenuItem } from '@/contracts/tabs'
// * Types

const props = defineProps({
  menu: {
    type: Object as PropType<MenuItem[]>,
    required: true,
  },
  totalResult: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="Tabs">
    <div class="Tabs__menu mb">
      <ul class="Tabs__list">

        <li v-for="item of props.menu" class="Tabs__li">
          <router-link :to="item.to" exact-active-class="Tab--active" class="Tab Font Font__regular Font__text transition">{{ item.text }}</router-link>
        </li>

      </ul>

      <span class="Tabs__count Font Font__text Font__regular">Total result: {{ props.totalResult }}</span>
    </div>

    <div class="Tabs__elements">
      <slot>Tabs content</slot>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Tabs
  &__menu
    display: flex
    align-items: flex-end
  &__list
    display: flex
    width: 80%
  &__li
    margin-right: 20px
    &:last-child
      margin-right: 0
  &__count
    width: 20%
    text-align: right

  @media (max-width: 800px)
    &__list
      width: 75%
      overflow-x: scroll
      padding-bottom: 10px !important
    &__count
      width: 25%
      padding-bottom: 10px

  @media (max-width: 500px)
    &__menu
      flex-direction: column
    &__list, &__count
      width: 100%
    &__count
      padding-bottom: 0
      margin-top: 10px

.Tab
  display: flex
  align-items: center
  height: 50px
  padding: 0 30px
  border-radius: 10px
  &--active, &:hover
    color: $yellow !important
</style>