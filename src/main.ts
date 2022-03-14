// * Don't change index this imports
import './registerDependencies'
import './registerModules'

import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// * Components
// import Link from './components/link/Link.vue'
// * Components

const app = createApp(App)

app.use(createPinia())
app.use(router)

// * It's not provided components types, props, data etc.
// app.component('Link', Link)

app.mount('#app')
