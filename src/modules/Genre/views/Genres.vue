<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Genre } from '@/contracts/genre'
// * Types

import GenreService from '@/services/GenreService'
import { RoutesNames } from '@/config/router'
import { onMounted, reactive, ref } from 'vue'

// * Components
import Card from '../components/Card.vue'
import Title from '@/components/Title.vue'
import Preloader from '@/components/Preloader.vue'
// * Components

const genres: Genre[] = reactive([])
const isLoadedGenres: Ref<boolean> = ref(false)

onMounted(async () => {
  try {
    const allGenres: Genre[] = await GenreService.getAll()

    genres.push(...allGenres)
    isLoadedGenres.value = true
  } catch (_err: any) {}
})
</script>

<template>
  <img src="@/assets/Img/genreBg.png" class="registerBg genreBg bg" uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    <div class="content">

      <Title>All genres</Title>

      <Preloader v-if="!isLoadedGenres" />
      <div v-else class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

        <div v-for="item in genres">
          <Card :item="item" :to="{ name: RoutesNames.GENRE, params: { slug: item.slug }}" />
        </div>

      </div>

    </div>
  </div>
</template>

<style lang="sass" scoped></style>