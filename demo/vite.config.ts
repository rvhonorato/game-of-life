import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/game-of-life/",
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ["game-of-life"],
  },
});
