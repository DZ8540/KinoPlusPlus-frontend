<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Genre } from '@/contracts/genre'
import type { Paginate } from '@/contracts/api'
import type { MenuItem } from '@/contracts/tabs'
import type { UnparsedVideo } from '@/contracts/video'
// * Types

import GenreService from '@/services/GenreService'
import { useRoute } from 'vue-router'
import { RoutesNames } from '@/config/router'
import { DEFAULT_GENRE } from '@/config/genre'
import { onMounted, reactive, ref } from 'vue'

// * Components
import Tabs from '@/components/Tabs.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import Preloader from '@/components/Preloader.vue'
// * Components

const route = useRoute()

let page: number = 1
let lastPage: number = 1
const limit: number = 20
const totalResults: Ref<number> = ref(0)
const isLoaded: Ref<boolean> = ref(false)
const movies: UnparsedVideo[] = reactive([])
const slug: Genre['slug'] = route.params.slug as string
const isShowShowMoreBtn: Ref<boolean> = ref(true)
const item: Ref<Genre> = ref({ ...DEFAULT_GENRE })
const tabs: MenuItem[] = [
  {
    text: 'Movies',
    to: ''
  },
  {
    text: 'Serials',
    to: '/'
  },
  {
    text: 'Cartoons',
    to: '/'
  },
]

async function nextPage(): Promise<void> {
  if (page < lastPage) {
    page++
    await addNewMovies()
  }
}

async function addNewMovies(): Promise<void> {
  try {
    const genreMovies: Paginate<UnparsedVideo> = await GenreService.getGenreMovies({ page, limit }, item.value.slug)

    lastPage = genreMovies.meta.lastPage
    totalResults.value = genreMovies.meta.total
    movies.push(...genreMovies.data)

    if (page >= lastPage)
      isShowShowMoreBtn.value = false
  } catch (_err: any) {}
}

onMounted(async () => {
  try {
    item.value = await GenreService.get(slug)
    isLoaded.value = true

    await addNewMovies()
  } catch (_err: any) {}
})
</script>

<template>
  <img src="@/assets/Img/genreBg.png" class="registerBg genreBg bg" uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <Preloader v-if="!isLoaded" />
  <div v-else class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    <div class="content">

      <div class="Box genreTitle mb">
        <h1 class="Font Font__bold Font__title genreTitle__title">{{ item.name }}</h1>
        <p class="Font Font__regular Font__text" v-html="item.description" />
      </div>

      <Tabs :menu="tabs" :total-result="totalResults">
        <div class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

          <div v-for="item in movies">
            <Card :item="item" :to="{ name: RoutesNames.VIDEO, params: { slug: item.slug }}" />
          </div>

        </div>
      </Tabs>

      <div v-if="isShowShowMoreBtn" class="showMore">
        <Button type="button" @click="nextPage">Show more...</Button>
      </div>

    </div>
  </div>
</template>

<style lang="sass" scoped></style>