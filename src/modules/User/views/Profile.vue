<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Value } from '@/contracts/select'
import type { MenuItem } from '@/contracts/tabs'
import type { UserPayload } from '@/contracts/api'
import type { ErrorResponse } from '@/contracts/response'
// * Types

import useVuelidate from '@vuelidate/core'
import UserService from '@/services/UserService'
import { ref, reactive } from 'vue'
import { Messages } from '@/config/response'
import { RoutesNames } from '@/config/router'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'
import { 
  castErrors, checkFormData, getFirstError, 
  isEqual, displayExternalErrors, 
} from '@/helpers'
import { 
  required, email, minLength, 
  maxLength, requiredIf, numeric,
} from '@vuelidate/validators'

// * Components
import List from '@/components/List.vue'
import Tabs from '@/components/Tabs.vue'
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Select from '@/components/Select.vue'
import Button from '@/components/Button.vue'
// * Components

const userData = useUserData()
const notifications = useNotificationBus()

const totalCount: Ref<number> = ref(0)
const isUpdateProfileMode: Ref<boolean> = ref(false)

const sexValues: Value[] = [
  {
    text: 'Male',
    value: false,
  },
  {
    text: 'Female',
    value: true,
  },
]
const tabs: MenuItem[] = [
  {
    text: 'Achieves',
    to: { name: RoutesNames.ACHIEVES },
  },
  {
    text: 'Wishlist',
    to: { name: RoutesNames.WISHLIST },
  },
  {
    text: 'Later list',
    to: { name: RoutesNames.LATER_LIST },
  },
  {
    text: 'History',
    to: { name: RoutesNames.HISTORY_LIST },
  },
]

let avatarFile: MediaSource | undefined = undefined
const avatarUrl: Ref<string> = ref(userData.user!.avatar)
const formData: UserPayload & { oldPassword: UserPayload['password'] } = reactive({
  nickname: userData.user!.nickname,
  email: userData.user!.email,
  phone: userData.user!.phone,
  sex: userData.user!.sex,
  oldPassword: '',
  password: '',
  passwordConfirm: '',
})
const rules: any = {
  nickname: { 
    required, 
    minLength: minLength(3),
    maxLength: maxLength(20),
  },
  email: { required, email },
  phone: { required, numeric },
  sex: { required },
  oldPassword: {
    minLength: minLength(8),
    maxLength: maxLength(30),
  },
  password: { 
    requiredIf: requiredIf(formData.oldPassword as string),
    minLength: minLength(8),
    maxLength: maxLength(30),
  },
  passwordConfirm: { 
    requiredIf: requiredIf(formData.password as string), 
    minLength: minLength(8),
    maxLength: maxLength(30),
  },
}
const externalErrors: any = reactive({
  nickname: '',
  email: '',
  phone: '',
  sex: '',
  password: '',
  passwordConfirm: '',
})

const v$ = useVuelidate(rules, formData, { $autoDirty: true, $externalResults: externalErrors })

function toggleProfileMode(val: boolean): void {
  isUpdateProfileMode.value = val
}

function setSexForUser(val: boolean): void {
  formData.sex = val
}

function setTotalCount(newTotalCount: number): void {
  totalCount.value = newTotalCount
}

function resetForm(): void {
  formData.email = userData.user!.email
  formData.nickname = userData.user!.nickname
  formData.phone = userData.user!.phone
  formData.sex = userData.user!.sex
  formData.oldPassword = ''
  formData.password = ''
  formData.passwordConfirm = ''

  avatarFile = undefined
  avatarUrl.value = userData.user!.avatar

  v$.value.$reset()
}

function onAvatarChange(e: Event): void { // @ts-ignore
  const file: MediaSource = e.target.files[0]

  avatarFile = file
  avatarUrl.value = URL.createObjectURL(file)
}

async function updateUserProfileCheckFormData(): Promise<void> {
  if (!isEqual(formData.password!, formData.passwordConfirm!)) {
    externalErrors.passwordConfirm = 'Should equal to password field!'
    throw Messages.VALIDATION_ERR
  }
    
  await checkFormData(v$)
}

