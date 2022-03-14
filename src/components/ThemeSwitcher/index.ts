// * Types
import type { Options } from '@/contracts/themeSwitcher'
// * Types

export default class {
  public options: Options = {
    linkId: import.meta.env.VITE_LINK_ID,
    schemeKey: import.meta.env.VITE_SCHEME_KEY,
    defaultScheme: import.meta.env.VITE_DEFAULT_SCHEME,
    routes: {
      light: import.meta.env.VITE_LIGHT_SCHEME_PATH,
      dark: import.meta.env.VITE_DARK_SCHEME_PATH,
    },
  }
} 