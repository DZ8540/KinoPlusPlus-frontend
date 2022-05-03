<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Options } from '@/contracts/themeSwitcher'
// * Types

import { onMounted, ref } from 'vue'
import { ThemeSwitcher } from '@dz8540/custom-themeswitcher'

// * Components
import Icon from './Icon.vue'
// * Components

const props = defineProps({
  name: {
    type: String,
    default: 'ThemeSwitcher',
  }
})

const switcher: Ref<HTMLDivElement | null> = ref(null)
const options: Options = {
  linkId: import.meta.env.VITE_LINK_ID,
  schemeKey: import.meta.env.VITE_SCHEME_KEY,
  defaultScheme: import.meta.env.VITE_DEFAULT_SCHEME,
  routes: {
    light: import.meta.env.VITE_LIGHT_SCHEME_PATH,
    dark: import.meta.env.VITE_DARK_SCHEME_PATH,
  },
}

onMounted(() => {
  new ThemeSwitcher(switcher.value!, options)
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