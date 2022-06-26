<script lang="ts" setup>
import { EventsNames } from '@/config/event'

// * Components
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
// * Components

const emit = defineEmits([EventsNames.SEARCH])
</script>

<template>
  <div class="SearchBox mb">
    <div class="SearchBox__box Box">

      <!-- * Should use only what in this slot -->

      <slot>
        <Input>

          <template v-slot="{ inputClassNames }">
            <input :class="inputClassNames" type="text" placeholder="Search">
          </template>

          <template #error>Error text</template>

        </Input>
      </slot>

      <Button @click="emit(EventsNames.SEARCH)" type="button" class="SearchBox__btn">Search</Button>
    </div>
  </div>
</template>

<style lang="sass">
.SearchBox
  display: flex
  justify-content: center
  &__box
    width: 600px
    display: flex
  &__btn
    margin-left: 20px

  @media (max-width: 1100px)
    &__box
      align-items: center

  @media (max-width: 500px)
    &__box
      flex-direction: column
      align-items: flex-end
    &__btn
      margin-top: 20px
      
  @media (max-width: 350px)
    &__btn
      margin-top: 10px
</style>