import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {},
  projectId: process.env.CYPRESS_PROJECT_ID,
  video: true,
});
