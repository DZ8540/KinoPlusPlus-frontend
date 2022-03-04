<script lang="ts" setup>
import State from './index'
import type { PropType } from 'vue'
import type { Type } from '@/contracts/button'

const state = new State()
const props = defineProps({
  type: {
    type: String as PropType<Type>,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

state.setActive(props.isActive)
</script>

<template>
  <button :class="state.defaultClassNames" v-if="props.type == 'button'">
    <slot name="button">Tab</slot>
  </button>

  <router-link activeClass="Tab--active" :class="state.defaultClassNames" v-else>
    <slot name="anchor">Tab</slot>
  </router-link>
</template>

<style lang="sass">
@import '@/assets/sass/variables'
  
.Tab
  display: flex
  align-items: center
  height: 50px
  padding: 0 30px
  border-radius: 10px
  &--active, &:hover
    color: $yellow !important
</style>