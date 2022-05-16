<script lang="ts" setup>
const inputClassNames: string[] = ['Input__input', 'Font', 'Font__bold', 'Font__text', 'transition']
</script>

<template>
  <div class="Input">
    <slot :input-class-names="inputClassNames" />
    
    <span class="Input__error Font Font__regular Font__text">
      <slot name="error" />
    </span>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Input
  width: 100%
  &__input
    width: 100%
    height: 50px
    display: flex
    align-items: center
    padding: 0 20px
    border-radius: 10px
    box-sizing: border-box
    outline: none !important
    &:focus
      border-color: $yellow
  &__error
    color: $red !important
    margin-top: 10px

  @media (max-width: 400px)
    &__input
      height: 40px
      padding: 0 10px
</style>