<script lang="ts" setup>
// * Types
import type { ComputedRef, Ref } from 'vue'
import type { Video } from '@/contracts/video'
import type { Paginate } from '@/contracts/api'
import type { ParsedUser, User } from '@/contracts/user'
import type { Room, RoomMessage, RoomMessagePayload, RoomPayload } from '@/contracts/room'
// * Types

import RoomService from '@/services/RoomService'
import { useScroll } from '@vueuse/core'
import { DEFAULT_ROOM } from '@/config/room'
import { Messages } from '@/config/response'
import { DEFAULT_USER } from '@/config/user'
import { RoutesNames } from '@/config/router'
import { DEFAULT_VIDEO } from '@/config/video'
import { useRoute, useRouter } from 'vue-router'
import { parseUser, parseVideo } from '@/helpers'
import { useUserData } from '@/store/userDataStore'
import { socketInstance } from '@/api/Instances/socketInstance'
import { useNotificationBus } from '@/store/notificationBusStore'
import { 
  computed, onMounted, onUnmounted, 
  ref, nextTick, reactive 
} from 'vue'

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

const currentUser: ParsedUser = userData.user!
const slug: Room['slug'] = route.params.slug as string

const usersInRoom: ParsedUser[] = reactive([])
const item: Ref<Room> = ref({ ...DEFAULT_ROOM })
const video: Ref<Video> = ref({ ...DEFAULT_VIDEO })
const creator: Ref<User> = ref({ ...DEFAULT_USER })

const currentMessage: Ref<string> = ref('')
const messages: Ref<RoomMessage[]> = ref([])
const messagesBoxElement: Ref<HTMLDivElement | null | undefined> = ref(null)
const { arrivedState: messagesBoxElementArrivedState } = useScroll(messagesBoxElement)

const textRoomStatus: ComputedRef<'unlock' | 'lock'> = computed(() => {
  return item.value.isOpen ? 'unlock' : 'lock' 
})

function checkCurrentUser(): boolean {
  return currentUser.id == creator.value.id ? true : false
}

function leaveFromRoom(): void {
  router.replace({ name: RoutesNames.HOME })
}

function updateUsersCount(users: Room['users']): void {
  usersInRoom.splice(0, usersInRoom.length)

  for (const item of users) {
    usersInRoom.push(parseUser(item)) 
  }
}

function setSocketHandlers(): void {
  try {
    socketInstance.on('disconnect', unJoinRoom)
    socketInstance.on('room:delete', leaveFromRoom)
    socketInstance.on('room:newMessage', newMessage)
    socketInstance.on('room:updateUsersCount', updateUsersCount)

    socketInstance.on('room:kickUser', (userId: User['id']) => {
      if (currentUser.id == userId)
        leaveFromRoom()
    })

    socketInstance.on('room:update', (isOpen: Room['isOpen']) => {
      item.value.isOpen = isOpen
    })
  } catch (err) {
    console.log(err)
  }
}

async function stayBottom(isWithNewMessage: boolean): Promise<void> {
  await nextTick()

  if (
    isWithNewMessage && 
    !messagesBoxElementArrivedState.bottom
  ) return

  messagesBoxElement.value!.scroll({ top: messagesBoxElement.value!.scrollHeight })
}

async function newMessage(msg: RoomMessage): Promise<void> {
  messages.value.push(msg)
  
  await stayBottom(true)
}

async function unJoinRoom(): Promise<void> {
  await RoomService.unJoin(item.value.slug)  
}

async function kickUser(userId: User['id']): Promise<void> {
  if (!checkCurrentUser()) return

  const kickedUserId: User['id'] = await RoomService.kickUser(item.value.slug, userId)

  if (kickedUserId == currentUser.id)
    leaveFromRoom()
}

async function update(): Promise<void> {
  if (!checkCurrentUser()) return

  try {
    const payload: RoomPayload = {
      isOpen: !item.value.isOpen,
      videoId: item.value.videoId,
    }
    
    item.value.isOpen = await RoomService.update(slug, payload)
  } catch (_err: any) {}
}

async function sendMessage(): Promise<void> {
  try {
    const payload: RoomMessagePayload = {
      roomId: item.value.id,
      userId: currentUser.id,
      message: currentMessage.value,
    }

    const msg: RoomMessage = await RoomService.sendMessage(item.value.slug, payload)
    await newMessage(msg)

    currentMessage.value = ''
  } catch (_err: any) {}
}

onMounted(async () => {
  setSocketHandlers()

  try {
    const room: Room = await RoomService.join(slug)

    item.value = room
    video.value = parseVideo(room.video)
    creator.value = parseUser(room.creator[0])

    updateUsersCount(item.value.users)
    
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
            <Link :to="{ name: RoutesNames.USER, params: { id: creator.id } }">{{ creator.nickname }}</Link>
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
                  <span class="List__text Font Font__text Font__regular">Users: {{ usersInRoom.length }}</span>
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

              <div v-for="item in usersInRoom" class="roomUser roomUser__mb">
                <Link :to="{ name: RoutesNames.USER, params: { id: item.id } }" class="roomUser__avatar">
                  <img :src="item.avatar" alt="">
                </Link>

                <Link :to="{ name: RoutesNames.USER, params: { id: item.id } }" weight="regular" size="text" class="roomUser__name">{{ item.nickname }}</Link>

                <Button v-if="checkCurrentUser()" @click="kickUser(item.id)" type="button" class="roomUser__button">Kick</Button>
              </div>

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
            <input @keyup.enter="sendMessage" v-model="currentMessage" :class="inputClassNames" type="text" placeholder="Message">
          </Input>

          <Button @click="sendMessage" type="button" class="roomBox__send">Send</Button>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="sass"></style>