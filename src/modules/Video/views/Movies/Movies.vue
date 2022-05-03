<script lang="ts" setup>
import type UIkit from 'uikit'
import type { Ref } from 'vue'
import type { MainPageGenre, UnparsedVideo } from '@/contracts/video'

import State from './index'
import { ref, onMounted } from 'vue'

// * Components
import Title from '@/components/Title.vue'
import Slider from '@/components/Slider.vue'
import Card from '@/components/Card/Card.vue'
import Preloader from '@/components/Preloader.vue'
import Slideshow from '@/modules/Video/components/Slideshow/Slideshow.vue'
// * Components

const state = new State()

const slideshowOptions: UIkit.UIkitSliderOptions = { autoplay: true, center: true }
const isLoadedNewest: Ref<boolean> = ref(false)
const isLoadedGenres: Ref<boolean> = ref(false)
const isLoadedPopular: Ref<boolean> = ref(false)
const newest: Ref<UnparsedVideo[]> = ref([])
const genres: Ref<MainPageGenre[]> = ref([])
const popular: Ref<UnparsedVideo[]> = ref([])

onMounted(async () => {
  newest.value = await state.getNewest()
  isLoadedNewest.value = true

  popular.value = await state.getPopular()
  isLoadedPopular.value = true

  genres.value = await state.getAllGenres()
  isLoadedGenres.value = true
})
</script>

<template>
  <Title>Newest</Title>

  <Preloader v-if="!isLoadedNewest" />
  <Slideshow v-else :options="slideshowOptions" :items="newest" />

  <div class="uk-container">
    
    <Preloader v-if="!isLoadedPopular" style="margin-top: 100px" />
    <div v-else class="mb">
      <h1 class="Font Font__bold Font__title sliderTitleOnIndexPage">Popular</h1>

      <Slider>
        <li class="Slider__li" v-for="item in popular">
          <Card :item="item" :to="{ name: 'video', params: { slug: item.slug } }" />
        </li>
      </Slider>
    </div>

    <Preloader v-if="!isLoadedGenres" style="margin-top: 100px" />
    <template v-else>
      <div v-for="genreItem in genres" class="mb">
        <h1 class="Font Font__bold Font__title sliderTitleOnIndexPage">{{ genreItem.title }}</h1>

        <Slider>
          <li class="Slider__li" v-for="item in genreItem.videos">
            <Card :item="item" :to="{ name: 'video', params: { slug: item.slug } }" />
          </li>
        </Slider>
      </div>
    </template>

  </div>
</template>