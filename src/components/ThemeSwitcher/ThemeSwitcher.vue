<script lang="ts" setup>
import State from './index'
import { onMounted, ref, type Ref } from 'vue'
import { ThemeSwitcher } from '@dz8540/custom-themeswitcher'

// * Components
import Icon from '../Icon/Icon.vue'
// * Components

const state = new State()
const props = defineProps({
  name: {
    type: String,
    default: 'ThemeSwitcher',
  }
})

let switcher: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  new ThemeSwitcher(switcher.value!, state.options)
})
</script>

<template>
  <div class="ThemeSwitcher" ref="switcher" :data-name="props.name">
    <div class="ThemeSwitcher__item" data-value="light">
      <Icon type="SUN" class="ThemeSwitcher__icon" />
    </div>

    <div class="ThemeSwitcher__item" data-value="dark">
      <Icon type="MOON" class="ThemeSwitcher__icon" />
    </div>

    <div class="ThemeSwitcher__system ThemeSwitcher__item" data-value="system">
      <Icon type="SUN" class="ThemeSwitcher__icon" />
      <Icon type="MOON" class="ThemeSwitcher__icon" />
    </div>
  </div>
</template>

<style lang="sass">
@import '@dz8540/custom-themeswitcher/Dist/SASS/CustomThemeSwitcher'
@import '@/assets/sass/variables'
  
.ThemeSwitcher
  &__system > :last-child
    left: 0 !important
</style>