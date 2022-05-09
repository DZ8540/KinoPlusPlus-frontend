<script lang="ts" setup>
// * Types
import type { PropType, Ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { UnparsedVideo, Video, WishlistActions } from '@/contracts/video'
// * Types

import UserService from '@/services/UserService'
import { ref } from 'vue'
import { Duration } from 'luxon'
import { useUserData } from '@/store/userDataStore'

// * Components
import Icon from './Icon.vue'
// * Components

const userData = useUserData()
const props = defineProps({
  item: {
    type: Object as PropType<UnparsedVideo>,
    required: true,
  },
  to: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: '#'
  },
})

const item: Ref<Video> = ref({ ...parseItem(props.item) })

function parseItem(item: UnparsedVideo): Video {
  const duration: string = Duration.fromISOTime(item.duration).toFormat("mm 'minutes'")
  const rating: string = item.rating.replace('.', ',')
  const ageLimit: string = `+${item.ageLimit}`
  const wishlistStatus: boolean = item.wishlistStatus ?? false

  return {
    ...item,
    duration,
    rating,
    ageLimit,
    wishlistStatus,
  }
}

async function wishlistAction(): Promise<void> {
  const wishlistStatus: boolean = item.value.wishlistStatus
  const action: WishlistActions = wishlistStatus ? 'delete' : 'add'

  try {
    await UserService.wishlistAction(item.value.id, action)
    item.value.wishlistStatus = !wishlistStatus
  } catch (err: any) {}
}
</script>

<template>
  <div class="Card">
    <div class="Card__header">

      <router-link class="Card__imgLink" :to="props.to">
        <img :src="item.poster" class="Card__img transition" alt="">
      </router-link>

      <div v-if="userData.user" class="Card__later transition">
        <!-- <Icon type="CLOCK_SOLID" v-if="item.wishlistStatus" /> -->
        <Icon type="CLOCK" />
      </div>

      <div v-if="userData.user" class="Card__right transition">
        <div @click="wishlistAction" class="Card__wishlist">
          <Icon type="HEART_SOLID" v-if="item.wishlistStatus" />
          <Icon type="HEART" v-else />
        </div>

        <span class="Card__ageLimit Font Font__text Font__regular Card__yellow">{{ item.ageLimit }}</span>
      </div>

      <div class="Card__bottom transition">
        <span class="Card__attribute Font Font__regular Font__text Card__yellow">{{ item.rating }}</span>
        <span class="Card__attribute Font Font__regular Font__text Card__yellow">{{ item.duration }}</span>
      </div>
    </div>

    <div class="Card__footer">
      <router-link :to="props.to" class="Link Card__name Font Font__text Font__regular transition">{{ item.name }}</router-link>
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