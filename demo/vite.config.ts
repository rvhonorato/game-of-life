import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";
import path from "path";

// Create a developer helper function to hot-reload the WASM module
//  everytime the code there is changed
function wasmHotReload(): Plugin {
  return {
    name: "wasm-hot-reload",
    configureServer(server) {
      const wasmSrc = path.resolve(__dirname, "../wasm/src");
      server.watcher.add(wasmSrc);

      let building = false;
      server.watcher.on("change", async (file) => {
        if (!file.endsWith(".rs") || building) return;
        building = true;
        server.config.logger.info("Rust file changed, rebuilding WASM...");
        try {
          execSync("npm run build:wasm", { cwd: __dirname, stdio: "inherit" });
          server.config.logger.info("WASM rebuild done, reloading...");
          server.restart();
        } catch {
          server.config.logger.error("WASM rebuild failed");
        } finally {
          building = false;
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "/game-of-life/",
  plugins: [react(), tailwindcss(), wasmHotReload()],
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
