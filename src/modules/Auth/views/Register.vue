<script lang="ts" setup>
// * Types
import type { ErrorResponse } from '@/contracts/response'
import type { RegistrationPayload } from '@/contracts/api'
// * Types

import useVuelidate from '@vuelidate/core'
import AuthService from '@/services/AuthService'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Messages } from '@/config/response'
import { RoutesNames } from '@/config/router'
import { useNotificationBus } from '@/store/notificationBusStore'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { castErrors, getFirstError, isEqual, checkFormData, displayExternalErrors } from '@/helpers'

// * Components
import Link from '@/components/Link.vue'
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
// * Components

const notifications = useNotificationBus()
const router = useRouter()

const formData: RegistrationPayload = reactive({
  nickname: '',
  email: '',
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
  password: { 
    required, 
    minLength: minLength(8),
    maxLength: maxLength(30),
  },
  passwordConfirm: { 
    required, 
    minLength: minLength(8),
    maxLength: maxLength(30),
  },
}
const externalErrors: any = reactive({
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const v$ = useVuelidate(
  rules, 
  formData, 
  { $autoDirty: true, $externalResults: externalErrors }
)

function resetForm(): void {
  formData.email = ''
  formData.nickname = ''
  formData.password = ''
  formData.passwordConfirm = ''

  v$.value.$reset()
}

async function registerCheckFormData(): Promise<void> {
  if (!isEqual(formData.password, formData.passwordConfirm)) {
    externalErrors.passwordConfirm = 'Should equal to password field!'
    throw Messages.VALIDATION_ERR
  }
    
  await checkFormData(v$)
}

async function submitHandler(): Promise<void> {
  try {
    try {
      await registerCheckFormData()
    } catch (_err: any) {
      const err: Messages = _err

      notifications.addNotification({
        msg: err,
        type: 'error',
      })

      throw null
    }

    await AuthService.register(formData)
    resetForm()

    router.push({ name: RoutesNames.HOME })
  } catch (_err: any) {
    const err: ErrorResponse['response']['data']['errors'] | null = _err

    if (err)
      displayExternalErrors(externalErrors, err)
  }
}
</script>

<template>
  <img src="@/assets/img/registerBg.png" uk-scrollspy="cls: uk-animation-fade; delay: 700" class="registerBg bg" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    
    <div class="Box registerBox">

      <Title>Registration</Title>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="formData.nickname" type="text" placeholder="Nickname">
        </template>

        <template v-if="castErrors(v$.nickname.$errors.length)" #error>{{ getFirstError(v$, 'nickname') }}</template>
      </Input>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="formData.email" type="email" placeholder="Email">
        </template>

        <template v-if="castErrors(v$.email.$errors.length)" #error>{{ getFirstError(v$, 'email') }}</template>
      </Input>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="formData.password" type="password" placeholder="Password">
        </template>
         
        <template v-if="castErrors(v$.password.$errors.length)" #error>{{ getFirstError(v$, 'password') }}</template>
      </Input>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="formData.passwordConfirm" type="password" placeholder="Password confirm">
        </template>

        <template v-if="castErrors(v$.passwordConfirm.$errors.length)" #error>{{ getFirstError(v$, 'passwordConfirm') }}</template>
      </Input>

      <!-- * Delete this and place captcha -->
      <span>here is captcha!!!</span>
      <br>
      <br>
      <!-- * Delete this and place captcha -->

      <div class="registerBox__footer">
        <Link :to="{ name: RoutesNames.LOGIN }">Login</Link>
        <Button type="button" @click="submitHandler">Register</Button>
      </div>

    </div>

  </div>
</template>

<style lang="sass"></style>