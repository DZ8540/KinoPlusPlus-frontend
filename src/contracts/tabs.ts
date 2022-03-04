import type { Type } from './tab'
import type { RouteLocationRaw } from 'vue-router'

export type Nav = {
  tabType: Type,
  text: string,
  to?: RouteLocationRaw,
}