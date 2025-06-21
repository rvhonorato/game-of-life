import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
  },
  optimizeDeps: {
    exclude: ["game-of-life"],
  },
});
