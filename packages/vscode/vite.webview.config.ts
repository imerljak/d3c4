import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/webview/index.ts"),
      formats: ["iife"],
      name: "D3C4Webview",
      fileName: () => "index.js",
    },
    outDir: "dist/webview",
    emptyOutDir: true,
    rollupOptions: {
      // Nothing is external — everything must be bundled for the sandboxed webview
      external: [],
    },
    sourcemap: true,
    minify: false,
  },
});
