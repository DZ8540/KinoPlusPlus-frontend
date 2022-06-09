<script lang="ts" setup>
// * Types
import type { Ref } from 'vue'
import type { Validation } from '@vuelidate/core'
import type { LoginPayload } from '@/contracts/api'
import type { ErrorResponse } from '@/contracts/response'
// * Types

import AuthService from '@/services/AuthService'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { RoutesNames } from '@/config/router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { 
  castErrors, checkFormData, 
  displayExternalErrors, getFirstError 
} from '@/helpers'

// * Components
import Link from '@/components/Link.vue'
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
// * Components

const router = useRouter()

const formData: LoginPayload = reactive({
  email: '',
  password: '',
})
const rules: any = {
  email: { required, email },
  password: { 
    required, 
    minLength: minLength(8),
    maxLength: maxLength(30),
  },
}
const externalErrors: any = reactive({
  email: '',
  password: '',
})

const v$: Ref<Validation<any, LoginPayload>> = useVuelidate(
  rules, 
  formData, 
  { $autoDirty: true, $externalResults: externalErrors }
)

function resetForm(): void {
  formData.email = ''
  formData.password = ''

  v$.value.$reset()
}

async function submitHandler(): Promise<void> {
  try {
    await checkFormData(v$)
    await AuthService.login(formData)
    resetForm()
    
    router.push({ name: RoutesNames.ACHIEVES })
  } catch (_err: any) {
    const err: ErrorResponse['response']['data']['errors'] | null = _err

    if (err)
      displayExternalErrors(externalErrors, err)
  }
}
</script>

<template>
  <img src="@/assets/img/loginBg.png" uk-scrollspy="cls: uk-animation-fade; delay: 700" class="registerBg loginBg bg" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    
    <div class="Box registerBox loginBox">

      <Title>Login</Title>

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

      <!-- * Delete this and place captcha -->
      <span>here is captcha!!!</span>
      <br>
      <br>
      <!-- * Delete this and place captcha -->

      <div class="registerBox__footer">
        <div>
          <Link :to="{ name: RoutesNames.REGISTER }" class="registerBox__link">Register</Link>
          <Link to="#" class="registerBox__link">Forgot password</Link>
        </div>

        <Button @click="submitHandler" type="button">Login</Button>
      </div>

    </div>

  </div>
</template>

<style lang="sass" scoped></style>