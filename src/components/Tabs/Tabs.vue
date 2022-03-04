<script lang="ts" setup>
import State from './index'
import type { PropType } from 'vue'
import type { Nav } from '@/contracts/tabs'

// * Components
import Tab from '../Tab/Tab.vue'
// * Components

const state = new State()
const props = defineProps({
  totalResult: {
    type: Number,
    default: 0,
  },
  navs: {
    type: Object as PropType<Nav[]>,
    required: true,
  },
})

state.setTotalResults(props.totalResult)
</script>

<template>
  <div class="Tabs">
    <div class="Tabs__menu mb">
      <ul class="Tabs__list">

        <li class="Tabs__li" v-for="item in props.navs">
          <Tab :type="item.tabType" :to="item.to">
            <template #[item.tabType]>{{ item.text }}</template>
          </Tab>
        </li>

      </ul>

      <span class="Tabs__count Font Font__text Font__regular">Results shown: {{ state.totalResults }}</span>
    </div>

    <div class="Tabs__elements">
      <slot></slot>
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
</style>