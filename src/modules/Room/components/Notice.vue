<script lang="ts" setup></script>

<template>
  <div class="Message Message__notice">
    <p class="Message__noticeText Font Font__text Font__regular">
      <slot />
    </p>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Message
  &__header
    display: flex
    margin-bottom: 20px
  &__body 
    .Textarea
      width: 100%
  &__footer
    display: flex
    justify-content: flex-end
    margin-top: 20px
    *
      margin-left: 20px
  &__avatar
    width: 50px
    height: 50px
    border-radius: 50%
    object-fit: cover
  &__user
    margin-left: 20px
    display: flex
    flex-direction: column
  &__notice
    margin: 40px 0 !important
  &__noticeText
    color: $red !important
    text-align: center
  &__me
    padding-right: 20px 
    .Font
      text-align: right
    .Message
      &__header
        justify-content: flex-end
      &__user
        margin-right: 20px
</style>