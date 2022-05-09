<script lang="ts" setup>
import AuthService from '@/services/AuthService'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

// * Components
import Title from '@/components/Title.vue'
// * Components

const route = useRoute()

const token: string = route.query.token as string

onMounted(async () => {
  await AuthService.activateUser(token)
})
</script>

<template>
  <Title>Please wait, we will activate your account!</Title>
</template>

<style lang="sass"></style>