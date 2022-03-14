<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Video } from '@/contracts/video'

// * Components
import Button from './Button.vue'
import List from './List/List.vue'
import Link from './Link/Link.vue'
// * Components

const props = defineProps({
  video: {
    type: Object as PropType<Video>,
    required: true,
  },
})
</script>

<template>
  <div class="RoomCard Box">

    <div class="RoomCard__img">
      <img :src="props.video.posterForUser" alt="">
    </div>

    <div>
      <h1 class="Font Font__title Font__bold">{{ props.video.name }}</h1>

      <List v-slot="{ classNames }" class="RoomCard__list">
      
        <li :class="classNames">
          <span class="List__text Font Font__text Font__regular">
            Creator: 
            <Link weight="regular" size="text">User name</Link>
          </span>
        </li>

        <li :class="classNames">
          <span class="List__text Font Font__text Font__regular">Users count: 3</span>
        </li>

        <li :class="classNames">
          <span class="List__text Font Font__text Font__regular">Date of creation: 11.12.11</span>
        </li>

      </List>
    </div>

    <Button type="anchor" class="RoomCard__join">Join</Button>

  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.RoomCard
  display: flex
  position: relative
  &__img
    margin-right: 30px
    img
      height: 250px
      width: 180px
      object-fit: cover
      border-radius: 20px
  &__join
    position: absolute
    bottom: $boxPadding
    right: $boxPadding
  &__list
    margin-top: 10px !important
    .List__li
      margin-bottom: 10px

  @media (max-width: 500px)
    flex-direction: column
    &__img
      margin-right: 0
      margin-bottom: 20px
      display: flex
      justify-content: center
    &__join
      position: static
      margin-top: 20px
      align-self: flex-end
</style>