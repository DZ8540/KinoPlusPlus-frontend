<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { Actor } from '@/contracts/actor'
import type { RouteLocationRaw } from 'vue-router'
// * Types

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
</script>

<template>
  <router-link :to="props.to" class="ActorCardMini">
    <div class="ActorCardMini__img">
      <img :src="props.item.image" :alt="props.item.name">
    </div>
    <span class="Link Font Font__text Font__regular transition">{{ props.item.name }}</span>
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