import { resolve } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static bundle used by the Capacitor Android wrapper. Same components,
// no SSR/router shell, output consumed via capacitor.config.ts -> webDir.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": resolve(import.meta.dirname, "src") },
  },
  build: {
    outDir: "dist-android",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(import.meta.dirname, "capacitor/index.html"),
    },
  },
});
