<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { Room } from '@/contracts/room'
import type { User } from '@/contracts/user'
import type { Video } from '@/contracts/video'
// * Types

import { parseVideo } from '@/helpers'
import { RoutesNames } from '@/config/router'
import { useUserData } from '@/store/userDataStore'

// * Components
import List from './List.vue'
import Link from './Link.vue'
import Button from './Button.vue'
// * Components

const userData = useUserData()
const props = defineProps({
  item: {
    type: Object as PropType<Room>,
    required: true,
  },
})

const video: Video = parseVideo(props.item.video)
const user: User = props.item.creator[0]
</script>

<template>
  <div class="RoomCard Box">

    <div class="RoomCard__img">
      <img :src="video.poster" alt="">
    </div>

    <div>
      <h1 class="Font Font__title Font__bold">{{ video.name }}</h1>

      <List v-slot="{ classNames, textClassName }" class="RoomCard__list">
      
        <li :class="classNames">
          <span :class="textClassName" class="Font Font__text Font__regular">
            Creator: 
            <Link :to="{ name: RoutesNames.USER, params: { id: user.id } }" weight="regular" size="text">{{ user.nickname }}</Link>
          </span>
        </li>

        <li :class="classNames">
          <span :class="textClassName" class="Font Font__text Font__regular">Users count: {{ props.item.usersCount }}</span>
        </li>

        <li :class="classNames">
          <span :class="textClassName" class="Font Font__text Font__regular">Date of creation: {{ props.item.createdAtForUser }}</span>
        </li>

      </List>
    </div>

    <Button 
      v-if="userData.user"
      :to="{ name: RoutesNames.ROOM, params: { slug: props.item.slug } }" 
      type="anchor" 
      class="RoomCard__join"
    >Join</Button>

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