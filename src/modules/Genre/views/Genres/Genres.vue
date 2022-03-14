<script lang="ts" setup>
import State from './index'
import { onMounted } from 'vue'

// * Components
import Title from '@/components/Title.vue'
import Card from '../../components/Card/Card.vue'
import Preloader from '@/components/Preloader.vue'
// * Components

const state = new State()

onMounted(async () => {
  state.getAllGenres()
})
</script>

<template>
  <img src="@/assets/Img/genreBg.png" class="registerBg genreBg bg" uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    <div class="content">

      <Title>All genres</Title>

      <Preloader v-if="!state.isLoadedGenres.value" />
      <div v-else class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

        <div v-for="item in state.genres">
          <Card :item="item" :to="{ name: 'genre', params: { slug: item.slug }}" />
        </div>

      </div>

    </div>
  </div>
</template>

<style lang="sass" scoped></style>