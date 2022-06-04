<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { ParsedUser } from '@/contracts/user'
import type { RoomMessage, ParsedRoomMessage } from '@/contracts/room'
// * Types

import { reactive } from 'vue'
import { useUserData } from '@/store/userDataStore'
import { parseUser, parseRoomMessage } from '@/helpers'

// * Components
import Link from '@/components/Link.vue'
// * Components

const userData = useUserData()
const props = defineProps({
  item: {
    type: Object as PropType<RoomMessage>,
    required: true,
  }
})

const item: ParsedRoomMessage = parseRoomMessage(props.item)
const user: ParsedUser = parseUser(props.item.user)
const classNames: any[] = reactive(['Message', { 'Message__me': isMineMessage() }])

function isMineMessage(): boolean {
  if (userData.user!.id == user.id)
    return true

  return false
}
</script>

<template>
  <div :class="classNames">
    <div class="Message__header">
      <div>
        <img :src="user.avatar" :alt="user.nickname" class="Message__avatar">
      </div>

      <div class="Message__user">
        <Link class="Message__name">{{ user.nickname }}</Link>
        <span class="Message__time Font Font__mini Font__regular">At {{ item.time }}</span>
      </div>
    </div>

    <div class="Message__body">
      <p class="Message__text Font Font__regular Font__text">{{ item.message }}</p>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Message
  &__header
    display: flex
    margin-bottom: 20px
  &__body 
    .Textarea
      width: 100%
  &__footer
    display: flex
    justify-content: flex-end
    margin-top: 20px
    *
      margin-left: 20px
  &__avatar
    width: 50px
    height: 50px
    border-radius: 50%
    object-fit: cover
  &__user
    margin-left: 20px
    display: flex
    flex-direction: column
  &__notice
    margin: 40px 0 !important
  &__noticeText
    color: $red !important
    text-align: center
  &__me
    padding-right: 20px 
    .Font
      text-align: right
    .Message
      &__header
        justify-content: flex-end
      &__user
        margin-right: 20px
</style>