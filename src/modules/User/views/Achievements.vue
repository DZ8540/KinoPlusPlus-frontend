<script lang="ts" setup>
// * Components
import AchievementCard from '@/components/AchievementCard.vue'
// * Components
</script>

<template>
  <div class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

    <div v-for="_ of 10">
      <AchievementCard />
    </div>

  </div>
</template>

<style lang="sass"></style>