/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: './build',
    sourcemap: true,
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Taken from the vitest setup https://vitest.dev/config/#exclude - default wasn't working for some reason
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/legacy/**',
    ],
  },
})
