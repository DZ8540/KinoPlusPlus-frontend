<script lang="ts" setup>
// * Types
import type { Ref, PropType } from 'vue'
// * Types

import UIkit from 'uikit'
import { onBeforeUnmount, onMounted, ref, reactive } from 'vue'

// * Components
import Icon from './Icon.vue'
import Link from './Link.vue'
// * Components

const props = defineProps({
  options: {
    type: Object as PropType<UIkit.UIkitDropdownOptions>,
    default() {
      return {}
    },
  },
})

let DOMDropdown: UIkit.UIkitDropdownElement
const arrow: Ref<HTMLElement | null> = ref(null)
const dropdown: Ref<HTMLDivElement | null> = ref(null)
const isArrowActive: Ref<boolean> = ref(false)
const arrowClassNames: any[] = reactive(['Dropdown__arrow', { 'Dropdown__arrow--active': isArrowActive }])

function setArrowToActive(val: boolean): void {
  isArrowActive.value = val
}

onMounted(() => {
  if (dropdown.value) {
    DOMDropdown = UIkit.dropdown(dropdown.value, props.options)

    // @ts-ignore
    UIkit.util.on(dropdown.value, 'show', () => {
      if (arrow.value)
        setArrowToActive(true)
      else
        console.warn('Arrow icon in dropdown not found!')
    })

    // @ts-ignore
    UIkit.util.on(dropdown.value, 'hide', () => {
      if (arrow.value)
        setArrowToActive(false)
      else
        console.warn('Arrow icon in dropdown not found!')
    })
  } else {
    console.warn('Dropdown not found!')
  }
})

onBeforeUnmount(() => {
  if (DOMDropdown) // @ts-ignore
    DOMDropdown.$destroy(true)
})
</script>

<template>
  <div class="Dropdown">
    <div class="Dropdown__title">
      <Link to="#">
        <slot name="title">Dropdown</slot>
      </Link>
      <Icon type="ARROW" :class="arrowClassNames" ref="arrow" />
    </div>

    <div class="Dropdown__drop" ref="dropdown">

      <slot name="body">
        <span class="Font Font__text Font__regular">Dropdown content</span>
      </slot>

    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Dropdown
  position: relative
  &__title
    display: flex
    align-items: center
  &__arrow
    font-size: 13px
    margin-left: 10px
    transform: rotate(0)
    &--active
      transform: rotate(-90deg)
  &__drop
    padding: 30px
    border-radius: 20px
    overflow: hidden

  @media (max-width: 350px)
    &__drop
      padding: 20px
</style>