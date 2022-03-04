import type { Module } from './contracts/modules'
import Video from './modules/Video'
import router from './router'

let modules: Module[] = [Video]

for (let item of modules) {
  for (let route of item.router) {
    router.addRoute(route)
  }
}