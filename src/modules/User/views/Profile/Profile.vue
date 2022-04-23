<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
// * Types

import State from './index'
import { ref } from 'vue'
import { useUserData } from '@/store/userDataStore'

// * Components
import Title from '@/components/Title.vue'
import Select from '@/components/Select.vue'
import Button from '@/components/Button.vue'
import List from '@/components/List/List.vue'
import Input from '@/components/Input/Input.vue'
// * Components

const state = new State()
const userData = useUserData()

const isUpdateProfileMode: Ref<boolean> = ref(false)

function toggleProfileMode(val: boolean): void {
  isUpdateProfileMode.value = val
}

function resetForm(): void {
  state.resetForm.apply(state)
}

function setSexForUser(val: boolean): void {
  state.formData.sex = val
}

async function submitHandler(): Promise<void> {
  await state.submitHandler.apply(state)
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

              <template v-if="state.castErrors(state.v$.value.nickname.$errors.length)" #error>{{ state.getFirstError('nickname') }}</template>
            </Input> 

            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.email" type="email" placeholder="Email">
              </template>

              <template v-if="state.castErrors(state.v$.value.email.$errors.length)" #error>{{ state.getFirstError('email') }}</template>
            </Input>

            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.phone" type="text" placeholder="Phone">
              </template>

              <template v-if="state.castErrors(state.v$.value.phone.$errors.length)" #error>{{ state.getFirstError('phone') }}</template>
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

              <template v-if="state.castErrors(state.v$.value.oldPassword.$errors.length)" #error>{{ state.getFirstError('oldPassword') }}</template>
            </Input>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.password" type="password" placeholder="Your new password">
              </template>

              <template v-if="state.castErrors(state.v$.value.password.$errors.length)" #error>{{ state.getFirstError('password') }}</template>
            </Input>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="state.formData.passwordConfirm" type="password" placeholder="Confirm password">
              </template>

              <template v-if="state.castErrors(state.v$.value.passwordConfirm.$errors.length)" #error>{{ state.getFirstError('passwordConfirm') }}</template>
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

      <div class="Tabs">
        <div class="Tabs__menu mb">
          <ul class="Tabs__list">

            <li class="Tabs__li">
              <button class="Tab Tab--active Font Font__regular Font__text transition">Achieves</button>
            </li>

            <li class="Tabs__li">
              <button class="Tab Font Font__regular Font__text transition">Wishlist</button>
            </li>

            <li class="Tabs__li">
              <button class="Tab Font Font__regular Font__text transition">Later list</button>
            </li>

            <li class="Tabs__li">
              <button class="Tab Font Font__regular Font__text transition">History</button>
            </li>

          </ul>

          <span class="Tabs__count Font Font__text Font__regular">Results shown: 16</span>
        </div>

        <div class="Tabs__elements">
          <div class="uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2" uk-grid>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

            <div>
              <a href="achievement.html" class="Box AchievementCard">
                <div class="AchievementCard__header">
                  <img src="<%= require('/Src/Img/achievementEmblem.png') %>" class="AchievementCard__img" alt="">
                </div>

                <div class="AchievementCard__footer">
                  <span class="Link AchievementCard__name Font Font__text Font__regular transition">You met the autobots</span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="sass"></style>