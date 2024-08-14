import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'lib/index.ts'),
        core: resolve(__dirname, 'lib/core.ts'),
        components: resolve(__dirname, 'lib/component.ts'),
        page: resolve(__dirname, 'lib/page.ts')
      },
      name: 'UniEval'
      // formats: ['es', 'cjs']
      // fileName: (format, entryName) => {
      //   return `${entryName}.${format === 'cjs' ? 'cjs' : 'js'}`
      // }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json')
    }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
