<script lang="ts" setup>
// * Types
import type { PropType } from 'vue'
import type { IconsTypes } from '@/contracts/fonts'
import type { Types } from '@/contracts/notification'
// * Types

// * Components
import Icon from './Icon.vue'
// * Components

const props = defineProps({
  type: {
    type: String as PropType<Types>,
    required: true,
  },
})

function getType(): keyof typeof IconsTypes {
  switch (props.type) {
    case 'success':
      return 'SUCCESS'

    case 'error':
      return 'ERROR'
  
    default:
      return 'SUCCESS'
  }
}
</script>

<template>
  <div class="Notification Box transition">
    <Icon class="Notification__icon" :type="getType()" />

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