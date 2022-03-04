<script lang="ts" setup>
import UIkit from 'uikit'
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// * Components
import Icon from './Icon/Icon.vue'
import List from './List/List.vue'
// * Components

let accordion: Ref<HTMLDivElement | null> = ref(null)
let DOMAccordion: UIkit.UIkitDropdownElement

onMounted(() => {
  if (accordion.value) {
    DOMAccordion = UIkit.dropdown(accordion.value, {})
  } else {
    console.warn('Dropdown not found!')
  }
})

onBeforeUnmount(() => {
  if (DOMAccordion) // @ts-ignore
    DOMAccordion.$destroy(true)
})
</script>

<template>
  <div class="Accordion">
    <ul uk-accordion>
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