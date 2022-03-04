<script lang="ts" setup>
import Navbar from './components/Navbar/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="fullPageBox">
    <header uk-sticky="sel-target: .Navbar; cls-active: Navbar__sticky">
      <Navbar :langs="['en', 'fr', 'ru']" />
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>

  <footer>
    <Footer />
  </footer>
</template>