<script lang="ts" setup>
// * Types
import type UIkit from 'uikit'
import type { Ref } from 'vue'
import type { Genre } from '@/contracts/genre'
import type { MainPageGenre, UnparsedVideo } from '@/contracts/video'
// * Types

import GenreService from '@/services/GenreService'
import VideoService from '@/services/Video/VideoService'
import { RoutesNames } from '@/config/router'
import { ref, onMounted, reactive } from 'vue'

// * Components
import Title from '@/components/Title.vue'
import Slider from '@/components/Slider.vue'
import Card from '@/components/Card.vue'
import Preloader from '@/components/Preloader.vue'
import Slideshow from '@/modules/Video/components/Slideshow.vue'
// * Components

const slidersOptions: UIkit.UIkitSliderOptions = {
  autoplay: true,
  finite: true,
}

const genres: MainPageGenre[] = reactive([])
const newest: UnparsedVideo[] = reactive([])
const popular: UnparsedVideo[] = reactive([])
const isLoadedNewest: Ref<boolean> = ref(false)
const isLoadedGenres: Ref<boolean> = ref(false)
const isLoadedPopular: Ref<boolean> = ref(false)
const slideshowOptions: UIkit.UIkitSliderOptions = { autoplay: true, center: true }

async function getAllGenres(): Promise<MainPageGenre[]> {
  const genres: MainPageGenre[] = []

  try {
    const response: Genre[] = await GenreService.getOnMainPageGenres()

    for (const genre of response) {
      const genreData: MainPageGenre = {
        title: genre.name,
        slug: genre.slug,
        videos: [],
      }

      const genreVideos: UnparsedVideo[] = (await GenreService.getGenreMovies({ page: 1 }, genre.slug)).data

      genreData.videos = genreVideos
      genres.push(genreData)
    }
  } catch (_err: any) {}

  return genres
}

onMounted(async () => {
  try {
    const newestVideos: UnparsedVideo[] = await VideoService.getNewest()
    newest.push(...newestVideos)

    isLoadedNewest.value = true
  } catch (_err: any) {} 

  try {
    const popularVideos: UnparsedVideo[] = await VideoService.getPopular()
    popular.push(...popularVideos)

    isLoadedPopular.value = true
  } catch (_err: any) {}

  try {
    const allGenres: MainPageGenre[] = await getAllGenres()
    genres.push(...allGenres)

    isLoadedGenres.value = true
  } catch (_err: any) {}
})
</script>

<template>
  <Title>Newest</Title>

  <Preloader v-if="!isLoadedNewest" />
  <Slideshow v-else :options="slideshowOptions" :items="newest" />

  <div class="uk-container">
    
    <div class="mb">
      <h1 class="Font Font__bold Font__title sliderTitleOnIndexPage">Popular</h1>

      <Preloader v-if="!isLoadedPopular" style="margin-top: 100px" />
      <Slider v-else :options="slidersOptions" :is-with-show-more="false">
        <li class="Slider__li" v-for="item in popular">
          <Card :item="item" :to="{ name: RoutesNames.VIDEO, params: { slug: item.slug } }" />
        </li>
      </Slider>
    </div>

    <Preloader v-if="!isLoadedGenres" style="margin-top: 100px" />
    <template v-else>
      <div v-for="genreItem in genres" class="mb">
        <h1 class="Font Font__bold Font__title sliderTitleOnIndexPage">{{ genreItem.title }}</h1>

        <Slider :options="slidersOptions" :show-more-route="{ name: RoutesNames.GENRE, params: { slug: genreItem.slug } }" is-with-show-more>
          <li v-for="item in genreItem.videos" class="Slider__li">
            <Card :item="item" :to="{ name: RoutesNames.VIDEO, params: { slug: item.slug } }" />
          </li>
        </Slider>
      </div>
    </template>

  </div>
</template>