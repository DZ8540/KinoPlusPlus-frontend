<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { ParsedUser, User } from '@/contracts/user'
// * Types

import UserService from '@/services/UserService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { parseUser } from '@/helpers'
import { DEFAULT_USER } from '@/config/user'

// * Components
import List from '@/components/List.vue'
// * Components

const route = useRoute()

const id: User['id'] = Number(route.params.id)
const item: Ref<ParsedUser> = ref({ ...parseUser(DEFAULT_USER) })

onMounted(async () => {
  try {
    const user: User = await UserService.get(id)

    item.value = parseUser(user)
  } catch (_err: any) {}
})
</script>

<template>
  <img src="@/assets/img/profileBg.png" class="registerBg profileBg bg" uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    
    <div class="content">
      <div class="mb" uk-grid>
        <div class="uk-width-1-3@s">
          
          <div class="Box Box__lite Box__avatar mb">
            <img :src="item.avatar" class="Box__bg" alt="">
          </div>

        </div>

        <div class="uk-width-2-3@s">
          
          <div class="Box">
            <h1 class="Font Font__bold Font__title achievementTitle">{{ item.nickname }}</h1>

            <List v-slot="{ classNames, textClassName }">

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Email: {{ item.email }}</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Birthday: {{ item.birthdayForUser }}</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Phone: {{ item.phone }}</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Password: ********</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Sex: {{ item.sexForUser }}</span>
              </li>

            </List>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style lang="sass"></style>