<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
// * Types

import State from './index'
import { onMounted, ref } from 'vue'

// * Components
import Button from '@/components/Button.vue'
import Card from '@/components/Card/Card.vue'
import Preloader from '@/components/Preloader.vue'
// * Components

const state = new State()
const emit = defineEmits(['setTotalResult'])

const currentPage: Ref<number> = ref(0)
const isShowNextPageBtn: Ref<boolean> = ref(true)

async function nextPage(): Promise<void> {
  currentPage.value++
  await state.getWishlist(currentPage.value)

  emit('setTotalResult', state.totalCount.value)

  if (currentPage.value >= state.lastPage.value)
    isShowNextPageBtn.value = false
}

/**
 * * Hooks
 */

onMounted(async () => {
  await nextPage()
})
</script>

<template>
  <Preloader v-if="!state.isWishListLoaded.value" />
  <div v-else class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

    <div v-for="item in state.wishlist">
      <Card
       :item="item" 
       :to="{ name: 'video', params: { slug: item.slug }}" 
       :is-in-wish-list="true"
      />
    </div>

  </div>

  <div v-if="isShowNextPageBtn" class="showMore">
    <Button @click="nextPage" type="button">Show more...</Button>
  </div>
</template>

<style lang="sass"></style>