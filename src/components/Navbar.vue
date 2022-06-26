<script lang="ts" setup>
// * Types
import type { Ref, PropType } from 'vue'
import type { Value } from '@/contracts/select'
// * Types

import UIkit from 'uikit'
import { RoutesNames } from '@/config/router'
import { useUserData } from '@/store/userDataStore'
import { onMounted, ref, reactive, onBeforeMount } from 'vue'

// * Components
import Icon from './Icon.vue'
import Link from './Link.vue'
import Select from './Select.vue'
import Dropdown from './Dropdown.vue'
import SearchDrop from './SearchDrop.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
// * Components

const userData = useUserData()
const props = defineProps({
  options: {
    type: Object as PropType<UIkit.UIkitNavbarOptions>,
    default(): UIkit.UIkitNavbarOptions {
      return {}
    },
  },
  langs: {
    type: Array as PropType<string[]>,
    default(): string[] {
      return []
    }
  }
})

const langs: Value[] = reactive([])
const navbar: Ref<HTMLDivElement | null> = ref(null)
const searchDropBoundaryClassName: string = 'SearchDropBoundaryBind'

function setLangs(langsArr: string[]): void {
  for (const key in langsArr) {
    langs.push({ value: key, text: langsArr[key] })
  }
}

onBeforeMount(() => {
  setLangs(props.langs)
})

onMounted(() => {
  if (navbar.value)
    UIkit.navbar(navbar.value, props.options)
})
</script>

<template>
  <nav class="Navbar transition" ref="navbar">

    <div class="Navbar__left">
      <router-link :to="{ name: RoutesNames.HOME }" uk-scrollspy="cls: uk-animation-slide-left; delay: 100">
        <img src="@/assets/img/logo.png" class="Navbar__logo" alt="">
      </router-link>
    </div>

    <div class="Navbar__center uk-visible@l">
      <ul class="Navbar__nav" uk-scrollspy="target: > li; cls: uk-animation-slide-top; delay: 100">

        <li class="Navbar__navLi">
          <Link :to="{ name: RoutesNames.HOME }">Main</Link>
        </li>

        <li class="Navbar__navLi">
          <Dropdown>
            <template #title>Movies</template>

            <template #body>
              <div class="navDrop">
                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Genres</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Adventures</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                </ul>

                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Actors</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Jensen Ackles</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Bred Pitt</Link>
                  </li>
                </ul>

                <div class="navDrop__item">
                  <Link to="#">Rooms</Link>
                </div>
              </div>
            </template>
          </Dropdown>
        </li>

        <li class="Navbar__navLi">
          <Dropdown>
            <template #title>Serials</template>

            <template #body>
              <div class="navDrop">
                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Genres</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Adventures</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                </ul>

                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Actors</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Jensen Ackles</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Bred Pitt</Link>
                  </li>
                </ul>

                <div class="navDrop__item">
                  <Link to="#">Rooms</Link>
                </div>
              </div>
            </template>
          </Dropdown>
        </li>

        <li class="Navbar__navLi">
          <Dropdown>
            <template #title>Cartoons</template>

            <template #body>
              <div class="navDrop">
                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Genres</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Adventures</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                </ul>

                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Actors</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Jensen Ackles</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Bred Pitt</Link>
                  </li>
                </ul>

                <div class="navDrop__item">
                  <Link to="#">Rooms</Link>
                </div>
              </div>
            </template>
          </Dropdown>
        </li>

        <li class="Navbar__navLi">
          <Dropdown>
            <template #title>Cartoon serials</template>

            <template #body>
              <div class="navDrop">
                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Genres</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Adventures</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Action</Link>
                  </li>
                </ul>

                <ul class="navDropList navDrop__item">
                  <li class="navDropList__li">
                    <span class="navDropList__title Font Font__bold Font__text">Actors</span>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Jensen Ackles</Link>
                  </li>
                  <li class="navDropList__li">
                    <Link to="#">Bred Pitt</Link>
                  </li>
                </ul>

                <div class="navDrop__item">
                  <Link to="#">Rooms</Link>
                </div>
              </div>
            </template>
          </Dropdown>
        </li>

        <li class="Navbar__navLi">
          <Link :to="{ name: RoutesNames.GENRES }">All genres</Link>
        </li>

        <li class="Navbar__navLi">
          <Link to="#">All actors</Link>
        </li>

        <li class="Navbar__navLi">
          <Link :to="{ name: RoutesNames.ROOM_SEARCH }">Rooms</Link>
        </li>

      </ul>
    </div>

    <div class="Navbar__right">
      <ul class="Navbar__rightList" uk-scrollspy="target: > li; cls: uk-animation-slide-right; delay: 100">

        <li class="Navbar__rightListLi uk-visible@l">
          <Select :values="langs" :main-value="0" name="Lang" />
        </li>

        <li :class="searchDropBoundaryClassName" class="Navbar__rightListLi uk-visible@l">
          <a href="#" class="Navbar__rightListLink">
            <Icon type="SEARCH" />
          </a>

          <SearchDrop :options="{ mode: 'click', boundary: `.${searchDropBoundaryClassName}` }" />
        </li>

        <li class="Navbar__rightListLi uk-visible@l">
          <router-link :to="{ name: RoutesNames.ACHIEVES }" class="Navbar__rightListLink">
            <Icon type="USER" />
          </router-link>
        </li>

        <li v-if="userData.user" class="Navbar__rightListLi uk-visible@l">
          <router-link :to="{ name: RoutesNames.LOGOUT }" class="Navbar__rightListLink">
            <Icon type="LOGOUT" />
          </router-link>
        </li>

        <li class="Navbar__rightListLi uk-visible@l">
          <ThemeSwitcher name="Navbar ThemeSwitcher" />
        </li>

        <li class="Navbar__rightListLi uk-hidden@l">
          <button class="MobileNavIcon" id="mobileMenuBtn"
            uk-toggle="target: #mobileMenu; animation: uk-animation-slide-right">
            <span class="MobileNavIcon__icon transition"></span>
            <span class="MobileNavIcon__icon transition"></span>
          </button>
        </li>

      </ul>
    </div>

  </nav>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

.Navbar
  position: relative
  width: 100%
  box-sizing: border-box
  padding: 0 $navbarPadding
  height: 80px
  display: flex
  justify-content: center
  align-items: center
  &__left, &__right
    position: absolute
  &__left
    left: $navbarPadding
    a
      display: block
  &__right
    right: $navbarPadding
  &__nav
    display: flex
  &__navLi
    margin-right: 20px
    &:last-child
      margin-right: 0
  &__rightList
    display: flex
    align-items: center
  &__rightListLi
    margin-left: 20px
    &:first-child
      margin-left: 0
  &__rightListLink
    display: flex
    text-decoration: none !important
  .Select__inputBlock
    width: 50px

  @media (max-width: 1280px)
    padding: 0 $navbarPadding1280
    height: $navbarHeight1280
    &__left
      left: $navbarPadding1280
    &__right
      right: $navbarPadding1280

  @media (max-width: 1100px)
    height: $navbarHeight1024

  @media (max-width: 500px)
    padding: 0 $navbarPadding500
    &__left
      left: $navbarPadding500
    &__right
      right: $navbarPadding500
    &__logo
      width: 80%

  @media (max-width: 350px)
    height: $navbarHeight350
    padding: 0 $navbarPadding350
    &__left
      left: $navbarPadding350
    &__right
      right: $navbarPadding350
</style>