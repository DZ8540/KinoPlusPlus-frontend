<script lang="ts" setup>
// * Types
import type { Genre } from '@/contracts/genre'
// * Types

import State from './index'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

// * Components
import Button from '@/components/Button.vue'
import Card from '@/components/Card/Card.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import Preloader from '@/components/Preloader.vue'
// * Components

const state = new State()
const route = useRoute()

const slug: Genre['slug'] = route.params.slug as string

function nextPage(): void {
  state.nextPage.apply(state)
}

onMounted(async () => {
  state.getItem(slug)
})
</script>

<template>
  <img src="@/assets/Img/genreBg.png" class="registerBg genreBg bg" uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <Preloader v-if="!state.isLoaded.value" />
  <div v-else class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    <div class="content">

      <div class="Box genreTitle mb">
        <h1 class="Font Font__bold Font__title genreTitle__title">{{ state.item.name }}</h1>
        <p class="Font Font__regular Font__text">{{ state.item.description }}</p>
      </div>

      <Tabs :total-result="state.totalResults.value">
        <div class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

          <div v-for="item in state.movies">
            <Card :item="item" :to="{ name: 'video', params: { slug: item.slug }}" />
          </div>

        </div>
      </Tabs>

      <div v-if="state.showShowMoreBtn.value" class="showMore">
        <Button type="button" @click="nextPage">Show more...</Button>
      </div>

    </div>
  </div>
</template>

<style lang="sass" scoped></style>