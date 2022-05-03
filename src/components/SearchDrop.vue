<script lang="ts" setup>
// * Types
import type { Ref, PropType } from 'vue'
// * Types

import UIkit from 'uikit'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// * Components
import Input from './Input.vue'
import Button from '@/components/Button.vue'
// * Components

const props = defineProps({
  options: {
    type: Object as PropType<UIkit.UIkitDropOptions>,
    default() {
      return {}
    }
  },
})

let DOMDrop: UIkit.UIkitDropElement
const drop: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  if (drop.value)
    DOMDrop = UIkit.drop(drop.value, props.options)
})

onBeforeUnmount(() => {
  if (DOMDrop) // @ts-ignore
    DOMDrop.$destroy(true)
})
</script>

<template>
  <div class="SearchDrop" ref="drop">
    <div class="Box SearchDrop__box">
      <Input v-slot="{ inputClassNames }">
        <input :class="inputClassNames" type="email" placeholder="Email">
      </Input>

      <Button type="button">Search</Button>
    </div>
  </div>
</template>

<style lang="sass">
.SearchDrop
  width: 600px
  &__box
    display: flex
  .Input
    margin-right: 20px
</style>