<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Video } from '@/contracts/video'
import type { Paginate } from '@/contracts/api'
import type { Room, RoomMessage, RoomMessagePayload, RoomPayload } from '@/contracts/room'
// * Types

import RoomService from '@/services/RoomService'
import { socket } from '@/api/socket'
import { parseVideo } from '@/helpers'
import { DEFAULT_ROOM } from '@/config/room'
import { RoutesNames } from '@/config/router'
import { DEFAULT_VIDEO } from '@/config/video'
import { useRoute, useRouter } from 'vue-router'
import { useUserData } from '@/store/userDataStore'
import { computed, onMounted, onUnmounted, ref } from 'vue'

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

let item: Ref<Room> = ref({ ...DEFAULT_ROOM })
let video: Ref<Video> = ref({ ...DEFAULT_VIDEO })
const slug: Room['slug'] = route.params.slug as string
const messages: Ref<RoomMessage[]> = ref([])
const currentMessage: Ref<string> = ref('')

const textRoomStatus = computed(() => {
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

function newMessage(msg: RoomMessage): void {
  messages.value.push(msg)
}

function roomDeleted(): void {
  router.push({ name: RoutesNames.HOME })
}

function setSocketEmits(): void {
  try {
    socket.on('room:update', updateRoom)
    socket.on('room:newMessage', newMessage)
    socket.on('room:delete', roomDeleted)
  } catch (err) {
    console.log(err)
  }
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

    await RoomService.update(slug, payload)
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
    messages.value.push(msg)

    currentMessage.value = ''
  } catch (_err: any) {}
}

onMounted(async () => {
  try {
    const room: Room = await RoomService.join(slug)
    setSocketEmits()

    item.value = room
    video.value = parseVideo(room.video)
    
    const oldMessages: Paginate<RoomMessage> = await RoomService.getMessages(item.value.slug, { 
      page: 1,
      limit: 200 
    })
    messages.value.push(...oldMessages.data)
  } catch (_err: any) {}
})

onUnmounted(async () => {
  await RoomService.unJoin(item.value.slug)
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
                  <span class="List__text Font Font__text Font__regular">Users: 2</span>
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
        <div class="chat roomBox__chat">

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