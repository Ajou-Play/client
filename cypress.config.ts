import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,

  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'src/**/*.test.{js,ts,jsx,tsx}',
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
