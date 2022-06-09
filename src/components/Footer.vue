<script lang="ts" setup>
import { DateTime } from 'luxon'

const year: number = DateTime.now().year
</script>

<template>
  <div class="Footer">
    <span class="Font Font__text Font__regular">© {{ year }} «Кино++»</span>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Footer
  background-color: $yellow
  width: 100%
  display: flex
  justify-content: center
  padding: 20px 0

  @media (max-width: 350px)
    padding: 10px 0
</style>