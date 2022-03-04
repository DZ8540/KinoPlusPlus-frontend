<script lang="ts" setup>
import UIkit from 'uikit'
import State from './index'
import { onBeforeUnmount, onMounted, ref, type PropType, type Ref } from 'vue'

// * Components
import Input from '../Input/Input.vue'
import Button from '@/components/Button.vue'
// * Components

const state = new State()
const props = defineProps({
  options: {
    type: Object as PropType<UIkit.UIkitDropOptions>,
    default() {
      return {}
    }
  },
})

let drop: Ref<HTMLDivElement | null> = ref(null)
let DOMDrop: UIkit.UIkitDropElement

state.setOptions(props.options)

onMounted(() => {
  if (drop.value)
    DOMDrop = UIkit.drop(drop.value, state.options)
})

onBeforeUnmount(() => {
  if (DOMDrop) // @ts-ignore
    DOMDrop.$destroy(true)
})
</script>

<template>
  <div class="SearchDrop" ref="drop">
    <div class="Box SearchDrop__box">
      <Input />

      <Button type="button">
        <template #button>Search</template>
      </Button>
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