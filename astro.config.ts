import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [solidJs()]
});
