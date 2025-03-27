export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'], // Use Pinia as your state management tool
  srcDir: 'src/',
  runtimeConfig: { // Runtime environment variables (these are exposed via `useRuntimeConfig()`)
    public: {
      API_URL: 'http://localhost:5025' // Backend URL becuase its Express and different port
    }
  },

  // Fixes Vite's HMR WebSocket port if you run frontend separately from backend
  // vite: {
  //   server: {
  //     hmr: {
  //       protocol: 'ws',         // WebSocket protocol
  //       host: 'localhost',      
  //       port: 3000              // Must match the frontend dev server (Nuxt)
  //     }
  //   }
  // }
})
