<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
// * Types

import UIkit from 'uikit'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// * Components
import Icon from './Icon.vue'
import List from './List.vue'
// * Components

let DOMAccordion: UIkit.UIkitAccordionElement
const accordion: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  if (accordion.value) {
    DOMAccordion = UIkit.accordion(accordion.value, {})
  } else {
    console.warn('Accordion not found!')
  }
})

onBeforeUnmount(() => {
  if (DOMAccordion) // @ts-ignore
    DOMAccordion.$destroy(true)
})
</script>

<template>
  <div class="Accordion">
    <ul ref="accordion">
      <li class="Box Accordion__item">
        <a class="uk-accordion-title Accordion__title Font Font__title Font__bold" href="#">
          <slot name="title">Accordion</slot> 
          <Icon class="Accordion__icon" type="ARROW" />
        </a>
        <div class="uk-accordion-content">

          <slot name="content">
            <List />
          </slot>

        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Accordion
  &__title
    display: flex
    justify-content: space-between
    align-items: center
  &__item
    border-radius: 20px
    padding: 20px 30px !important
  .uk-open 
    .Accordion__icon
      transform: rotate(-90deg)

  @media (max-width: 350px)
    &__item
      padding: 20px !important
</style>