import react from '@vitejs/plugin-react'
import fs from 'fs'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dfxJson from './dfx.json'

const isDev = process.env['DFX_NETWORK'] !== 'ic'

type Network = 'ic' | 'local'

interface CanisterIds {
  [key: string]: { [key in Network]: string }
}

let canisterIds: CanisterIds = {}
try {
  canisterIds = JSON.parse(
    fs.readFileSync(isDev ? '.dfx/local/canister_ids.json' : './canister_ids.json').toString()
  )
} catch (e) {
  console.error('\n⚠️  Before starting the dev server run: dfx deploy\n\n')
}

// Generate canister ids, required by the generated canister code in .dfx/local/canisters/*
// This strange way of JSON.stringifying the value is required by vite
const canisterDefinitions = Object.entries(canisterIds).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [`process.env.${key.toUpperCase()}_CANISTER_ID`]: isDev
      ? JSON.stringify(val.local)
      : JSON.stringify(val.ic),
  }),
  {}
)

// Gets the port dfx is running on from dfx.json
const DFX_PORT = dfxJson.networks.local.bind.split(':')[1]

// See guide on how to configure Vite at:
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'src/frontend/assets',
  plugins: [tsconfigPaths(), react()],
  esbuild: {
    define: {
      this: 'window',
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
    proxy: {
      // This proxies all http requests made to /api to our running dfx instance
      '/api': {
        target: `http://localhost:${DFX_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  define: {
    // Here we can define global constants
    // This is required for now because the code generated by dfx relies on process.env being set
    ...canisterDefinitions,
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
  },
})
