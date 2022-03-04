/// <reference types="vite/client" />

interface ImportMetaEnv {
  // * API
  readonly VITE_API_URL: string,
  readonly VITE_API_TIMEOUT: string,
  // * API

  // * Scheme
  readonly VITE_LINK_ID: string,
  readonly VITE_SCHEME_KEY: string,
  readonly VITE_DEFAULT_SCHEME: 'system' | 'light' | 'dark',
  readonly VITE_LIGHT_SCHEME_PATH: string,
  readonly VITE_DARK_SCHEME_PATH: string,
  // * Scheme
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}