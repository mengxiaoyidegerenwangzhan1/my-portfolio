import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { sites } from "@openai/sites-vite-plugin";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/my-portfolio/" : "/",
  plugins: [
    react(),
    sites(),
    cloudflare({
      inspectorPort: false,
      viteEnvironment: {
        name: "server",
      },
      config: {
        name: "mengxiaoyi-crm-portfolio",
        main: "./worker/index.js",
        compatibility_date: "2026-08-26",
        assets: {
          not_found_handling: "single-page-application",
        },
      },
    }),
  ],
});
