<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { Types } from '@/contracts/notification'
// * Types

import State from './index'

// * Components
import Icon from '../Icon/Icon.vue'
// * Components

const state = new State()
const props = defineProps({
  type: {
    type: String as PropType<Types>,
    required: true,
  },
})

state.setType(props.type)
</script>

<template>
  <div class="Notification Box transition">
    <Icon class="Notification__icon" :type="state.getType()" />

    <span class="Font Font__text Font__regular">
      <slot></slot>
    </span>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Notification
  display: flex
  align-items: center
  max-width: $notificationWidth
  &__icon
    font-size: 30px
    margin-right: 20px
</style>