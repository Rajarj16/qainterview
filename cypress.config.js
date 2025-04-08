const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "s8mevm",
    baseUrl: "http://localhost:3001",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config)
    {
      
    },
  },
});
