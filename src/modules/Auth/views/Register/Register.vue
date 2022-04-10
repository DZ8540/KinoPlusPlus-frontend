<script lang="ts" setup>
import State from './index'
import { useRouter } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/config/router'

// * Components
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import Link from '@/components/Link/Link.vue'
import Input from '@/components/Input/Input.vue'
// * Components

const state = new State()
const router = useRouter()

async function submitHandler(): Promise<void> {
  await state.submitHandler.apply(state)

  router.push({ name: HOME_ROUTE_NAME })
}
</script>

<template>
  <img src="@/assets/img/registerBg.png" uk-scrollspy="cls: uk-animation-fade; delay: 700" class="registerBg bg" alt="">

  <div class="uk-container" uk-scrollspy="cls: uk-animation-scale-down; delay: 100">
    
    <div class="Box registerBox">

      <Title>Registration</Title>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="state.formData.nickname" type="text" placeholder="Nickname">
        </template>

        <template v-if="state.castErrors(state.v$.value.nickname.$errors.length)" #error>{{ state.getFirstError('nickname') }}</template>
      </Input>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="state.formData.email" type="email" placeholder="Email">
        </template>

        <template v-if="state.castErrors(state.v$.value.email.$errors.length)" #error>{{ state.getFirstError('email') }}</template>
      </Input>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="state.formData.password" type="password" placeholder="Password">
        </template>
         
        <template v-if="state.castErrors(state.v$.value.password.$errors.length)" #error>{{ state.getFirstError('password') }}</template>
      </Input>

      <Input class="registerBox__input">
        <template v-slot="{ inputClassNames }">
          <input :class="inputClassNames" v-model="state.formData.passwordConfirm" type="password" placeholder="Password confirm">
        </template>

        <template v-if="state.castErrors(state.v$.value.passwordConfirm.$errors.length)" #error>{{ state.getFirstError('passwordConfirm') }}</template>
      </Input>

      <!-- * Delete this and place captcha -->
      <span>here is captcha!!!</span>
      <br>
      <br>
      <!-- * Delete this and place captcha -->

      <div class="registerBox__footer">
        <Link :to="{ name: 'login' }">Login</Link>
        <Button type="button" @click="submitHandler">Register</Button>
      </div>

    </div>

  </div>
</template>

<style lang="sass"></style>