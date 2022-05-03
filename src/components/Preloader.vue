<script lang="ts" setup></script>

<template>
  <div class="Preloader">
    <div class="Box">
      <i class="Icon Icon__plus Preloader__firstIcon Preloader__icon"></i>
      <i class="Icon Icon__plus Preloader__icon"></i>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Preloader
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  margin: 30px 0
  background-color: transparent
  &__icon
    color: $yellow !important
    font-size: 70px
    display: inline-block
    animation: rotate .5s ease-in-out infinite
  &__firstIcon
    margin-right: 30px

@keyframes rotate
  0%
    transform: rotate(0)

  100%
    transform: rotate(90deg)
</style>