<script lang="ts" setup>
import { reactive } from 'vue'

const props = defineProps({
  withoutDots: {
    type: Boolean,
    default: false,
  },
})

const textClassName: string = 'List__text'
const classNames: any[] = reactive(['List__li', { 'List__li__withoutDot': props.withoutDots }])
</script>

<template>
  <ul class="List">

    <slot :classNames="classNames" :textClassName="textClassName">
      <li v-for="item in 3" :class="classNames">
        <span class="List__text Font Font__text Font__regular">List item {{ item }}</span>
      </li>
    </slot>

  </ul>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.List
  &__li
    display: flex
    flex-direction: column
    justify-content: center
    position: relative
    margin-bottom: 20px
    &::before
      content: ''
      position: absolute
      left: 0
      display: block
      width: $listDotSize
      height: $listDotSize
      background-color: $yellow
      border-radius: 50%
    &:last-child
      margin-bottom: 0
    &__withoutDot
      &::before
        width: 0
        height: 0
    &__withoutDot > .List__text
        margin-left: 0
  &__text
    margin-left: calc(20px + $listDotSize)

  @media (max-width: 350px)
    &__li
      margin-bottom: 10px
</style>