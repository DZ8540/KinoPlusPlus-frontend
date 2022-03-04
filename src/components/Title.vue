<script lang="ts" setup></script>

<template>
  <h1 class="Title Font Font__title Font__bold">
    <slot></slot>
  </h1>
</template>

<style lang="sass">
.Title
  text-align: center
  margin-bottom: 50px !important
  &__lite
    margin-bottom: 20px !important

  @media (max-width: 1100px)
    margin-bottom: 30px !important
    &__lite
      margin-bottom: 20px !important

  @media (max-width: 350px)
    margin-bottom: 20px !important
    &__lite
      margin-bottom: 10px !important
</style>