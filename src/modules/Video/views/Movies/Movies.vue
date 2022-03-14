<script lang="ts" setup>
import State from './index'
import { onMounted } from 'vue'

// * Components
import Title from '@/components/Title.vue'
import Card from '@/components/Card/Card.vue'
import Preloader from '@/components/Preloader.vue'
import Slider from '@/components/Slider/Slider.vue'
import Slideshow from '@/modules/Video/components/Slideshow/Slideshow.vue'
// * Components

const state = new State()

onMounted(async () => {
  state.getNewest()
  state.getPopular()
  state.getAllGenres()
})
</script>

<template>
  <Title>Newest</Title>

  <Preloader v-if="!state.isLoadedNewest.value" />
  <Slideshow v-else :options="state.slideshowOptions" :items="state.newest" />

  <div class="uk-container">
    
    <Preloader v-if="!state.isLoadedPopular.value" style="margin-top: 100px" />
    <div v-else class="mb">
      <h1 class="Font Font__bold Font__title sliderTitleOnIndexPage">Popular</h1>

      <Slider>
        <li class="Slider__li" v-for="item in state.popular">
          <Card :item="item" :to="{ name: 'video', params: { slug: item.slug } }" />
        </li>
      </Slider>
    </div>

    <Preloader v-if="!state.isLoadedGenres.value" style="margin-top: 100px" />
    <template v-else>
      <div v-for="genreItem in state.genres" class="mb">
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