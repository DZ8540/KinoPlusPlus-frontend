<script lang="ts" setup>
// * Types
import type { Ref, PropType } from 'vue'
import type { Value } from '@/contracts/select'
// * Types

import { EventsNames } from '@/config/event'
import { onMounted, ref, reactive } from 'vue'
import { Select } from '@/assets/vendor/Select'

const emit = defineEmits([EventsNames.SELECT_CHANGE])
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  mainValue: {
    required: false,
  },
  values: {
    type: Array as PropType<Value[]>,
    required: true,
  },
  isFull: {
    type: Boolean,
    default: false,
  },
  isLikeInput: {
    type: Boolean,
    default: false,
  }
})

const select: Ref<HTMLDivElement | null> = ref(null)
const classNames: any[] = reactive(['Select', { 'Select__full': props.isFull }])
const inputBlockClassNames: any[] = reactive(['Select__inputBlock', { 'Input__input': props.isLikeInput }])

function changeHandler(): void {
  const selectVal: any = select.value!.querySelector('input')!.value
  emit(EventsNames.SELECT_CHANGE, selectVal)
}

function setCheckedAttr(val: Value['value']): object {
  return val == props.mainValue ? { 'data-checked': '' } : {}
}

onMounted(() => {
  new Select(select.value!)
})
</script>

<template>
  <div :class="classNames" ref="select" tabindex="-1" :data-name="props.name">
    <input @change="changeHandler" type="hidden" data-id="dz-input">

    <div :class="inputBlockClassNames">
      <span class="Select__input Font Font__text Font__bold" data-id="dz-inputText"></span>
      <span class="Select__icon transition"><i class="Icon Icon__arrow"></i></span>
    </div>

    <ul class="Select__list Box transition">
      <li class="Select__item" v-for="item in props.values">
        <span v-bind="setCheckedAttr(item.value)" :data-value="item.value" class="Select__text Font Font__text Font__regular">{{ item.text }}</span>
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