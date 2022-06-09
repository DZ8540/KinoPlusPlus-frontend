<script lang="ts" setup>
// * Types
import type { ComputedRef, Ref } from 'vue'
import type { Video } from '@/contracts/video'
import type { Paginate } from '@/contracts/api'
import type { ReturnJoinRoomEventPayload } from '@/contracts/webSocket'
import type { Room, RoomMessage, RoomMessagePayload, RoomPayload } from '@/contracts/room'
// * Types

import RoomService from '@/services/RoomService'
import { socket } from '@/api/socket'
import { parseVideo } from '@/helpers'
import { useScroll } from '@vueuse/core'
import { DEFAULT_ROOM } from '@/config/room'
import { Messages } from '@/config/response'
import { RoutesNames } from '@/config/router'
import { DEFAULT_VIDEO } from '@/config/video'
import { useRoute, useRouter } from 'vue-router'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'

// * Components
import Icon from '@/components/Icon.vue'
import Link from '@/components/Link.vue'
import List from '@/components/List.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Message from '../components/Message.vue'
import Accordion from '@/components/Accordion.vue'
// * Components

const route = useRoute()
const router = useRouter()
const userData = useUserData()
const notifications = useNotificationBus()

let item: Ref<Room> = ref({ ...DEFAULT_ROOM })
let video: Ref<Video> = ref({ ...DEFAULT_VIDEO })
const usersCount: Ref<number> = ref(1)
const slug: Room['slug'] = route.params.slug as string
const messages: Ref<RoomMessage[]> = ref([])
const currentMessage: Ref<string> = ref('')
const messagesBoxElement: Ref<HTMLDivElement | null | undefined> = ref(null)
const { arrivedState: messagesBoxElementArrivedState } = useScroll(messagesBoxElement)

const textRoomStatus: ComputedRef<'unlock' | 'lock'> = computed(() => {
  return item.value.isOpen ? 'unlock' : 'lock' 
})

function checkCurrentUser(): boolean {
  if (userData.user!.id == item.value.userId)
    return true

  return false
}

function updateRoom(isOpen: Room['isOpen']): void {
  item.value.isOpen = isOpen
}

function roomDeleted(): void {
  router.push({ name: RoutesNames.HOME })
}

function updateUsersCount(newUsersCount: number): void {
  usersCount.value = newUsersCount
}

function setSocketEmits(): void {
  try {
    socket.on('room:update', updateRoom)
    socket.on('room:newMessage', newMessage)
    socket.on('room:delete', roomDeleted)
    socket.on('room:usersCountUpdate', updateUsersCount)
    socket.on('disconnect', unJoinRoom)
  } catch (err) {
    console.log(err)
  }
}

async function stayBottom(isWithNewMessage: boolean): Promise<void> {
  await nextTick()

  if (isWithNewMessage && !messagesBoxElementArrivedState.bottom)
    return

  messagesBoxElement.value!.scroll({ top: messagesBoxElement.value!.scrollHeight })
}

async function newMessage(msg: RoomMessage): Promise<void> {
  messages.value.push(msg)
  
  stayBottom(true)
}

async function unJoinRoom(): Promise<void> {
  await RoomService.unJoin(item.value.slug)
}

async function update(): Promise<void> {
  try {
    const result: boolean = checkCurrentUser()
    const payload: RoomPayload = {
      isOpen: !item.value.isOpen,
      userId: item.value.userId,
      videoId: item.value.videoId,
    }

    if (!result)
      throw null

    const isOpen: Room['isOpen'] = await RoomService.update(slug, payload)
    item.value.isOpen = isOpen
  } catch (_err: any) {}
}

async function sendMessage(): Promise<void> {
  try {
    const payload: RoomMessagePayload = {
      message: currentMessage.value,
      userId: userData.user!.id,
      roomId: item.value.id,
    }

    const msg: RoomMessage = await RoomService.sendMessage(item.value.slug, payload)
    await newMessage(msg)

    currentMessage.value = ''
  } catch (_err: any) {}
}

onMounted(async () => {
  try {
    const response: ReturnJoinRoomEventPayload = await RoomService.join(slug)
    setSocketEmits()

    item.value = response.room
    video.value = parseVideo(response.room.video)
    updateUsersCount(response.usersCount)
    
    const oldMessages: Paginate<RoomMessage> = await RoomService.getMessages(item.value.slug, { 
      page: 1,
      limit: 200 
    })
    messages.value.push(...oldMessages.data)
  
    stayBottom(false)
  } catch (_err: any) {
    notifications.addNotification({
      type: 'error',
      msg: Messages.ROOM_NOT_FOUND,
    })

    router.back()
  }
})

onUnmounted(async () => {
  await unJoinRoom()
})
</script>

<template>
  <div class="roomBox">

    <div class="roomBox__video">
      <iframe :src="video.iframePath" frameborder="0" allowfullscreen></iframe> 
    </div>

    <div class="roomBox__content">
      <div class="roomBox__contentHeader">
        <div class="roomBox__title">
          <h1 class="Font Font__bold Font__title">{{ video.name }}</h1>
          <div @click="update" class="roomBox__status">
            <Icon v-if="item.isOpen" type="UNLOCK" />
            <Icon v-else type="LOCK" />
          </div>
        </div>

        <div class="roomBox__suptitle">
          <span class="roomBox__owner Font Font__text Font__regular">
            Owner: 
            <Link>{{ item.user.nickname }}</Link>
          </span>
          <!-- <button class="Button Font Font__bold Font__text transition">Sync</button> -->
        </div>

        <Accordion :options="{ multiple: true }">
          
          <li class="Box Accordion__item">
            <a class="uk-accordion-title Accordion__title Font Font__text Font__regular" href="#">
              Details
              <Icon type="ARROW" class="Accordion__icon" />
            </a>
            <div class="uk-accordion-content">

              <List v-slot="{ classNames }">

                <li :class="classNames">
                  <span class="List__text Font Font__text Font__regular">Room ID: {{ item.slug }}</span>
                </li>

                <li :class="classNames">
                  <span class="List__text Font Font__text Font__regular">Users: {{ usersCount }}</span>
                </li>

                <li :class="classNames">
                  <span class="List__text Font Font__text Font__regular">Room status: {{ textRoomStatus }}</span>
                </li>

                <li :class="classNames">
                  <span class="List__text Font Font__text Font__regular">Date of creation: {{ item.createdAtForUser }}</span>
                </li>

              </List>

            </div>
          </li>

          <li class="Box Accordion__item">
            <a class="uk-accordion-title Accordion__title Font Font__text Font__regular" href="#">
              Users
              <Icon type="ARROW" class="Accordion__icon" />
            </a>
            <div class="uk-accordion-content">

              <List />

            </div>
          </li>

        </Accordion>
      </div>

      <div class="roomBox__contentFooter">
        <div ref="messagesBoxElement" class="chat roomBox__chat">

          <Message v-for="item of messages" :item="item" :key="item.id" />

        </div>

        <div class="roomBox__input">
          <Input v-slot="{ inputClassNames }">
            <input v-model="currentMessage" :class="inputClassNames" type="text" placeholder="Message">
          </Input>

          <Button @click="sendMessage" type="button" class="roomBox__send">Send</Button>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="sass" scoped></style>