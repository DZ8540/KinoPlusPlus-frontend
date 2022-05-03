<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
// * Types

const props = defineProps({
  to: {
    type: Object as PropType<RouteLocationRaw>,
    default: '/',
  },
  imageHref: {
    type: String,
    default: '/src/assets/img/achievementEmblem.png'
  }
})
</script>

<template>
  <router-link :to="props.to" class="Box AchievementCard">
    <div class="AchievementCard__header">
      <img :src="props.imageHref" class="AchievementCard__img" alt="">
    </div>

    <div class="AchievementCard__footer">
      <span class="Link AchievementCard__name Font Font__text Font__regular transition">
        <slot>Achievement card</slot>
      </span>
    </div>
  </router-link>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.AchievementCard
  display: flex
  flex-direction: column
  align-items: center
  text-decoration: none !important
  &__header
    max-height: 100px
    max-width: 100px
    margin-bottom: 20px

  &:hover
    .Link
      color: $yellow

  @media (max-width: 800px)
    &__name
      display: block
      text-align: center

  @media (max-width: 350px)
    &__header
      margin-bottom: 10px
      max-height: 80px
      max-width: 80px
</style>