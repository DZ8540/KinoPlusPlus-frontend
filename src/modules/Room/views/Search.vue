<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Room } from '@/contracts/room'
import type { Paginate } from '@/contracts/api'
import type { VideoSearchPayload } from '@/contracts/video'
// * Types

import RoomService from '@/services/RoomService'
import { onMounted, ref } from 'vue'

// * Components
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import RoomCard from '@/components/RoomCard.vue'
import Preloader from '@/components/Preloader.vue'
import SearchBox from '../components/SearchBox.vue'
// * Components

let page: number = 1
let lastPage: number = 0
const limit: number = 20
const rooms: Ref<Room[]> = ref([])
const videoName: Ref<string> = ref('')
const isShowShowMoreBtn: Ref<boolean> = ref(true)
const isRoomsLoaded: Ref<boolean> = ref(false)

async function nextPage(): Promise<void> {
  if (page < lastPage) {
    page++
    await getRooms()
  }
}

async function search(): Promise<void> {
  isRoomsLoaded.value = false
  page = 1

  await getRooms()
}

async function getRooms(): Promise<void> {
  const payload: VideoSearchPayload = {
    page,
    limit,
    videoName: videoName.value,
  }

  const newRooms: Paginate<Room> = await RoomService.search(payload)

  lastPage = newRooms.meta.lastPage
  rooms.value = newRooms.data
  isRoomsLoaded.value = true

  if (page >= lastPage)
    isShowShowMoreBtn.value = false
}

onMounted(async () => {
  await getRooms()
})
</script>

<template>
  <img src="@/assets/Img/roomsBg.png" class="registerBg actorsBg roomsBg bg" uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    
    <div class="content">
      <Title>All rooms</Title>

      <SearchBox @search="search">
        <Input v-slot="{ inputClassNames }">

          <input v-model="videoName" :class="inputClassNames" type="text" placeholder="Video name">

        </Input>
      </SearchBox>

      <!-- <div class="Filter Box">
        <div class="Filter__box mb">
          
          <div class="Filter__left">
            <div class="Select Filter__select Filter__item" tabindex="-1" data-name="Sort">
              <input type="hidden" data-id="dz-input">
            
              <div class="Select__inputBlock">
                <span class="Select__input Font Font__text Font__bold" data-id="dz-inputText"></span>
                <span class="Select__icon transition"><i class="Icon Icon__arrow"></i></span>
              </div>
            
              <ul class="Select__list Box transition">
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value1">By popular</span>
                </li>
            
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value2">By date</span>
                </li>
                
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value3">By age</span>
                </li>
              </ul>
            </div>

            <div class="Sorting" data-active>
              <span class="Sorting__text Font Font__text Font__bold">Sorting</span>
              <i class="Sorting__icon Icon Icon__arrow Icon__arrow__bottom transition"></i>
            </div>
          </div>

          <div class="Filter__center">

            <div class="Select multipleSelect Filter__select Filter__item" data-multiple tabindex="-1" data-name="Type">
              <input type="hidden" data-id="dz-input">
            
              <div class="Select__inputBlock">
                <span class="Font Font__bold Font__text">Type <span class="Select__input Font Font__text Font__bold" data-id="dz-inputText"></span></span>
                <span class="Select__icon transition"><i class="Icon Icon__arrow"></i></span>
              </div>
            
              <ul class="Select__list Box transition">
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value1">Movies</span>
                </li>
            
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value2">Serials</span>
                </li>
                
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value3">Cartoons</span>
                </li>
                
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value4">Cartoon serials</span>
                </li>
              </ul>
            </div>
            
            <div class="Select multipleSelect Filter__select" data-multiple tabindex="-1" data-name="Type">
              <input type="hidden" data-id="dz-input">
            
              <div class="Select__inputBlock">
                <span class="Font Font__bold Font__text">Genre <span class="Select__input Font Font__text Font__bold" data-id="dz-inputText"></span></span>
                <span class="Select__icon transition"><i class="Icon Icon__arrow"></i></span>
              </div>
            
              <ul class="Select__list Box transition">
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value1">Action</span>
                </li>
            
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value2">Adventures</span>
                </li>
                
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value3">Romance</span>
                </li>
                
                <li class="Select__item">
                  <span class="Select__text Font Font__text Font__regular" data-value="value4">Fight</span>
                </li>
              </ul>
            </div>

          </div>

          <div class="Filter__right">
            <span class="Font Font__text Font__regular">Results shown: 16</span>
          </div>

        </div>

        <div class="Filter__box">

          <div class="Filter__left">
            <span class="Font Font__regular Font__text">Filters applied: 4</span>
          </div>

          <div class="Filter__center">
            <div class="Input Filter__search">
              <input type="text" class="Input__input Font Font__bold Font__text transition" placeholder="Search">
              <span class="Input__error Font Font__regular Font__text">Text error</span>
            </div>
          </div>

          <div class="Filter__right">
            <button class="Button transition Font Font__bold Font__text">Clear</button>
          </div>

        </div>
      </div> -->

      <Preloader v-if="!isRoomsLoaded" />

      <div v-else class="results">

        <RoomCard v-for="item in rooms" :item="item" />

      </div>

      <div v-if="isShowShowMoreBtn" class="showMore">
        <Button @click="nextPage" type="button">Show more...</Button>
      </div>
    </div>

  </div>
</template>

<style lang="sass"></style>