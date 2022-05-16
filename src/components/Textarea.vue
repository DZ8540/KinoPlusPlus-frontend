<script lang="ts" setup>
const props = defineProps({
  maxSymbols: {
    type: Number,
    default: 256,
  }
})

const rows: number = 8
const textareaClassNames: string[] = ['Textarea__textarea', 'transition', 'Font', 'Font__regular', 'Font__text']
</script>

<template>
  <div class="Textarea">
    <slot :textarea-class-names="textareaClassNames" :rows="rows" />

    <div class="Textarea__info">
      <span class="Textarea__error transition Textarea__error--active Font Font__regular Font__text Font__error">
        <slot name="error" />
      </span>
      
      <span class="Font Font__regular Font__mini Textarea__symbols">
        <slot name="length" />
        /
        {{ props.maxSymbols }}
      </span>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Textarea
  &__textarea
    width: 100%
    border-radius: 10px
    padding: 20px
    box-sizing: border-box
    resize: vertical
    &:focus
      border-color: $yellow
  &__info
    display: flex
    position: relative
  &__error
    width: 90%
    opacity: 0
    &--active
      opacity: 1
  &__symbols
    position: absolute
    right: 0
</style>