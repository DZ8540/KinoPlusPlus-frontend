import type { RouteLocationRaw } from 'vue-router'

export type MenuItem = {
  to: RouteLocationRaw,
  text: string | number,
}