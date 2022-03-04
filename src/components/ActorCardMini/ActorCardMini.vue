<script lang="ts" setup>
import State from './index'
import type { PropType } from 'vue'
import type { Actor } from '@/contracts/actor'
import type { RouteLocationRaw } from 'vue-router'

const state = new State()
const props = defineProps({
  item: {
    type: Object as PropType<Actor>,
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
  <router-link :to="props.to" class="ActorCardMini">
    <div class="ActorCardMini__img">
      <img :src="state.item.image" :alt="state.item.name">
    </div>
    <span class="Link Font Font__text Font__regular transition">{{ state.item.name }}</span>
  </router-link>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.ActorCardMini
  text-decoration: none !important
  &__img
    height: 80px
    width: 80px
    border-radius: 50%
    overflow: hidden
    img
      object-fit: cover
  &:hover
    .Link
      color: $yellow !important

  @media (max-width: 400px)
    &__img
      height: 60px
      width: 60px
</style>