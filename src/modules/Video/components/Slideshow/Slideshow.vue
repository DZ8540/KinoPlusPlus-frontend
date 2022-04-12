<script lang="ts" setup>
// * Types
import type { Ref, PropType } from 'vue'
import type { UnparsedVideo } from '@/contracts/video'
// * Types

import UIkit from 'uikit'
import State from './index'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// * Components
import Button from '@/components/Button.vue'
// * Components

const state = new State()
const props = defineProps({
  options: {
    type: Object as PropType<UIkit.UIkitSliderOptions>,
    default() {
      return {}
    }
  },
  items: {
    type: Object as PropType<UnparsedVideo[]>,
    required: true,
  },
})

let DOMSlider: UIkit.UIkitSliderElement
const slider: Ref<HTMLDivElement | null> = ref(null)

state.setOptions(props.options)
state.setItems(props.items)

onMounted(() => {
  if (slider.value) {
    DOMSlider = UIkit.slider(slider.value, state.options)

    // For fix slider 
    DOMSlider.show(1)
    DOMSlider.show(0)
    // For fix slider 
  }
})

onBeforeUnmount(() => {
  if (DOMSlider) // @ts-ignore
    DOMSlider.$destroy(true)
})
</script>

<template>
  <div class="Slideshow uk-position-relative mb">
    <div ref="slider">

      <ul class="uk-slider-items Slideshow__onIndexPageList">
        <li v-for="item in state.items">
          <img :src="item.poster" class="Slideshow__onIndexPageImage transition" alt="">

          <div class="Slideshow__onIndexPageContent transition" uk-slideshow-parallax="x: 500, -500">
            <p class="Font Font__text Font__regular Slideshow__onIndexPageText moreLineEllipsis">{{ item.description }}</p>

            <Button :to="{ name: 'video', params: { slug: item.slug } }" class="Link__forButton" type="anchor">Show detail</Button>
          </div>
        </li>
      </ul>

      <a class="uk-position-center-left Slideshow__onIndexPageNavLeft" href="#" uk-slider-item="previous"><i
          class="Icon Icon__arrow Slideshow__onIndexPageNav"></i></a>
      <a class="uk-position-center-right Slideshow__onIndexPageNavRight" href="#" uk-slider-item="next"><i
          class="Icon Icon__arrow Icon__arrow__right Slideshow__onIndexPageNav"></i></a>

    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

$imagePadding: 30px
$mobileImagePadding: 10px

$onIndexPageNavLocation: 12vw
$ipadOnIndexPageNavLocation: 4vw
$mobileOnIndexPageNavLocation: 3vw
  
.Slideshow
  &__imageItem
    padding-left: $imagePadding
    margin-left: -$imagePadding
  &__image, &__onIndexPageImage
    width: 65vw
    max-width: 1300px
    min-height: 400px
    height: 70vh
    max-height: 600px
    min-width: 1100px
    object-fit: cover
    object-position: center
    border-radius: 30px
  &__thumbNav
    display: flex
    align-items: center
    margin-top: 30px
  &__thumbList
    padding: 0 30px !important
    justify-content: space-between
    > *
      padding: 0 !important
  &__thumbImage
    width: 30%
    border-radius: 10px
    overflow: hidden
    cursor: pointer
  &__onIndexPageNav
    color: $yellow !important
    font-size: 70px
  &__onIndexPageNavLeft
    left: $onIndexPageNavLocation
  &__onIndexPageNavRight
    right: $onIndexPageNavLocation
  &__onIndexPageImage
    opacity: .5
  &__onIndexPageList
    > *
      padding: $imagePadding / 2
      // height: 500px
      // width: 60%
    .uk-active
      .Slideshow
        &__onIndexPageImage, &__onIndexPageContent
          opacity: 1
  &__onIndexPageContent
    position: absolute
    left: $imagePadding + ($imagePadding / 2)
    bottom: $imagePadding + ($imagePadding / 2)
    max-width: 400px
    opacity: 0
  &__onIndexPageText
    color: $white !important
    margin-bottom: 20px !important

  @media (max-width: 1440px)
    &__onIndexPageNavRight
      right: 4vw
    &__onIndexPageNavLeft
      left: 4vw

  @media (max-width: 1100px)
    &__onIndexPageList 
      > *
        padding: 0
    &__image, &__onIndexPageImage
      width: calc(100% - ($imagePadding * 2))
      position: relative
      left: $imagePadding
      min-height: unset
      min-width: unset
    &__onIndexPageNavRight
      right: $ipadOnIndexPageNavLocation
    &__onIndexPageNavLeft
      left: $ipadOnIndexPageNavLocation
    &__onIndexPageContent
      left: $imagePadding * 2
      bottom: $imagePadding
    &__onIndexPageNav
      font-size: 50px

  @media (max-width: 500px)
    &__thumbNav
      justify-content: space-between
    &__thumbList
      display: none
    &__onIndexPageImage
      width: calc(100% - ($mobileImagePadding * 2))
      left: $mobileImagePadding
      height: 50vh
    &__onIndexPageNavRight
      right: $mobileOnIndexPageNavLocation
    &__onIndexPageNavLeft
      left: $mobileOnIndexPageNavLocation
    &__onIndexPageContent
      width: 100%
      left: 0
      padding: 0 30px
      box-sizing: border-box

  @media (max-width: 350px)
    &__onIndexPageNav
      font-size: 40px
</style>