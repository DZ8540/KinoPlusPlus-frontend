<script lang="ts" setup>
import { reactive } from 'vue'

const props = defineProps({
  isLite: {
    type: Boolean,
    default: false,
  }
})

const classNames: any[] = reactive(['Title', 'Font', 'Font__title', 'Font__bold', { 'Title__lite': props.isLite }])
</script>

<template>
  <h1 :class="classNames">
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