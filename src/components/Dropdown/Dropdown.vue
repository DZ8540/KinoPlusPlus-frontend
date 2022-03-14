<script lang="ts" setup>
// * Types
import type { Ref, PropType } from 'vue'
// * Types

import UIkit from 'uikit'
import State from './index'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// * Components
import Icon from '../Icon/Icon.vue'
import Link from '../Link/Link.vue'
// * Components

const state = new State()
const props = defineProps({
  options: {
    type: Object as PropType<UIkit.UIkitDropdownOptions>,
    default() {
      return {}
    },
  },
})

let DOMDropdown: UIkit.UIkitDropdownElement
const dropdown: Ref<HTMLDivElement | null> = ref(null)
const arrow: Ref<HTMLElement | null> = ref(null)

state.setOptions(props.options)

onMounted(() => {
  if (dropdown.value) {
    DOMDropdown = UIkit.dropdown(dropdown.value, {})

    // @ts-ignore
    UIkit.util.on(dropdown.value, 'show', () => {
      if (arrow.value)
        state.setArrowToActive()
      else
        console.warn('Arrow icon in dropdown not found!')
    })

    // @ts-ignore
    UIkit.util.on(dropdown.value, 'hide', () => {
      if (arrow.value)
        state.unsetArrowToActive()
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
      <Icon type="ARROW" :class="state.arrowClassNames" ref="arrow" />
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