<script lang="ts" setup>
import { useNotificationBus } from './store/notificationBusStore'

// * Components
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'
// * Components

const notifications = useNotificationBus()
</script>

<template>
  <div class="fullPageBox">
    <header uk-sticky="sel-target: .Navbar; cls-active: Navbar__sticky">
      <Navbar :langs="['en', 'fr', 'ru']" />
    </header>

    <main>
      <router-view />
    </main>
  </div>

  <footer>
    <Footer />
  </footer>
  
  <TransitionGroup name="notification" tag="div" class="NotificationBox">
    <Notification v-for="item in notifications.notifications" :type="item.type" class="mb__lite" :key="item.id">{{ item.msg }}</Notification>
  </TransitionGroup>
</template>

<style lang="sass">
@import '@/assets/sass/variables'

$padding: 30px

.NotificationBox  
  display: flex
  flex-direction: column
  position: fixed
  top: $navbarPadding + $padding
  right: $padding
  z-index: 2000

.notification-enter-active,
.notification-leave-active
  transition: all 0.5s ease

.notification-enter-from,
.notification-leave-to
  opacity: 0
  transform: translateX(30px)
</style>