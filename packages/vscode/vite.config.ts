import { defineConfig } from "vite";
import { resolve } from "path";
import { builtinModules } from "module";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/extension.ts"),
      formats: ["cjs"],
      fileName: () => "extension.js",
    },
    rollupOptions: {
      // Externalize vscode and all Node.js built-ins — provided by the host
      external: ["vscode", ...builtinModules],
    },
    sourcemap: true,
    minify: false,
  },
});
