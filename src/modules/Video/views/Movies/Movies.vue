<script lang="ts" setup>
import State from './index'
import { onMounted } from 'vue'

// * Components
import Title from '@/components/Title.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import Card from '@/components/Card/Card.vue'
import Preloader from '@/components/Preloader.vue'
import Slider from '@/components/Slider/Slider.vue'
import Slideshow from '@/modules/Video/components/Slideshow/Slideshow.vue'
// * Components

const state = new State()

onMounted(async () => {
  state.getNewest()
  state.getPopular()
})
</script>

<template>
  <Title>Newest</Title>

  <Preloader v-if="state.isLoadedNewest.value" :ratio="5" />
  <Slideshow v-else :options="state.slideshowOptions" :items="state.newest" />

  <div class="uk-container">

    <Preloader style="margin-top: 100px" v-if="state.isLoadedContent.value" :ratio="4" />
    <Tabs v-else :navs="state.navs">
      <div class="mb">
        <h1 class="Font Font__bold Font__title sliderTitleOnIndexPage">Popular</h1>

        <Slider>
          <li class="Slider__li" v-for="item in state.popular">
            <Card :item="item" :to="{ name: 'video', params: { slug: item.slug } }" />
          </li>
        </Slider>
      </div>

      <!-- <div>
        <h1 class="Font Font__bold Font__title sliderTitleOnIndexPage">Fantastic</h1>

        <Slider />
      </div> -->
    </Tabs>

  </div>
</template>