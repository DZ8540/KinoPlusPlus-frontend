<script lang="ts" setup>
// * Types
import type { Ref, PropType } from 'vue'
// * Types

import UIkit from 'uikit'
import { onBeforeUnmount, onMounted, ref, reactive } from 'vue'

// * Components
import Icon from './Icon.vue'
import Button from './Button.vue'
// * Components

const props = defineProps({
  options: {
    type: Object as PropType<UIkit.UIkitSliderOptions>,
    default() {
      return {}
    },
  },
  itemsCountView: {
    type: Number,
    default: 4,
  },
  itemsCountSmallView: {
    type: Number,
    default: 3,
  },
  itemsCountMobileView: {
    type: Number,
    default: 2,
  },
  isWithShowMore: {
    type: Boolean,
    default: true,
  },
})

let DOMSlider: UIkit.UIkitSliderElement
const slider: Ref<HTMLDivElement | null> = ref(null)
const itemsCountClasses: string[] = reactive([
  'uk-slider-items', 
  `uk-child-width-1-${props.itemsCountView}@m`,
  `uk-child-width-1-${props.itemsCountSmallView}@s`,
  `uk-child-width-1-${props.itemsCountMobileView}`,
])

onBeforeUnmount(() => {
  if (DOMSlider) // @ts-ignore
    DOMSlider.$destroy(true)
})

onMounted(() => {
  if (slider.value)
    DOMSlider = UIkit.slider(slider.value, props.options)
})
</script>

<template>
  <div class="Slider">
    <div ref="slider">

      <div class="uk-position-relative">
        <div class="uk-slider-container">
          <ul :class="itemsCountClasses">

            <slot>
              <li class="Slider__li" v-for="item in 10">
                Slider content {{ item }}
              </li>
            </slot>

          </ul>
        </div>

        <div class="Slider__nav">
          <div class="franchiseActorsNav">
            <Button type="anchor" to="#" uk-slider-item="previous">
              <Icon type="ARROW" />
            </Button>

            <Button type="anchor" to="#" uk-slider-item="next">
              <Icon type="ARROW_RIGHT" />
            </Button>
          </div>

          <Button v-if="isWithShowMore" type="button" to="#">Show more</Button>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="sass">
.Slider
  &__nav
    display: flex
    justify-content: space-between
    align-items: flex-end
  &__li
    padding-right: 30px
</style>