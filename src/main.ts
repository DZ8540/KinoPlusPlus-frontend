// * Don't change index fot imports below
import './registerDependencies'
import './registerModules'
// * Don't change index fot imports above

import App from './App.vue'
import router from './router'
import BaseService from './services/BaseService'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// * Components
// import Link from './components/Link.vue'
// * Components

const app = createApp(App)

app.use(createPinia())
app.use(router)

// * It's not provided components types, props, data etc.
// app.component('Link', Link)

app.mount('#app')
BaseService.initApp()
