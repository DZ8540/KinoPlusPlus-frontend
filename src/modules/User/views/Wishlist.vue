<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Paginate } from '@/contracts/api'
import type { UnparsedVideo } from '@/contracts/video'
// * Types

import UserService from '@/services/UserService'
import { RoutesNames } from '@/config/router'
import { onMounted, ref, reactive } from 'vue'

// * Components
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Preloader from '@/components/Preloader.vue'
// * Components

const emit = defineEmits(['setTotalResult'])

let page: number = 1
let lastPage: number = 0
const limit: number = 20
const totalCount: Ref<number> = ref(0)
const wishlist: UnparsedVideo[] = reactive([])
const isWishListLoaded: Ref<boolean> = ref(false)
const isShowShowMoreBtn: Ref<boolean> = ref(true)

async function nextPage(): Promise<void> {
  if (page < lastPage) {
    page++
    await addNewMovies()
  }
}

async function addNewMovies(): Promise<void> {
  try {
    const newWishlist: Paginate<UnparsedVideo> = await UserService.getWishlist({ page, limit })

    lastPage = newWishlist.meta.lastPage
    totalCount.value = newWishlist.meta.total
    wishlist.push(...newWishlist.data)

    emit('setTotalResult', totalCount.value)

    if (page >= lastPage)
      isShowShowMoreBtn.value = false
  } catch (_err: any) {}
}

onMounted(async () => {
  await addNewMovies()
  isWishListLoaded.value = true
})
</script>

<template>
  <Preloader v-if="!isWishListLoaded" />
  <div v-else class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

    <div v-for="item in wishlist">
      <Card
       :item="item" 
       :to="{ name: RoutesNames.VIDEO, params: { slug: item.slug }}" 
       :is-in-wish-list="true"
      />
    </div>

  </div>

  <div v-if="isShowShowMoreBtn" class="showMore">
    <Button @click="nextPage" type="button">Show more...</Button>
  </div>
</template>

<style lang="sass"></style>