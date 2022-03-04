<script lang="ts" setup>
import type { Value } from '@/contracts/select'
import { onMounted, ref, type PropType, type Ref } from 'vue'
import { Select } from '@/assets/vendor/Select'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  values: {
    type: Array as PropType<Value[]>,
    required: true,
  },
})

let select: Ref<HTMLDivElement | null> = ref(null)
onMounted(() => {
  new Select(select.value!)
})
</script>

<template>
  <div class="Select" ref="select" tabindex="-1" :data-name="props.name">
    <input type="hidden" data-id="dz-input">

    <div class="Select__inputBlock">
      <span class="Select__input Font Font__text Font__bold" data-id="dz-inputText"></span>
      <span class="Select__icon transition"><i class="Icon Icon__arrow"></i></span>
    </div>

    <ul class="Select__list Box transition">
      <li class="Select__item" v-for="item in props.values">
        <span class="Select__text Font Font__text Font__regular" :data-value="item.value">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="sass">
.Select
  position: relative
  &__inputBlock
    display: flex
    justify-content: space-between
    align-items: center
    width: 250px
    cursor: pointer
  &__list
    position: absolute
    min-width: 100%
    width: max-content
    max-height: 300px
    top: calc(100% + 40px)
    opacity: 0
    margin: 0 !important
    list-style: none
    overflow: hidden
    overflow-y: scroll
    z-index: -1
    scrollbar-width: none
    &::-webkit-scrollbar
      width: 0
  &__item
    margin-bottom: 15px
    &:last-child
      margin-bottom: 0
  &__text
    display: flex
    width: 100%
    cursor: pointer
    position: relative
    align-items: center
    margin-right: 30px
    &::after
      content: '▼'
      transform: rotate(90deg)
      position: absolute
      right: -40px
      opacity: 0
      font-size: 15px
      transition: .3s
    &--active::after, &:hover::after
      right: 0
      opacity: 1
    &--disabled
      opacity: .5
    &--disabled::after
      opacity: 0 !important
  &__full
    .Select__inputBlock
      width: 100%
  &--active
    .Select
      &__icon
        transform: rotate(-90deg)
      &__list
        top: calc(100% + 20px)
        opacity: 1
        z-index: 10
</style>