async function submitHandler(): Promise<void> {
  try {
    try {
      await updateUserProfileCheckFormData()
    } catch (_err: any) {
      const err: Messages = _err

      notifications.addNotification({
        msg: err,
        type: 'error',
      })

      throw null
    }

    await UserService.updateProfile(formData, avatarFile)
    resetForm()

    toggleProfileMode(false)
  } catch (_err: any) {
    const err: ErrorResponse['response']['data']['errors'] | null = _err

    if (err)
      displayExternalErrors(externalErrors, err)
  }
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
              <img :src="avatarUrl" :alt="userData.user!.nickname" class="Box__bg">
              <input @change="onAvatarChange" ref="avatarInputElement" type="file" class="profileAvatar__input" id="avatar">
            </div>
          </label>

        </div>

        <div class="uk-width-2-3@s">
          
          <div class="Box Box__overflow">
            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="formData.nickname" type="text" placeholder="User Name">
              </template>

              <template v-if="castErrors(v$.nickname.$errors.length)" #error>{{ getFirstError(v$, 'nickname') }}</template>
            </Input> 

            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="formData.email" type="email" placeholder="Email">
              </template>

              <template v-if="castErrors(v$.email.$errors.length)" #error>{{ getFirstError(v$, 'email') }}</template>
            </Input>

            <Input class="profileInput">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="formData.phone" type="text" placeholder="Phone">
              </template>

              <template v-if="castErrors(v$.phone.$errors.length)" #error>{{ getFirstError(v$, 'phone') }}</template>
            </Input>

            <!-- TODO: Make datepicker -->
            <!-- <div class="Input profileInput">
              <input type="text" class="Input__input Font Font__bold Font__text transition" placeholder="Birthday">
              <span class="Input__error Font Font__regular Font__text">Text error</span>
            </div> -->

            <Select @change="setSexForUser" :main-value="formData.sex" :values="sexValues" name="Sex" is-full is-like-input />

            <Title is-lite>Password</Title>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="formData.oldPassword" type="password" placeholder="Your old password">
              </template>

              <template v-if="castErrors(v$.oldPassword.$errors.length)" #error>{{ getFirstError(v$, 'oldPassword') }}</template>
            </Input>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="formData.password" type="password" placeholder="Your new password">
              </template>

              <template v-if="castErrors(v$.password.$errors.length)" #error>{{ getFirstError(v$, 'password') }}</template>
            </Input>

            <Input class="registerBox__input">
              <template v-slot="{ inputClassNames }">
                <input :class="inputClassNames" v-model="formData.passwordConfirm" type="password" placeholder="Confirm password">
              </template>

              <template v-if="castErrors(v$.passwordConfirm.$errors.length)" #error>{{ getFirstError(v$, 'passwordConfirm') }}</template>
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
          
          <div class="Box Box__lite Box__avatar mb">
            <img :src="userData.user!.avatar" class="Box__bg" alt="">
          </div>

        </div>

        <div class="uk-width-2-3@s">
          
          <div class="Box">
            <h1 class="Font Font__bold Font__title achievementTitle">{{ userData.user!.nickname }}</h1>

            <List v-slot="{ classNames, textClassName }">

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Email: {{ userData.user!.email }}</span>
              </li>

              <li :class="[...classNames, 'List__li__withoutDot']">
                <span v-if="userData.user!.isEmailVerified" :class="[textClassName, 'Font', 'Font__text', 'Font__regular', 'Font__success']">Your email is verified</span>
                <span v-else :class="[textClassName, 'Font', 'Font__text', 'Font__regular', 'Font__error']">Your email is not verified</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Birthday: {{ userData.user!.birthdayForUser }}</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Phone: {{ userData.user!.phone }}</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Password: ********</span>
              </li>

              <li :class="classNames">
                <span :class="[textClassName, 'Font', 'Font__text', 'Font__regular']">Sex: {{ userData.user!.sexForUser }}</span>
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