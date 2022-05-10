<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Paginate } from '@/contracts/api'
import type { UnparsedVideo } from '@/contracts/video'
// * Types

import UserService from '@/services/UserService'
import { EventsNames } from '@/config/event'
import { RoutesNames } from '@/config/router'
import { onMounted, ref, reactive } from 'vue'

// * Components
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import Preloader from '@/components/Preloader.vue'
// * Components

const emit = defineEmits([EventsNames.TOTAL_RESULT])

let page: number = 1
let lastPage: number = 0
const limit: number = 20
const totalCount: Ref<number> = ref(0)
const isShowShowMoreBtn: Ref<boolean> = ref(true)
const historyList: UnparsedVideo[] = reactive([])
const isHistoryListLoaded: Ref<boolean> = ref(false)

async function nextPage(): Promise<void> {
  if (page < lastPage) {
    page++
    await addNewMovies()
  }
}

async function addNewMovies(): Promise<void> {
  try {
    const newHistoryList: Paginate<UnparsedVideo> = await UserService.getHistoryList({ page, limit })

    lastPage = newHistoryList.meta.lastPage
    totalCount.value = newHistoryList.meta.total
    historyList.push(...newHistoryList.data)

    emit(EventsNames.TOTAL_RESULT, totalCount.value)

    if (page >= lastPage)
      isShowShowMoreBtn.value = false
  } catch (_err: any) {}
}

onMounted(async () => {
  await addNewMovies()
  isHistoryListLoaded.value = true
})
</script>

<template>
  <Preloader v-if="!isHistoryListLoaded" />
  <div v-else class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

    <div v-for="item in historyList">
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