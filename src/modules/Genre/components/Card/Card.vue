<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { AggregateGenre } from '@/contracts/genre'
// * Types

import State from './index'

const state = new State()
const props = defineProps({
  item: {
    type: Object as PropType<AggregateGenre>,
    required: true,
  },
  to: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: '#'
  },
})

state.setItem(props.item)
</script>

<template>
  <div class="Card">
    <div class="Card__header">

      <router-link class="Card__imgLink" :to="props.to">
        <img src="@/assets/img/empty.jpg" class="Card__img transition" alt="">
      </router-link>

      <div class="Card__bottom transition">
        <span class="Card__attribute Font Font__regular Font__text Card__yellow">Movies: {{ state.item.moviesCount }}</span>
        <!-- <span class="Card__attribute Font Font__regular Font__text Card__yellow">Serials: 105</span>
        <span class="Card__attribute Font Font__regular Font__text Card__yellow">Cartoons: 105</span>
        <span class="Card__attribute Font Font__regular Font__text Card__yellow">Cartoon serials: 105</span> -->
      </div>
    </div>

    <div class="Card__footer">
      <router-link :to="props.to" class="Link Card__name Font Font__text Font__regular transition">{{ state.item.name }}</router-link>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Card
  text-decoration: none !important
  &__header
    margin-bottom: 20px
    width: 100%
    height: 370px
    position: relative
    overflow: hidden
    border-radius: 30px
  &__imgLink
    width: 100%
    height: 100%
    display: block
  &__img
    width: 100%
    height: 100%
    object-fit: cover
  &__later
    position: absolute
    top: $cardPadding
    left: $cardPadding
    opacity: 0
    z-index: 10
  &__right
    position: absolute
    top: $cardPadding
    right: $cardPadding
    display: flex
    flex-direction: column
    opacity: 0
    z-index: 10
  &__ageLimit
    margin-top: 10px
  &__yellow
    color: $yellow !important
  &__bottom
    position: absolute
    bottom: $cardPadding
    left: $cardPadding
    width: calc(100% - ($cardPadding * 2))
    opacity: 0
  &__attribute
    display: block
  &__name
    display: block
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
  &__wishlist
    display: flex
    justify-content: center
    align-content: center
  &:hover
    .Card__img
      opacity: .4
    .Card__name
      color: $yellow
    .Card__later, .Card__right, .Card__bottom
      opacity: 1
  .Icon
    color: $yellow !important

  @media (max-width: 1100px)
    &__header
      height: 300px

  @media (max-width: 500px)
    &__header
      height: 250px
      margin-bottom: 10px

  @media (max-width: 400px)
    &__header
      height: 230px
      border-radius: 20px

  @media (max-width: 350px)
    &__header
      height: 200px
</style>