import type { Scheme } from '@dz8540/custom-themeswitcher'

export type Options = {
  linkId: string,
  schemeKey: string,
  defaultScheme: Scheme,
  routes: {
    light: string,
    dark: string
  }
}