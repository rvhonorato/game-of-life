import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/game-of-life/",
  plugins: [react()],
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
