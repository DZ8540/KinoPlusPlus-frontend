<script lang="ts" setup>
import UIkit from 'uikit'
import State from './index'
import { onBeforeUnmount, onMounted, ref, type PropType, type Ref } from 'vue'

// * Components
import Button from '../Button.vue'
import Icon from '../Icon/Icon.vue'
// * Components

const state = new State()
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

let slider: Ref<HTMLDivElement | null> = ref(null)
let DOMSlider: UIkit.UIkitSliderElement

state.setOptions(props.options)
state.setItemsCount(props.itemsCountView, props.itemsCountSmallView, props.itemsCountMobileView)
state.setWithShowMore(props.isWithShowMore)

onMounted(() => {
  if (slider.value)
    DOMSlider = UIkit.slider(slider.value, state.options)
})

onBeforeUnmount(() => {
  if (DOMSlider) // @ts-ignore
    DOMSlider.$destroy(true)
})
</script>

<template>
  <div class="Slider">
    <div ref="slider">

      <div class="uk-position-relative">
        <div class="uk-slider-container">
          <ul :class="state.itemsCountClasses">

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
              <template #anchor>
                <Icon type="ARROW" />
              </template>
            </Button>

            <Button type="anchor" to="#" uk-slider-item="next">
              <template #anchor>
                <Icon type="ARROW_RIGHT" />
              </template>
            </Button>
          </div>

          <Button v-if="state.isWithShowMore.value" type="button" to="#">
            <template #button>Show more</template>
          </Button>
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