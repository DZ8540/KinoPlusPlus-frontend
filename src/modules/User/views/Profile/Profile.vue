<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { MenuItem } from '@/contracts/tabs'
// * Types

import State from './index'
import { ref } from 'vue'
import { useUserData } from '@/store/userDataStore'
import { castErrors, getFirstError } from '@/helpers'

// * Components
import List from '@/components/List.vue'
import Tabs from '@/components/Tabs.vue'
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import Button from '@/components/Button.vue'
// * Components

const state = new State()
const userData = useUserData()

const totalCount: Ref<number> = ref(0)
const isUpdateProfileMode: Ref<boolean> = ref(false)
const tabs: MenuItem[] = [
  {
    text: 'Achieves',
    to: { name: 'profile' },
  },
  {
    text: 'Wishlist',
    to: { name: 'wishlist' },
  },
  {
    text: 'Later list',
    to: '/',
  },
  {
    text: 'History',
    to: '/',
  },
]

function toggleProfileMode(val: boolean): void {
  isUpdateProfileMode.value = val
}

function resetForm(): void {
  state.resetForm.apply(state)
}

function setSexForUser(val: boolean): void {
  state.formData.sex = val
}

function setTotalCount(newTotalCount: number): void {
  totalCount.value = newTotalCount
}

async function submitHandler(): Promise<void> {
  await state.submitHandler.apply(state)
  toggleProfileMode(false)
}
</script>

<template>
  <img src="@/assets/img/profileBg.png" class="registerBg profileBg bg" uk-scrollspy="cls: uk-animation-fade; delay: 700" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    
    <div class="content">
      <div v-if="isUpdateProfileMode" class="mb" uk-grid>
        <div class="uk-width-1-3@s">
          
          <label class="profileAvatar" for="avatar">
            <div class="Box Box__lite Box__avatar mb">
              <img :src="`http://localhost:3333${userData.user.avatar}`" class="Box__bg" alt="">
              <input type="file" class="profileAvatar__input" name="avatar" id="avatar">
            </div>
          </label>

        </div>

        <div class="uk-width-2-3@s">
          
          <div class="Box Box__overflow">
            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.nickname" type="text" placeholder="User Name">
              </template>

              <template v-if="castErrors(state.v$.value.nickname.$errors.length)" #error>{{ getFirstError(state.v$, 'nickname') }}</template>
            </Input> 

            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.email" type="email" placeholder="Email">
              </template>

              <template v-if="castErrors(state.v$.value.email.$errors.length)" #error>{{ getFirstError(state.v$, 'email') }}</template>
            </Input>

            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.phone" type="text" placeholder="Phone">
              </template>

              <template v-if="castErrors(state.v$.value.phone.$errors.length)" #error>{{ getFirstError(state.v$, 'phone') }}</template>
            </Input>

            <!-- TODO: Make datepicker -->
            <!-- <div class="Input profileInput">
              <input type="text" class="Input__input Font Font__bold Font__text transition" placeholder="Birthday">
              <span class="Input__error Font Font__regular Font__text">Text error</span>
            </div> -->

            <Select @change="setSexForUser" :main-value="state.formData.sex" :values="state.sexValues" name="Sex" is-full is-like-input />

            <Title is-lite>Password</Title>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.oldPassword" type="password" placeholder="Your old password">
              </template>

              <template v-if="castErrors(state.v$.value.oldPassword.$errors.length)" #error>{{ getFirstError(state.v$, 'oldPassword') }}</template>
            </Input>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.password" type="password" placeholder="Your new password">
              </template>

              <template v-if="castErrors(state.v$.value.password.$errors.length)" #error>{{ getFirstError(state.v$, 'password') }}</template>
            </Input>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.passwordConfirm" type="password" placeholder="Confirm password">
              </template>

              <template v-if="castErrors(state.v$.value.passwordConfirm.$errors.length)" #error>{{ getFirstError(state.v$, 'passwordConfirm') }}</template>
            </Input>

            <div class="achievementBtns">
              <Button @click="toggleProfileMode(false)" class="profileCancel" type="button">Cancel</Button>
              <Button @click="resetForm" class="profileCancel" type="button">Reset</Button>
              <Button @click="submitHandler" class="profileCancel" type="button">Confirm</Button>
            </div>
          </div>

        </div>
      </div>

      <div v-else class="mb" uk-grid>
        <div class="uk-width-1-3@s">
          
          <div class="profileAvatar" for="avatar">
            <div class="Box Box__lite Box__avatar mb">
              <img :src="`http://localhost:3333${userData.user.avatar}`" class="Box__bg" alt="">
            </div>
          </div>

        </div>

        <div class="uk-width-2-3@s">
          
          <div class="Box">
            <h1 class="Font Font__bold Font__title achievementTitle">{{ userData.user.nickname }}</h1>

            <List v-slot="{ classNames, textClassName }">

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Email: {{ userData.user.email }}</span>
              </li>

              <li :class="[...classNames, 'List__li__withoutDot']">
                <span v-if="userData.user.isEmailVerified" :class="[textClassName, 'Font', 'Font__text', 'Font__regular', 'Font__success']">Your email is verified</span>
                <span v-else :class="[textClassName, 'Font', 'Font__text', 'Font__regular', 'Font__error']">Your email is not verified</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Birthday: {{ userData.user.birthdayForUser }}</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Phone: {{ userData.user.phone }}</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Password: ********</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Sex: {{ userData.user.sexForUser }}</span>
              </li>

            </List>

            <div class="achievementBtns">
              <Button @click="toggleProfileMode(true)" type="button">Edit profile</Button>
            </div>
          </div>

        </div>
      </div>

      <Tabs :menu="tabs" :total-result="totalCount">
        <router-view @set-total-result="setTotalCount" />
      </Tabs>
    </div>

  </div>
</template>

<style lang="sass"></style>