/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALL_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
