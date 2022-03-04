<script lang="ts" setup></script>

<template>
  <div class="Footer">
    <span class="Font Font__text Font__regular">© 2021 «Кино++»</span>
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