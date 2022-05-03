<script lang="ts" setup>
import State from './index'
import { useRouter } from 'vue-router'
import { castErrors, getFirstError } from '@/helpers'

// * Components
import Link from '@/components/Link.vue'
import Title from '@/components/Title.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
// * Components

const state = new State()
const router = useRouter()

async function submitHandler(): Promise<void> {
  try {
    await state.submitHandler.apply(state)
    
    router.push({ name: 'profile' })
  } catch (err: any) {}
}
</script>

<template>
  <img src="@/assets/img/loginBg.png" uk-scrollspy="cls: uk-animation-fade; delay: 700" class="registerBg loginBg bg" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    
    <div class="Box registerBox loginBox">

      <Title>Login</Title>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="state.formData.email" type="email" placeholder="Email">
        </template>

        <template v-if="castErrors(state.v$.value.email.$errors.length)" #error>{{ getFirstError(state.v$, 'email') }}</template>
      </Input>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="state.formData.password" type="password" placeholder="Password">
        </template>
         
        <template v-if="castErrors(state.v$.value.password.$errors.length)" #error>{{ getFirstError(state.v$, 'password') }}</template>
      </Input>

      <!-- * Delete this and place captcha -->
      <span>here is captcha!!!</span>
      <br>
      <br>
      <!-- * Delete this and place captcha -->

      <div class="registerBox__footer">
        <div>
          <Link :to="{ name: 'register' }" class="registerBox__link">Register</Link>
          <Link to="#" class="registerBox__link">Forgot password</Link>
        </div>

        <Button @click="submitHandler" type="button">Login</Button>
      </div>

    </div>

  </div>
</template>

<style lang="sass" scoped>

</style>