<script lang="ts" setup>
import State from './index'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

// * Components
import Title from '@/components/Title.vue'
// * Components

const state = new State()
const route = useRoute()

const token: string = route.query.token as string

onMounted(async () => {
  state.activate(token)
})
</script>

<template>
  <Title>{{ state.message.value }}</Title>
</template>

<style lang="sass"></style>