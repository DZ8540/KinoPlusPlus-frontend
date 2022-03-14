import type { Module } from './contracts/modules'

import router from './router'

// * Modules
import Video from './modules/Video'
import Genre from './modules/Genre'
// * Modules

let modules: Module[] = [Video, Genre]

for (let item of modules) {
  for (let route of item.router) {
    router.addRoute(route)
  }
}