// * Types
import type { Module } from './contracts/modules'
// * Types

import router from './router'

// * Modules
import Auth from './modules/Auth'
import User from './modules/User'
import Video from './modules/Video'
import Genre from './modules/Genre'
// * Modules

const modules: Module[] = [Video, Genre, Auth, User]

for (const item of modules) {
  for (const route of item.router) {
    router.addRoute(route)
  }
}